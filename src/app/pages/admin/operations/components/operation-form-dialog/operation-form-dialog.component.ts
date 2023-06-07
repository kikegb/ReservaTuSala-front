import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Operation } from 'src/app/global/interfaces/operation.interface';
import { UsersService } from 'src/app/global/services/users.service';
import { User } from 'src/app/global/interfaces/user.interface';
import { tap } from 'rxjs';
import { RoomsService } from 'src/app/global/services/rooms.service';
import { Room } from 'src/app/global/interfaces/room.interface';

@Component({
  selector: 'app-operation-form-dialog',
  templateUrl: './operation-form-dialog.component.html',
  styleUrls: ['./operation-form-dialog.component.scss']
})
export class OperationFormDialogComponent {
  title: string;
  operation: Operation;
  operationForm: FormGroup;
  hours = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'];
  today = new Date();
  customers: User[] = [];
  businesses: User[] = [];
  rooms: Room[] = [];

  constructor(
    public dialogRef: MatDialogRef<OperationFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, operation: Operation },
    private formBuilder: FormBuilder,
    private usersSvc: UsersService,
    private roomsSvc: RoomsService)
  {
    this.title = data.title;
    this.operation = data.operation;
    this.operationForm = this.formBuilder.group({
      'customer': [data.operation?.customer || null, Validators.required],
      'business': [data.operation?.business || null, Validators.required],
      'room': [data.operation?.room || null, Validators.required],
      'startDate': [data.operation?.start.getDate() || null, Validators.required],
      'startTime': ['0'+data.operation?.start.getHours()+':00' || null, Validators.required],
      'endDate': [data.operation?.end.getDate() || null, Validators.required],
      'endTime': ['0'+data.operation?.end.getHours()+':00' || null, Validators.required],
      'cost': [data.operation?.cost || null, Validators.required],
      'status': [data.operation?.status || null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.usersSvc.getUsers()
    .pipe(
        tap( (users: User[]) => {
          for (let user of users) {
            if (user.role === "CUSTOMER") {
              this.customers.push(user)
            } else if (user.role === "BUSINESS") {
              this.businesses.push(user)
            }
          }
        } )
    )
    .subscribe();

    this.roomsSvc.getRooms()
    .pipe(
        tap( (rooms: Room[]) => this.rooms = rooms )
    )
    .subscribe();
  }


  isBeforeOrSame(): boolean {
    const startDate = new Date(this.operationForm.value.startDate);
    const endDate = new Date(this.operationForm.value.endDate);
    const startHour = parseInt(this.operationForm.value.startTime.split(':')[0]);
    const endHour = parseInt(this.operationForm.value.endTime.split(':')[0]);

    return (startDate > endDate || ((startDate.getDate() == endDate.getDate()) && (startHour >= endHour)));
  }

  onCancel(): void {
    this.dialogRef.close(undefined);
  }

  onSave(): void {
    var startDateTime = new Date(this.operationForm.value.startDate);
    var endDateTime = new Date(this.operationForm.value.endDate);
    startDateTime.setHours(this.operationForm.value.startTime.split(':')[0])
    endDateTime.setHours(this.operationForm.value.endTime.split(':')[0])
    if(!this.operation) {
      let newOperation: Operation = {
        id: this.operationForm.value.id,
        customer: this.operationForm.value.customer,
        business: this.operationForm.value.business,
        room: this.operationForm.value.room,
        start: startDateTime,
        end: endDateTime,
        cost: this.operationForm.value.cost,
        status: this.operationForm.value.status
      };
      this.dialogRef.close(newOperation);
    } else {
      let updatedOperation: Operation = {
        ...this.operation,
        customer: this.operationForm.value.customer,
        business: this.operationForm.value.business,
        room: this.operationForm.value.room,
        start: startDateTime,
        end: endDateTime,
        cost: this.operationForm.value.cost,
        status: this.operationForm.value.status
      };
      this.dialogRef.close(updatedOperation);
    }
  }

}
