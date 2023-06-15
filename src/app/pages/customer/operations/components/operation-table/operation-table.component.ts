import { Component, ViewChild } from '@angular/core';
import { Operation } from 'src/app/global/interfaces/operation.interface';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { tap } from 'rxjs';
import { OperationsService } from 'src/app/global/services/operations.service';
import { UsersService } from 'src/app/global/services/users.service';
import { User } from 'src/app/global/interfaces/user.interface';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-operation-table',
  templateUrl: './operation-table.component.html',
  styleUrls: ['./operation-table.component.scss']
})
export class OperationTableComponent {
  operations: Operation[] = []
  columnsToDisplay = ['room', 'start', 'end', 'cost', 'status'];
  @ViewChild(MatTable) table!: MatTable<any>;

  constructor(
    private userSvc: UsersService,
    private operationSvc: OperationsService, 
    public dialog: MatDialog) {}
  
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = <any>jwtDecode(token);
      const id = decodedToken.id;
      this.userSvc.getById(id)
      .pipe(
          tap( (user: User) => {
            this.operations = user.customerOperations;
          })
      )
      .subscribe();
    }
  }

  updateStatus(operation: Operation, status: string): void {
    const updatedOperation: Operation = {
      ...operation,
      status: status
    }
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
}
