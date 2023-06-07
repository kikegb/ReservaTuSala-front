import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { tap } from 'rxjs';
import { LocationsService } from 'src/app/global/services/locations.service';
import { Location } from 'src/app/global/interfaces/location.interface';
import { DeleteDialogComponent } from 'src/app/global/components/delete-dialog/delete-dialog.component';
import { LocationFormDialogComponent } from '../location-form-dialog/location-form-dialog.component';

@Component({
  selector: 'app-location-table',
  templateUrl: './location-table.component.html',
  styleUrls: ['./location-table.component.scss']
})
export class LocationTableComponent {
  locations: Location[] = [];
  columnsToDisplay = ['street', 'number', 'postcode', 'town', 'province', 'country', 'actions'];
  @ViewChild(MatTable) table!: MatTable<any>;

  constructor(private locationSvc: LocationsService, public dialog: MatDialog) {}
  
  ngOnInit(): void {
    this.locationSvc.getLocations()
    .pipe(
        tap( (locations: Location[]) => this.locations = locations )
    )
    .subscribe();
  }

  addLocation(location: Location): void {
    this.locationSvc.addLocation(location)
    .pipe(
      tap( () => {
        this.locations = [...this.locations, location];
      })
    )
    .subscribe();
    this.table.renderRows();
  }

  updateLocation(updatedLocation: Location): void {
    this.locationSvc.updateLocation(updatedLocation)
    .pipe(
      tap( () => {
        let index = this.locations.findIndex( location => location.id == updatedLocation.id );
        this.locations[index] = updatedLocation;
        this.locations = [...this.locations];
      })
    )
    .subscribe();
    this.table.renderRows();
  }

  deleteLocation(id: number): void {
    this.locationSvc.deleteLocation(id)
    .pipe(
      tap( () => {
        let index = this.locations.findIndex( location => location.id == id );
        this.locations.splice(index, 1);
      })
    )
    .subscribe();
    this.table.renderRows();
  }

  showDeleteDialog(id: number): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, { data: { elementName: 'location' } });

    dialogRef.afterClosed().subscribe( result => {
      if(result) {
        this.deleteLocation(id);
      }
    });
  }

  showEditLocationDialog(location: Location): void {
    const dialogRef = this.dialog.open(LocationFormDialogComponent, { data: { title: 'Edit location', location: location } });

    dialogRef.afterClosed().subscribe( updatedLocation => {
      if(updatedLocation) {
        this.updateLocation(updatedLocation);
      }
    });
  }

  showAddLocationDialog(): void {
    const dialogRef = this.dialog.open(LocationFormDialogComponent, { data: { title: 'New location', location: undefined} });

    dialogRef.afterClosed().subscribe( newLocation => {
      if(newLocation) {
        this.addLocation(newLocation);
      }
    });
  }
}
