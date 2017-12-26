import { UserService } from '../../services/user.service';
import { Component, Input, OnInit } from "@angular/core";
import { NavModel } from "../../app.component";
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  @Input() brand: string;

  @Input() leftNavs: NavModel[];

  currentPath: string;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, public userService: UserService) {}

  ngOnInit() {
    this.router.events.subscribe(
      data => {
        if (data instanceof NavigationEnd) {
          this.currentPath = data.urlAfterRedirects;
        }
      }
    );
  }

  logout() {
    this.userService.logout();
  }

}
