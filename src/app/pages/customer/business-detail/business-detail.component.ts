import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { User } from 'src/app/global/interfaces/user.interface';
import { UsersService } from 'src/app/global/services/users.service';

@Component({
  selector: 'app-business-detail',
  templateUrl: './business-detail.component.html',
  styleUrls: ['./business-detail.component.scss']
})
export class BusinessDetailComponent {
  id: number;
  business: User;

  constructor(
    private route: ActivatedRoute,
    private userSvc: UsersService)
  {
    this.id = parseInt(this.route.snapshot.paramMap.get('id') as string);  
    this.business = {} as User;
  }

  ngOnInit(): void {
    this.userSvc.getById(this.id).subscribe((user: User) => {
      this.business = user;
    });
  }
}
