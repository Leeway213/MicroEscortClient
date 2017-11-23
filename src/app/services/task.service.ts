import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { UserService } from './user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class TaskService {

  constructor(private http: HttpClient, private userService: UserService) {}

  // 从对应projectId的project中获取一条任务
  getTask(projectId: string): Promise<any> {
    return this.http.get(`${this.userService.baseUrl}/projects/${projectId}`, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.userService.user.token
      })
    }).toPromise();
  }

  finishTask(taskId: string, result: object): Promise<any> {
    return this.http.post(`${this.userService.baseUrl}/tasks/${taskId}`, result, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.userService.user.token
      })
    }).toPromise();
  }

  skipTask(taskId: string): Promise<any> {
    return this.finishTask(taskId, null);
  }

}

export class TaskModel {
  id: string;
  name: string;
  type: string;
  params: object;
  callbackUrl: string;
  introduction: string;
  tutorial: string;
  proiority: number;
  status: 'pending' | 'doing' | 'completed';
  project: string;
  createdAt: Date;
  updatedAt: Date;
}


