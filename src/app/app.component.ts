import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { HttpProgressService } from './services/http-progress.service';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  imgSrc = 'https://images.spare5.com/instructions/spare5/building_blocks.png';

  navigating: boolean;

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
    },
    {
      title: ' 历史记录',
      routerLink: '/history',
      children: undefined
    }
  ];

  constructor(
    private userServce: UserService,
    public httpProgressService: HttpProgressService,
    private router: Router
  ) {
    this.userServce.role = 'Trainer';
  }

  ngOnInit(): void {
    this.router.events.subscribe(e => {
      if (e instanceof NavigationStart) {
        this.navigating = true;
      } else if (e instanceof NavigationEnd) {
        setTimeout(() => {
          this.navigating = false;
        }, 80);
      } 
    });
  }
}

export class NavModel {
  constructor(
    public title: string,
    public routerLink: string,
    public children: NavModel[]
  ) {}
}
