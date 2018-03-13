import { ActivatedRouteSnapshot, RouterStateSnapshot,CanActivate,CanDeactivate } from "@angular/router";
import { TaskSetModel, TaskSetService } from "../../../services/taskset.service";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { GetIdService } from "../../../services/getId.service";

@Injectable()
export class PageGuard implements CanDeactivate<any>,CanActivate{
    constructor(
        private tasksetService: TaskSetService,
        private getId:GetIdService
    ) {}
    
    canDeactivate():boolean{
        this.getId.currentTasksetId=undefined;
        return true;
    }
    canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):boolean{
       const tasksetId = route.params.id;
       this.getId.currentTasksetId=tasksetId;
       return true;
    }
}