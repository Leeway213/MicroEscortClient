import { ToolType } from './components/mind-tool/models/ToolType';
import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { HttpProgressService } from './services/http-progress.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  imgSrc = 'https://images.spare5.com/instructions/spare5/building_blocks.png';

  leftNavs: NavModel[] = [
    {
      title: '我的任务',
      routerLink: '/tasks',
      children: undefined
    },
    {
      title: '粒微社区',
      routerLink: '/login',
      children: undefined
    }
  ];

  constructor(
    private userServce: UserService,
    private httpProgressService: HttpProgressService
  ) {
    this.userServce.role = 'Trainer';
  }
}

export class NavModel {
  constructor(
    public title: string,
    public routerLink: string,
    public children: NavModel[]
  ) {}
}
