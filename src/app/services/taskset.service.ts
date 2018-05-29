import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UserService } from "./user.service";

@Injectable()
export class TaskSetService {

    constructor(
        private http: HttpClient,
        private userService: UserService
    ) { }

    getTaskSets(query?: any): Promise<TaskSetModel[]> {
        const p = new Promise<TaskSetModel[]>((resolve, reject) => {
            let url = `${this.userService.baseUrl}/tasksets?`;
            if (query) {
                for (const key in query) {
                    url += `${key}=${query[key]}&`;
                }
            }
            url = url.substr(0, url.length - 1);
            this.http.get(url, {
                headers: new HttpHeaders({
                    Authorization: `Bearer ${this.userService.user.token}`
                })
            }).subscribe(
                data => {
                    const resData = data as any;
                    if (resData.code === 200) {
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

    async getTaskSetById(id: string): Promise<TaskSetModel> {
        const p = new Promise<TaskSetModel>((resolve, reject) => {
            this.http.get(`${this.userService.baseUrl}/tasksets/detail?taskset_id=${id}`, {
                headers: new HttpHeaders({
                    Authorization: `Bearer ${this.userService.user.token}`
                })
            }).subscribe(
                data => {
                    const objData = data as any;
                    if (objData.code === 200) {
                        resolve(objData.data.taskset);
                    } else {
                        reject(objData.msg);
                    }
                },
                error => {
                    reject(error);
                }
            )
        });

        return p;
        // const result = await this.getTaskSets({taskset_id: id});
        // if (result && result.length > 0)  {
            // return result[0];
        // } else {
            // return null;
        // }
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