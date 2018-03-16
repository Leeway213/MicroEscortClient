import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest ,HttpParams,HttpErrorResponse} from '@angular/common/http';
import { UserService } from './user.service';

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
      this.http.get(`${this.userService.baseUrl}/tasks/skip?task_id=${task.id}`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.userService.user.token}`
        })
      })
      .subscribe(
        data => {
          if ((data as any).code === 200) {
            resolve(data);
          } else {
            reject(data);
          }
        },
        error => {
          reject(error);
        }
      )
    });
    return p;
  }
  //获取任务标注结果
  getTaskResult(
    params?:{
      size:number,
      offset?:number,
      type?:string,
      dataType?:string,
      startIndex?:string,
      endIndex?:string
    }):Promise<any>{
    let urlparams = new HttpParams();
    if(params){    
      params.size?urlparams.append('size',String(params.size)):undefined; 
      params.size?urlparams.append('offset',String(params.offset)):undefined; 
      params.type?urlparams.append('type',params.type):undefined;
      params.type?urlparams.append('dataType',params.dataType):undefined;
      params.type?urlparams.append('startIndex',params.startIndex):undefined;
      params.type?urlparams.append('endIndex',params.endIndex):undefined;
    }
    return this.http.get(`${this.userService.baseUrl}/tasks/records`, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.userService.user.token
      }),
      params: urlparams
    
    }).toPromise();
    
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
  taskset: string;
  project: string;
  requester: string;
  createdAt: Date;
  updatedAt: Date;
}


