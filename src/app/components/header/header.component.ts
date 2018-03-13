import { UserService } from '../../services/user.service';
import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { NavModel } from "../../app.component";
import { ActivatedRoute, NavigationEnd, Router,ActivationEnd } from '@angular/router';
import { GetIdService } from '../../services/getId.service';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  
  @Input() brand: string;

  @Input() leftNavs: NavModel[];

  currentPath: string;
  editorShow:boolean=false;
  tasksetId:string;
  cacheid:string;
  constructor(
    private activatedRoute: ActivatedRoute, 
    private router: Router, 
    public userService: UserService,
    private getIdService:GetIdService
  ) {
    
  }

  ngOnInit() {
    this.router.events.subscribe(
      data => {
        if (data instanceof NavigationEnd) {
          this.currentPath = data.urlAfterRedirects;
          if(this.getIdService.currentTasksetId){
            this.tasksetId=this.getIdService.currentTasksetId;
            this.editorShow=true;
          }else{
            this.editorShow=false;
          }
        }       
      }
    );
  }
  logout() {
    this.userService.logout();
  }
  showToturial(){
    this.editorShow=true;
  }
  change(){
    this.editorShow=false;
  }

}
