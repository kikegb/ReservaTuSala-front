import { Component, ViewChild } from '@angular/core';
import { Operation } from 'src/app/global/interfaces/operation.interface';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { tap } from 'rxjs';
import { DeleteDialogComponent } from 'src/app/global/components/delete-dialog/delete-dialog.component';
import { OperationsService } from 'src/app/global/services/operations.service';
import { OperationFormDialogComponent } from '../operation-form-dialog/operation-form-dialog.component';
import { TranslateService } from '@ngx-translate/core';

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
    private translate: TranslateService
    ) {}
  
  ngOnInit(): void {
    this.operationSvc.getOperations()
    .pipe(
        tap( (operations: Operation[]) => this.operations = operations )
    )
    .subscribe();
  }

  addOperation(operation: Operation): void {
    this.operationSvc.addOperation(operation)
    .pipe(
      tap( newOperation => {
        this.operations = [...this.operations, newOperation];
      })
    )
    .subscribe(() => {
      this.table.renderRows();
    });
  }

  updateOperation(updatedOperation: Operation): void {
    this.operationSvc.updateOperation(updatedOperation)
    .pipe(
      tap( () => {
        let index = this.operations.findIndex( operation => operation.id == updatedOperation.id );
        this.operations[index] = updatedOperation;
        this.operations = [...this.operations];
      })
    )
    .subscribe(() => {
      this.table.renderRows();
    });
  }

  deleteOperation(id: number): void {
    this.operationSvc.deleteOperation(id)
    .pipe(
      tap( () => {
        this.operations = this.operations.filter(operation => operation.id !== id);
      })
    )
    .subscribe(() => {
      this.table.renderRows();
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
