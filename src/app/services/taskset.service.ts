import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UserService } from "./user.service";

@Injectable()
export class TaskSetService {

    tasksets: TaskSetModel[] = [];

    constructor(
        private http: HttpClient,
        private userService: UserService
    ) {}

    getTaskSets(): Promise<TaskSetModel[]> {
        const p = new Promise<TaskSetModel[]>((resolve, reject) => {
            this.http.get(`${this.userService.baseUrl}/tasksets`, {
                headers: new HttpHeaders({
                    Authorization: `Bearer ${this.userService.user.token}`
                })
            }).subscribe(
                data => {
                    const resData = data as any;
                    if (resData.code === 200) {
                        this.tasksets = resData.data;
                        resolve(resData.data);
                    } else {
                        reject(resData.msg);
                    }
                },
                error => {
                    reject(error);
                }
            );
        });
        return p;
    }
}

export interface TaskSetModel {
    id: string;
    name: string;
    dataType: string;
    type: string;
    description: string;
    labelPrice: number;
    verificationPrice: number;
    verificationTimes: number;
    quiz: boolean;
    complete: boolean;
    requester: string;
    project: string;
    createdAt: Date;
    updatedAt: Date;
}