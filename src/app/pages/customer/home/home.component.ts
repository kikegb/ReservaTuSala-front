import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { Room } from 'src/app/global/interfaces/room.interface';
import { RoomsService } from 'src/app/global/services/rooms.service';
import { FilterDialogComponent } from './components/filter-dialog/filter-dialog.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  searchForm: FormGroup;
  rooms: Room[] = [];
  filters: any;
  @ViewChild(MatTable) table!: MatTable<any>;

  constructor(
    private formBuilder: FormBuilder,
    private roomSvc: RoomsService,
    private router: Router,
    public dialog: MatDialog,
    private translate: TranslateService) 
  {
    this.filters = null;
    this.searchForm = this.formBuilder.group({
      'search': [null]
    });
  }

  ngOnInit(): void {
    this.roomSvc.getRooms()
    .pipe(
        tap( (rooms: Room[]) => {
          this.rooms = rooms;

        })
    )
    .subscribe();
  }

  search(): void {
    this.roomSvc.getRooms()
    .pipe(
        tap( (rooms: Room[]) => {
          this.rooms = rooms;
          if (this.searchForm.value.search) {
            this.rooms = rooms.filter((room: Room) => room.name.toLowerCase().includes(this.searchForm.value.search.toLowerCase()) 
            || room.business.name.toLowerCase().includes(this.searchForm.value.search.toLowerCase())
            || room.location.town.toLowerCase().includes(this.searchForm.value.search.toLowerCase()));
          }
          if (this.filters) {
            this.rooms = this.rooms.filter(room => room.size >= this.filters?.minSize);
            this.rooms = this.rooms.filter(room => room.size <= this.filters.maxSize);
            this.rooms = this.rooms.filter(room => room.capacity >= this.filters.minCapacity);
            this.rooms = this.rooms.filter(room => room.capacity <= this.filters.maxCapacity);
            this.rooms = this.rooms.filter(room => room.price >= this.filters.minPrice);
            this.rooms = this.rooms.filter(room => room.price <= this.filters.maxPrice);
          }
        })
    )
    .subscribe();
  }

  navigateDetails(id: number): void {
    this.router.navigate(['customer/room-detail', id]);
  }

  showFilterDialog(): void {
    const dialogRef = this.dialog.open(FilterDialogComponent, { data: { title: this.translate.instant('title.searchFilters'), filters: this.filters } });

    dialogRef.afterClosed().subscribe( filters => {
      this.filters = filters;
      this.search();
    });
  }
}
