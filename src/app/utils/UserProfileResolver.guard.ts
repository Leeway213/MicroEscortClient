import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { UserProfile } from "../services/models/UserProfile";
import { UserService } from "../services/user.service";


@Injectable()
export class UserProfileResolver implements Resolve<UserProfile> {
    
    constructor(private userService: UserService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): UserProfile | Observable<UserProfile> | Promise<UserProfile> {
        return this.userService.getProfile();
    }

}