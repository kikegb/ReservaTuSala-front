import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-filter-dialog',
  templateUrl: './filter-dialog.component.html',
  styleUrls: ['./filter-dialog.component.scss']
})
export class FilterDialogComponent {
  title: string;
  filters: any;
  filterForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<FilterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, filters: any },
    private formBuilder: FormBuilder)
  {
    this.title = data.title;
    this.filters = data.filters;
    this.filterForm = this.formBuilder.group({
      'minSize': [this.filters?.minSize || 0],
      'maxSize': [this.filters?.maxSize || 500],
      'minCapacity': [this.filters?.minCapacity || 0],
      'maxCapacity': [this.filters?.maxCapacity || 100],
      'minPrice': [this.filters?.minPrice || 0],
      'maxPrice': [this.filters?.maxPrice || 500]
    });
  }

  onCancel(): void {
    this.dialogRef.close(undefined);
  }

  onSave(): void {
      let filters = {
        minSize: this.filterForm.value.minSize,
        maxSize: this.filterForm.value.maxSize,
        minCapacity: this.filterForm.value.minCapacity,
        maxCapacity: this.filterForm.value.maxCapacity,
        minPrice: this.filterForm.value.minPrice,
        maxPrice: this.filterForm.value.maxPrice,
      };
      this.dialogRef.close(filters);
  }

  resetFilters(): void {
    this.filterForm = this.formBuilder.group({
      'minSize': [0],
      'maxSize': [500],
      'minCapacity': [0],
      'maxCapacity': [100],
      'minPrice': [0],
      'maxPrice': [500]
    });
  }
}
