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
    public httpProgressService: HttpProgressService,
    private router: Router
  ) {
    this.userServce.role = 'Trainer';
  }

  ngOnInit(): void {
    // this.router.events.subscribe(e => {
    //   console.log(this.httpProgressService.progress);
    //   if (e instanceof NavigationStart) {
    //     this.httpProgressService.loading = true;
    //   } else if (e instanceof NavigationEnd) {
    //     setTimeout(() => {
    //     this.httpProgressService.loading = false;
    //     this.httpProgressService.progress = 0;
    //     }, 2000);
    //   } else {
    //     this.httpProgressService.progress += 10;
    //   }
    // });
  }
}

export class NavModel {
  constructor(
    public title: string,
    public routerLink: string,
    public children: NavModel[]
  ) {}
}
