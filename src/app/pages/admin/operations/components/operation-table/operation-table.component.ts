import { Component, ViewChild } from '@angular/core';
import { Operation } from 'src/app/global/interfaces/operation.interface';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { tap } from 'rxjs';
import { DeleteDialogComponent } from 'src/app/global/components/delete-dialog/delete-dialog.component';
import { OperationsService } from 'src/app/global/services/operations.service';
import { OperationFormDialogComponent } from '../operation-form-dialog/operation-form-dialog.component';
import { TranslateService } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import { SnackBarService } from 'src/app/global/services/snack-bar.service';

@Component({
  selector: 'app-operation-table',
  templateUrl: './operation-table.component.html',
  styleUrls: ['./operation-table.component.scss']
})
export class OperationTableComponent {
  operations: Operation[] = []
  columnsToDisplay = ['customer', 'business', 'room', 'start', 'end', 'cost', 'status', 'actions'];
  @ViewChild(MatTable) table!: MatTable<any>;

  constructor(private operationSvc: OperationsService, 
    public dialog: MatDialog,
    private translate: TranslateService,
    private snackbarSvc: SnackBarService
    ) {}
  
  ngOnInit(): void {
    this.operationSvc.getOperations().subscribe(
      (operations: Operation[]) => this.operations = operations
    );
  }

  addOperation(operation: Operation): void {
    this.operationSvc.addOperation(operation).subscribe(newOperation => {
      this.snackbarSvc.openSuccess('messages.addSuccess');
      this.operations = [...this.operations, newOperation];
      this.table.renderRows();
    }, (e: HttpErrorResponse) => {
      console.log(e.status);
      if (e.error) {
        this.snackbarSvc.openErrorByCode(e.error.code);
      } else {
        this.snackbarSvc.openError('messages.addError');
      }
    });
  }

  updateOperation(updatedOperation: Operation): void {
    this.operationSvc.updateOperation(updatedOperation).subscribe(() => {
      this.snackbarSvc.openSuccess('messages.updateSuccess');
      let index = this.operations.findIndex( operation => operation.id == updatedOperation.id );
      this.operations[index] = updatedOperation;
      this.operations = [...this.operations];
      this.table.renderRows();
    }, (e: HttpErrorResponse) => {
      console.log(e.status);
      if (e.error) {
        this.snackbarSvc.openErrorByCode(e.error.code);
      } else {
        this.snackbarSvc.openError('messages.updateError');
      }
    });
  }

  deleteOperation(id: number): void {
    this.operationSvc.deleteOperation(id).subscribe(() => {
      this.snackbarSvc.openSuccess('messages.deleteSuccess');
      this.operations = this.operations.filter(operation => operation.id !== id);
      this.table.renderRows();
    }, (e: HttpErrorResponse) => {
      console.log(e.status);
      if (e.error) {
        this.snackbarSvc.openErrorByCode(e.error.code);
      } else {
        this.snackbarSvc.openError('messages.deleteError');
      }
    });
  }

  showDeleteDialog(id: number): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, { data: { elementName: this.translate.instant('elements.operation') } });

    dialogRef.afterClosed().subscribe( result => {
      if(result) {
        this.deleteOperation(id);
      }
    });
  }

  showEditOperationDialog(operation: Operation): void {
    const dialogRef = this.dialog.open(OperationFormDialogComponent, { data: { title: this.translate.instant('edit.operation'), operation: operation } });

    dialogRef.afterClosed().subscribe( updatedOperation => {
      if(updatedOperation) {
        this.updateOperation(updatedOperation);
      }
    });
  }

  showAddOperationDialog(): void {
    const dialogRef = this.dialog.open(OperationFormDialogComponent, { data: { title: this.translate.instant('new.operation'), operation: undefined} });

    dialogRef.afterClosed().subscribe( newOperation => {
      if(newOperation) {
        this.addOperation(newOperation);
      }
    });
  }

}
