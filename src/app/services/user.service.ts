import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

const BASE_URL = `http://localhost:3000`;

@Injectable()
export class UserService {

  role: 'Requester' | 'Trainer' = 'Trainer';

  constructor(private http: HttpClient) {
  }

  validateUsername(username: string): Promise<any> {
    return this.http
      .get(`${BASE_URL}/${this.role}/validate`, {
        params: new HttpParams().set('username', username)
      })
      .toPromise();
  }

  signup(userinfo: any): Promise<any> {
    return this.http
      .post(`${BASE_URL}/${this.role}/signup`, userinfo)
      .toPromise();
  }

  login(userinfo: any): Promise<any> {
    return this.http
      .post(`${BASE_URL}/users/login`, `username=${userinfo.username}&password=${userinfo.password}`, {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      }).toPromise();
  }
}
