import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import jwtDecode from 'jwt-decode';
import { Operation } from 'src/app/global/interfaces/operation.interface';
import { Room } from 'src/app/global/interfaces/room.interface';
import { User } from 'src/app/global/interfaces/user.interface';
import { OperationsService } from 'src/app/global/services/operations.service';
import { RoomsService } from 'src/app/global/services/rooms.service';
import { SnackBarService } from 'src/app/global/services/snack-bar.service';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.scss']
})
export class RoomDetailComponent {
  id: number;
  room: Room;
  nHours: number = 0;
  cost: number = 0;
  week: string[] = [];
  operationForm: FormGroup;
  hours: number[] = [];
  today = new Date();
  operations: Operation[] = [];
  unavailableHours: number[] = [];
  jwtDecode = jwtDecode;

  constructor(
    private route: ActivatedRoute,
    private roomSvc: RoomsService,
    private formBuilder: FormBuilder,
    private operationSvc: OperationsService,
    private router: Router,
    private translate: TranslateService,
    private snackbarSvc: SnackBarService)
  {
    this.id = parseInt(this.route.snapshot.paramMap.get('id') as string);  
    this.room = {} as Room;
    this.operationForm = this.formBuilder.group({
      'date': [null, Validators.required],
      'startHour': [null, Validators.required],
      'endHour': [null, Validators.required],
    });

    this.translate.get(['weekDays']).subscribe(translations => {
      this.week = <string[]>translations['weekDays'];
    });
  }

  ngOnInit(): void {
    this.roomSvc.getById(this.id).subscribe((room: Room) => {
      this.room = room;
    });

    this.operationSvc.getOperations().subscribe(
      (operations: Operation[]) => this.operations = operations
    );

    this.operationForm.get("date")?.valueChanges.subscribe(newValue => {
      this.getHours(newValue);
    });

    this.operationForm.get("startHour")?.valueChanges.subscribe(newValue => {
      this.nHours = this.operationForm.value.endHour - newValue;
      this.cost = this.room.price * this.nHours;
    });

    this.operationForm.get("endHour")?.valueChanges.subscribe(newValue => {
      this.nHours = newValue - this.operationForm.value.startHour;
      this.cost = this.room.price * this.nHours;
    });
  }

  navigateDetails(id: number): void {
    this.router.navigate(['customer/business-detail', id]);
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
    if (this.room && date) {
      const weekDay = date.getDay();
      let index = this.room.schedules.findIndex(schedule => schedule.weekDay == weekDay);
      if (index < 0) {
        this.hours = []
      } else {
        this.unavailableHours = [];
        this.operations.map(operation => {
          if (operation.start.toDateString() === date.toDateString()) {
            for (let i = operation.start.getHours(); i <= operation.end.getHours(); i++) {
              this.unavailableHours.push(i);
            } 
          }
        });
        const startHour = this.room.schedules[index]?.start?.getHours();
        const endHour = this.room.schedules[index]?.end?.getHours();
        this.hours = []
        for (let i = startHour; i <= endHour; i++) {
          if (!this.unavailableHours.find(h => h == i)) {
            this.hours.push(i);
          }
        }

      }
    }
  }

  createOperation(): void {
    var startDateTime = new Date(this.operationForm.value.date);
    var endDateTime = new Date(this.operationForm.value.date);
    startDateTime.setHours(this.operationForm.value.startHour)
    endDateTime.setHours(this.operationForm.value.endHour)
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = <any>this.jwtDecode(token);
      const userId = decodedToken.id;
      let newOperation: Operation = <Operation>{
        customer: <User>{id: userId},
        business: this.room.business,
        room: this.room,
        start: startDateTime,
        end: endDateTime,
        cost: this.cost,
        status: "PENDING"
      };
      this.operationSvc.addOperation(newOperation).subscribe( op => {
        this.snackbarSvc.openSuccess('messages.reservationSuccess');
        this.operations = [...this.operations, op];
      }, (e: HttpErrorResponse) => {
        console.log(e.status);
        this.snackbarSvc.openError('messages.reservationError');
      });

      this.router.navigate(['customer/home']);
    }
  }

}
