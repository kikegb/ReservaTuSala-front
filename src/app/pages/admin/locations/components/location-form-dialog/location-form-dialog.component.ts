import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Location } from 'src/app/global/interfaces/location.interface';

@Component({
  selector: 'app-location-form-dialog',
  templateUrl: './location-form-dialog.component.html',
  styleUrls: ['./location-form-dialog.component.scss']
})
export class LocationFormDialogComponent {
  title: string;
  location: Location;
  locationForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<LocationFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, location: Location },
    private formBuilder: FormBuilder)
  {
    this.title = data.title;
    this.location = data.location;
    this.locationForm = this.formBuilder.group({
      'street': [data.location?.street || null, Validators.required],
      'number': [data.location?.number || null, [Validators.required, Validators.min(0)]],
      'postcode': [data.location?.postcode || null, [Validators.required, Validators.pattern('^[0-9]{5}$')]],
      'town': [data.location?.town || null, Validators.required],
      'province': [data.location?.province || null, Validators.required],
      'country': [data.location?.country || null, Validators.required],
    });
  }

  onCancel(): void {
    this.dialogRef.close(undefined);
  }

  onSave(): void {
    if(!this.location) {
      this.dialogRef.close(<Location>this.locationForm.value);
    } else {
      let updatedLocation: Location = {
        ...this.location,
        street: this.locationForm.value.street,
        number: this.locationForm.value.number,
        postcode: this.locationForm.value.postcode,
        town: this.locationForm.value.town,
        province: this.locationForm.value.province,
        country: this.locationForm.value.country
      };
      this.dialogRef.close(updatedLocation);
    }
  }
}
