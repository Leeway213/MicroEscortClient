import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ProjectService {

  projects: ProjectModel[];

  constructor(private http: HttpClient, private userService: UserService) {}

  getProjects() {
    this.http.get(`${this.userService.baseUrl}/projects`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.userService.user.token
      })
    }).subscribe(
      res => {
        const resData = res as any;
        if (resData.code === 1) {
          this.projects = resData.data;
        } else {
          window.alert(resData.msg);
        }
      },
      err => {
        console.log(err);
        if (err instanceof HttpErrorResponse && err.status === 401) {
          this.userService.logout();
        }
      }
    );
  }

}



export class ProjectModel {
  id: string;
  name: string;
  description: string;
  quiz: boolean;
  requester: string;
  createdAt: Date;
  updatedAt: Date;
}
