import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { TaskSetModel, TaskSetService } from "../../../services/taskset.service";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

@Injectable()
export class TaskSetResolver implements Resolve<TaskSetModel> {
    constructor(
        private tasksetService: TaskSetService
    ) {}
    async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<TaskSetModel> {
        const tasksetId = route.params.id;
        const result = await this.tasksetService.getTaskSetById(tasksetId);
        return result;
    }
}