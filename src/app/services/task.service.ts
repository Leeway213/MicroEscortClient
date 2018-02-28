import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { UserService } from './user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class TaskService {

  constructor(private http: HttpClient, private userService: UserService) {}

  // 从对应tasksetId的project中获取一条任务
  getTask(tasksetId: string): Promise<any> {
    return this.http.get(`${this.userService.baseUrl}/tasksets/${tasksetId}`, {
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

  skipTask(task: TaskModel): Promise<any> {
    // if (task.params.result) {
    //   task.status = 'verifying';
    // } else {
    //   task.status = 'pending';
    // }
    // return this.http.put(`${this.userService.baseUrl}/tasks`, task, {
    //   headers: new HttpHeaders({
    //     'Authorization': 'Bearer ' + this.userService.user.token
    //   })
    // }).toPromise();
    // return this.finishTask(task.id, null);
    const p = new Promise<any>((resolve, reject) => {
      this.http.get(`${this.userService.baseUrl}/tasks/skip?task_id=${task.id}`)
      .subscribe(
        data => {
          resolve(data);
        },
        error => {
          reject(error);
        }
      )
    });
    return p;
  }

}

export class TaskModel {
  id: string;
  name: string;
  type: string;
  quiz: boolean;
  params: any;
  callbackUrl: string;
  introduction: string;
  tutorial: string;
  proiority: number;
  status: 'pending' | 'doing' | 'pendingverify' | 'verifying' | 'completed';
  project: string;
  createdAt: Date;
  updatedAt: Date;
}


