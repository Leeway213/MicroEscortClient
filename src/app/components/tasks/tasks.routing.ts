import { Routes, RouterModule } from "@angular/router";
import { TasksComponent } from "./tasks/tasks.component";
import { NgModule } from "@angular/core";
import { TaskResolver } from "../../utils/TaskResolver.guard";
import { AuthGuard } from "../../utils/auth.guard";
import { TaskListResolver } from "./utils/TaskListResolver.guard";
import { TrainingProjectResolver } from "./utils/TrainingProject.guard";



const routes: Routes = [
    {
        path: '',
        component: TasksComponent,
        resolve: {
            tasklist: TaskListResolver,
            trainingProject: TrainingProjectResolver
        }
    },
    {
        path: ':id',
        loadChildren: 'app/components/do-task/do-task.module#DoTaskModule',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TasksRoutingModule {}