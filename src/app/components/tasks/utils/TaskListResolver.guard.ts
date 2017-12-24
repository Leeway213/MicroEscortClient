import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { ProjectService, ProjectModel } from "../../../services/project.service";


@Injectable()
export class TaskListResolver implements Resolve<ProjectModel[]> {

    constructor (private projectService: ProjectService) {}

    async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<ProjectModel[]> {
        const result = await this.projectService.getProjects();
        return result;
    }

}