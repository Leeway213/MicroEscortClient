import { Component } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ UserService ]
})
export class AppComponent {
  title = 'app';
  imgSrc = 'https://images.spare5.com/instructions/spare5/building_blocks.png';
  
  constructor(
    private userServce: UserService
  ) {
    this.userServce.role = 'Requester';
  }


}
