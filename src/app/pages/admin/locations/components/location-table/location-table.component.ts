import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { tap } from 'rxjs';
import { LocationsService } from 'src/app/global/services/locations.service';
import { Location } from 'src/app/global/interfaces/location.interface';
import { DeleteDialogComponent } from 'src/app/global/components/delete-dialog/delete-dialog.component';
import { LocationFormDialogComponent } from '../location-form-dialog/location-form-dialog.component';
import { TranslateService } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarService } from 'src/app/global/services/snack-bar.service';

@Component({
  selector: 'app-location-table',
  templateUrl: './location-table.component.html',
  styleUrls: ['./location-table.component.scss']
})
export class LocationTableComponent {
  locations: Location[] = [];
  columnsToDisplay = ['street', 'number', 'postcode', 'town', 'province', 'country', 'actions'];
  @ViewChild(MatTable) table!: MatTable<any>;

  constructor(private locationSvc: LocationsService, 
    public dialog: MatDialog,
    private translate: TranslateService,
    private snackbarSvc: SnackBarService) {}
  
  ngOnInit(): void {
    this.locationSvc.getLocations().subscribe(
      (locations: Location[]) => this.locations = locations
    );
  }

  addLocation(location: Location): void {
    this.locationSvc.addLocation(location).subscribe(newLocation => {
      this.snackbarSvc.openSuccess('messages.addSuccess');
      this.locations = [...this.locations, newLocation];
      this.table.renderRows();
    }, (e: HttpErrorResponse) => {
      console.log(e.status);
      this.snackbarSvc.openError('messages.addError');
    });
  }

  updateLocation(updatedLocation: Location): void {
    this.locationSvc.updateLocation(updatedLocation).subscribe(() => {
      this.snackbarSvc.openSuccess('messages.updateSuccess');
      let index = this.locations.findIndex( location => location.id == updatedLocation.id );
      this.locations[index] = updatedLocation;
      this.locations = [...this.locations];
      this.table.renderRows();
    }, (e: HttpErrorResponse) => {
      console.log(e.status);
      this.snackbarSvc.openError('messages.updateError');
    });
  }

  deleteLocation(id: number): void {
    this.locationSvc.deleteLocation(id).subscribe(() => {
      this.snackbarSvc.openSuccess('messages.deleteSuccess');
      this.locations = this.locations.filter(location => location.id !== id);
      this.table.renderRows();
    }, (e: HttpErrorResponse) => {
      console.log(e.status);
      this.snackbarSvc.openError('messages.deleteError');
    });
  }

  showDeleteDialog(id: number): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, { data: { elementName: this.translate.instant("elements.location") } });

    dialogRef.afterClosed().subscribe( result => {
      if(result) {
        this.deleteLocation(id);
      }
    });
  }

  showEditLocationDialog(location: Location): void {
    const dialogRef = this.dialog.open(LocationFormDialogComponent, { data: { title: this.translate.instant("edit.location"), location: location } });

    dialogRef.afterClosed().subscribe( updatedLocation => {
      if(updatedLocation) {
        this.updateLocation(updatedLocation);
      }
    });
  }

  showAddLocationDialog(): void {
    const dialogRef = this.dialog.open(LocationFormDialogComponent, { data: { title: this.translate.instant("new.location"), location: undefined} });

    dialogRef.afterClosed().subscribe( newLocation => {
      if(newLocation) {
        this.addLocation(newLocation);
      }
    });
  }
}
