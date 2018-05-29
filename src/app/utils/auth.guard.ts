import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router/src/interfaces";
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from "rxjs/Observable";
import { UserService } from "../services/user.service";


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private userService: UserService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        const authed: boolean = this.userService.checkAuth();
        if (!authed) {
            this.router.navigate(['login']);
        }
        return authed;
    }

}
