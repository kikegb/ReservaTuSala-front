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
      'street': [null, Validators.required],
      'number': [null, Validators.required],
      'postcode': [null, Validators.required],
      'town': [null, Validators.required],
      'province': [null, Validators.required],
      'country': [null, Validators.required],
    });
  }

  onCancel(): void {
    this.dialogRef.close(undefined);
  }

  onSave(): void {
    this.dialogRef.close(<Location>this.locationForm.value);
  }
}
