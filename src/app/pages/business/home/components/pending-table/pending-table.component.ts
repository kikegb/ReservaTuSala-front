import { Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import jwtDecode from 'jwt-decode';
import { tap } from 'rxjs';
import { Operation } from 'src/app/global/interfaces/operation.interface';
import { User } from 'src/app/global/interfaces/user.interface';
import { OperationsService } from 'src/app/global/services/operations.service';
import { UsersService } from 'src/app/global/services/users.service';

@Component({
  selector: 'app-pending-table',
  templateUrl: './pending-table.component.html',
  styleUrls: ['./pending-table.component.scss']
})
export class PendingTableComponent {
  pendingOperations: Operation[] = []
  columnsToDisplay = ['customer', 'room', 'start', 'end', 'cost', 'status', 'actions'];
  @ViewChild(MatTable) table!: MatTable<any>;

  constructor(private userSvc: UsersService,
    private operationSvc: OperationsService) {}
  
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = <any>jwtDecode(token);
      const id = decodedToken.id;
      this.userSvc.getById(id)
      .pipe(
          tap( (user: User) => {
            user.businessOperations.map((operation: Operation) => {
              if (operation.status === "PENDING") {
                this.pendingOperations.push(operation);
              }
            })
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
        this.pendingOperations = this.pendingOperations.filter(op => op.id !== updatedOperation.id);
      })
    )
    .subscribe(() => {
      this.table.renderRows();
    });
  }
}