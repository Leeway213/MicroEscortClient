import { Injectable } from "@angular/core";
import { ProjectModel, ProjectService } from '../../../services/project.service';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";


@Injectable()
export class TrainingProjectResolver implements Resolve<ProjectModel> {
    constructor(
        private projectService: ProjectService
    ) {}

    async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<ProjectModel> {
        try {
            const result = await this.projectService.getTrainingProject();
            return result;
        } catch (error) {
            console.error(error);
        }
    }
}