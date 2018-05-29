import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { UserProfile } from "../services/models/UserProfile";
import { UserService } from "../services/user.service";


@Injectable()
export class UserProfileResolver implements Resolve<UserProfile> {
    
    constructor(private userService: UserService) {}

    async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<UserProfile> {
        try{
            const resData: UserProfile = await this.userService.getProfile();
            return resData;
        } catch (error) {
            this.userService.logout();
        }
    }

}