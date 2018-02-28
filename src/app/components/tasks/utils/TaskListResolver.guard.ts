import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "../../../services/user.service";
import { TaskSetModel, TaskSetService } from "../../../services/taskset.service";


@Injectable()
export class TaskListResolver implements Resolve<TaskSetModel[]> {

    constructor (private userService: UserService, private tasksetService: TaskSetService) {}

    async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<TaskSetModel[]> {
        try {
            const result = await this.tasksetService.getTaskSets();
            return result;
        } catch (error) {
            console.error(error);
            // throw error;
        }
    }

}