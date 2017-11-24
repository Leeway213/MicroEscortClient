import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TRAINER_SERVER, REQUESTER_SERVER } from './constants';


@Injectable()
export class UserService {
  role: 'Requester' | 'Trainer' = 'Requester';

  get user(): any {
    return JSON.parse(localStorage.getItem('user'));
  }

  get baseUrl() {
    return this.role === 'Trainer' ? TRAINER_SERVER : REQUESTER_SERVER;
  }

  constructor(private http: HttpClient, private router: Router) {}

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

  login(userinfo: any): Promise<any> {
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
}
