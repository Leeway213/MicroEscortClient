import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})
export class UserPanelComponent implements OnInit {

  constructor(public userService: UserService) { }

  async ngOnInit() {
    await this.userService.getProfile();
    console.log(this.userService.profile);
  }

}
