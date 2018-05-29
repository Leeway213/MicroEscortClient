import { Injectable } from "@angular/core";
import { UserService } from "../../../services/user.service";
import { UserProfile } from "../../../services/models/UserProfile";
import { HttpHeaders } from "@angular/common/http";


@Injectable()
export class UserInfoService {

    get profile() {
        return this.userService.profile;
    }

    set profile(value: UserProfile) {
        this.userService.profile = value;
    }

    constructor(private userService: UserService) {
    }

    getTaskCount() {
    }

    async updateProfile(data: any) {
        try {
            const res: any = await this.userService.http.put(`${this.userService.baseUrl}/users/profile`, data, {
                headers: new HttpHeaders({
                    Authorization: 'Bearer ' + this.userService.user.token
                })
            }).toPromise();

            if (res.code === 1) {
                this.profile = res.data;
            } 
            return res;
        } catch(error) {
            throw error;
        }
   }
}