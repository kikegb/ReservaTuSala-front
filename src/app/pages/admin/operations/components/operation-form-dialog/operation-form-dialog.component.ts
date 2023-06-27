import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Operation } from 'src/app/global/interfaces/operation.interface';
import { UsersService } from 'src/app/global/services/users.service';
import { User } from 'src/app/global/interfaces/user.interface';
import { tap } from 'rxjs';
import { RoomsService } from 'src/app/global/services/rooms.service';
import { Room } from 'src/app/global/interfaces/room.interface';
import { OperationsService } from 'src/app/global/services/operations.service';

@Component({
  selector: 'app-operation-form-dialog',
  templateUrl: './operation-form-dialog.component.html',
  styleUrls: ['./operation-form-dialog.component.scss']
})
export class OperationFormDialogComponent {
  title: string;
  operation: Operation;
  operationForm: FormGroup;
  dates: Date[] = [];
  hours: number[] = [];
  today = new Date();
  customers: User[] = [];
  businesses: User[] = [];
  rooms: Room[] = [];
  operations: Operation[] = [];
  unavailableHours: number[] = [];

  constructor(
    public dialogRef: MatDialogRef<OperationFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, operation: Operation },
    private formBuilder: FormBuilder,
    private userSvc: UsersService,
    private roomsSvc: RoomsService,
    private operationSvc: OperationsService)
  {
    this.title = data.title;
    this.operation = data.operation;
    this.operationForm = this.formBuilder.group({
      'customer': [data.operation?.customer || null, Validators.required],
      'business': [data.operation?.business || null, Validators.required],
      'room': [data.operation?.room || null, Validators.required],
      'date': [data.operation?.start || null, Validators.required],
      'startHour': [data.operation?.start.getHours() || null, Validators.required],
      'endHour': [data.operation?.end.getHours() || null, Validators.required],
      'cost': [data.operation?.cost || null, [Validators.required, Validators.min(0)]],
      'status': [data.operation?.status || null, Validators.required],
    });

  }

  ngOnInit(): void {
    this.userSvc.getUsers()
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
    .subscribe(() => {
      this.getHours(this.operationForm.value.date);
    });

    this.operationSvc.getOperations()
    .pipe(
        tap( (operations: Operation[]) => this.operations = operations )
    )
    .subscribe();

    this.operationForm.get("business")?.valueChanges.subscribe(newValue => {
      this.getRooms(newValue);
    });

    this.operationForm.get("date")?.valueChanges.subscribe(newValue => {
      this.getHours(newValue);
    });
  }

  isBeforeOrSame(): boolean {
    const startHour = this.operationForm.value.startHour;
    const endHour = this.operationForm.value.endHour;

    return (startHour >= endHour);
  }

  isUnavailable(): boolean {
    const startHour = this.operationForm.value.startHour;
    const endHour = this.operationForm.value.endHour;

    for (let i = startHour; i <= endHour; i++) {
      if (this.unavailableHours.find(h => h == i)) {
        return true;
      }
    }
    return false;
  }

  getHours(date: Date): void {
    if (this.operationForm.value.room && date) {
      let indexRoom = this.rooms.findIndex(room => room.id == this.operationForm.value.room.id);
      const room: Room = this.rooms[indexRoom];
      const weekDay = date.getDay();
      let index = room.schedules.findIndex(schedule => schedule.weekDay == weekDay);
      if (index < 0) {
        this.hours = []
      } else {
        this.unavailableHours = [];
        this.operations.map(operation => {
          if (operation.start.toDateString() === date.toDateString() && (this.operation? operation.id !== this.operation.id : true)) {
            for (let i = operation.start.getHours(); i <= operation.end.getHours(); i++) {
              this.unavailableHours.push(i);
            } 
          }
        });
        const startHour = room.schedules[index]?.start?.getHours();
        const endHour = room.schedules[index]?.end?.getHours();
        this.hours = []
        for (let i = startHour; i <= endHour; i++) {
          if (!this.unavailableHours.find(h => h == i)) {
            this.hours.push(i);
          }
        }

      }
    }
  }

  getRooms(business: User): void {
    if (business) {
      this.userSvc.getById(business.id)
      .pipe(
          tap( (user: User) => {
            this.rooms = user.rooms;
          })
      )
      .subscribe();
    }
  }

  dateFilter = (d: Date | null): boolean => {
    if (d && this.dates.length) {
      return !this.dates.find(date => date.toDateString() === d?.toDateString())
    }
    return true;
  };

  compareById(a: any, b: any): boolean {
    return a && b ? a.id === b.id : a === b;
  }

  onCancel(): void {
    this.dialogRef.close(undefined);
  }

  onSave(): void {
    var startDateTime = new Date(this.operationForm.value.date);
    var endDateTime = new Date(this.operationForm.value.date);
    startDateTime.setHours(this.operationForm.value.startHour)
    endDateTime.setHours(this.operationForm.value.endHour)
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
