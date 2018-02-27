import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { TaskSetModel } from './taskset.service';

@Injectable()
export class ProjectService {

  project: ProjectModel;

  constructor(private http: HttpClient, private userService: UserService) { }

  getTrainingProject(): Promise<ProjectModel> {
    const p = new Promise<ProjectModel>((resolve, reject) => {
      this.http.get(`${this.userService.baseUrl}/projects/training`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.userService.user.token}`
        })
      }).subscribe(
        data => {
          const resData = data as any;
          if (resData.code === 200) {
            this.project = resData.data.project;
            resolve(resData.data.project);
          } else {
            reject(resData.msg);
          }
        },
        error => {
          if (error instanceof HttpErrorResponse && error.status === 401) {
            this.userService.logout();
          }
          reject(error);
        }
      )
    });
    return p;
  }


  // getProjects(): Promise<ProjectModel[]> {
  //   const p = new Promise<ProjectModel[]>((resolve, reject) => {
  //     this.http.get(`${this.userService.baseUrl}/projects`, {
  //       headers: new HttpHeaders({
  //         Authorization: 'Bearer ' + this.userService.user.token
  //       }),
  //       reportProgress: true
  //     }).subscribe(
  //       res => {
  //         const resData = res as any;
  //         if (resData.code === 1) {
  //           this.projects = resData.data;
  //           resolve(this.projects as ProjectModel[]);
  //         } else {
  //           reject(resData.msg);
  //         }
  //       },
  //       err => {
  //         console.log(err);
  //         if (err instanceof HttpErrorResponse && err.status === 401) {
  //           this.userService.logout();
  //         }
  //         reject(err);
  //       }
  //     );
  //   });
  //   return p;

  // }

}



export interface ProjectModel {
  id: string;
  name: string;
  description: string;
  requester: string;
  createdAt: Date;
  updatedAt: Date;
  tasksets: TaskSetModel[];
}
