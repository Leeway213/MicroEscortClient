import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { TaskSetModel, TaskSetService } from "../../../services/taskset.service";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { GetIdService } from "../../../services/getId.service";
import { CanDeactivate } from "@angular/router/src/interfaces";

@Injectable()
export class TaskSetResolver implements Resolve<TaskSetModel>{
    constructor(
        private tasksetService: TaskSetService,
        private getId:GetIdService
    ) {}
    async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<TaskSetModel> {
        const tasksetId = route.params.id;
        const result = await this.tasksetService.getTaskSetById(tasksetId);
        return result;
    }
}