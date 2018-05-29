import { Component, OnInit } from '@angular/core';
import { LeftNav } from '../../shared-module/left-nav-panel/LeftNav';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  navs: any[] = [
    {
      head: "个人中心",
      items: [
        {
          desc: "账户总览",
          link: ""
        },
        {
          desc: "金钱提现",
          link: "cashOut"
        },
        {
          desc: "提现记录",
          link: "cashRecord"
        }
      ]
    }
  ];

  currentPath: string;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.currentPath = this.router.url;
    this.router.events.subscribe(
      event => {
        if (event instanceof NavigationEnd) {
          this.currentPath = event.urlAfterRedirects;
        }
      }
    )
  }

  selectNavItem(i: number) {
    this.router.navigate([`profile/${this.navs[0].items[i].link}`]);
  }

}
