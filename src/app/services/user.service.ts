import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TRAINER_SERVER, REQUESTER_SERVER } from './constants';
import { UserProfile } from './models/UserProfile';
import * as moment from 'moment';


@Injectable()
export class UserService {
  role: 'Requester' | 'Trainer' = 'Requester';

  profile: UserProfile;

  weekMoney: number;
  totalMoney: number;

  get user(): any {
    return JSON.parse(localStorage.getItem('user'));
  }

  get baseUrl() {
    return this.role === 'Trainer' ? TRAINER_SERVER : REQUESTER_SERVER;
  }

  constructor(public http: HttpClient, protected router: Router) { }

  validateUsername(username: string): Promise<any> {
    return this.http
      .get(`${this.baseUrl}/users/validate`, {
        params: new HttpParams()
          .set('username', username)
          .set('role', this.role)
      })
      .toPromise();
  }

  signup(userinfo: any): Promise<any> {
    const promise = new Promise((resolve, reject) => {
      this.http.post(`${this.baseUrl}/users/signup`, userinfo).subscribe(
        res => {
          const result = res as any;
          if (result.code === 1) {
            localStorage.setItem('user', JSON.stringify(result.data));
            resolve(result);
          } else {
            // todo: show the error
            reject(result);
          }
        },
        err => {
          // todo: show the error
          reject(err);
        }
      );
    });
    return promise;
  }

  async login(userinfo: any): Promise<any> {
    const promise = new Promise((resolve, reject) => {
      this.http
        .post(
        `${this.baseUrl}/users/login`,
        `username=${userinfo.username}&password=${userinfo.password}`,
        {
          headers: new HttpHeaders().set(
            'Content-Type',
            'application/x-www-form-urlencoded'
          )
        }
        )
        .subscribe(
        res => {
          const result = res as any;
          if (result.code === 1) {
            localStorage.setItem('user', JSON.stringify(result.data));
            resolve(result);
          } else {
            reject(result);
          }
        },
        err => {
          reject(err);
        }
        );
    });
    return promise;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  checkAuth(): boolean {
    const userStr: string = localStorage.getItem('user');
    if (userStr) {
      const user: any = JSON.parse(userStr);
      const now: number = Date.parse(new Date().toString());
      return user.expire > now;
    }
    return false;
  }

  async getProfile(): Promise<UserProfile> {
    try {

      // 获取weekMoney和totalMoney
      let data: any = await this.getMoney()
      this.totalMoney = data.money;

      data = await this.getMoney(moment((Date.now() - moment.duration(1, 'weeks').asMilliseconds())).toDate());
      this.weekMoney = data.money;

      // 获取用户profile
      const response: any = await this.http.get(`${this.baseUrl}/users/profile`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.user.token
        })
      }).toPromise();
      this.profile = response.data as UserProfile;
      return this.profile;
    } catch (error) {
      throw error;
    }
  }

  async getMoney(start?: Date, end?: Date) {
    try {
      let url = `${this.baseUrl}/users/money`;
      if (start || end) {
        url += '?';
        url += start ? `startTime=${start.valueOf()}&` : ``;
        url += end ? `endTime=${end.valueOf()}&` : ``;
        url = url.substr(0, url.length - 1);
      }

      const resData: any = await this.http.get(url, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.user.token
        })
      }).toPromise();

      if (resData.code === 1) {
        return Promise.resolve(resData.data);
      } else {
        return Promise.resolve(null);
      }
    } catch (error) {
      return Promise.resolve(error);
    }
  }
}
