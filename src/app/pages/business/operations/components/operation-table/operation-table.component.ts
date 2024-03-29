import { Component, ViewChild } from '@angular/core';
import { Operation } from 'src/app/global/interfaces/operation.interface';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { OperationsService } from 'src/app/global/services/operations.service';
import { UsersService } from 'src/app/global/services/users.service';
import { User } from 'src/app/global/interfaces/user.interface';
import jwtDecode from 'jwt-decode';
import { HttpErrorResponse } from '@angular/common/http';
import { SnackBarService } from 'src/app/global/services/snack-bar.service';

@Component({
  selector: 'app-operation-table',
  templateUrl: './operation-table.component.html',
  styleUrls: ['./operation-table.component.scss']
})
export class OperationTableComponent {
  operations: Operation[] = []
  columnsToDisplay = ['customer', 'room', 'start', 'end', 'cost', 'status', 'actions'];
  @ViewChild(MatTable) table!: MatTable<any>;
  jwtDecode = jwtDecode;

  constructor(
    private userSvc: UsersService,
    private operationSvc: OperationsService, 
    public dialog: MatDialog,
    private snackbarSvc: SnackBarService) {}
  
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = <any>this.jwtDecode(token);
      const id = decodedToken.id;
      this.userSvc.getById(id).subscribe((user: User) => {
        this.operations = user.businessOperations;
      });
    }
  }

  updateStatus(operation: Operation, status: string): void {
    const updatedOperation: Operation = {
      ...operation,
      status: status
    }
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

}
