import { Routes, RouterModule } from "@angular/router";
import { TasksComponent } from "./tasks/tasks.component";
import { NgModule } from "@angular/core";
import { TaskResolver } from "../../utils/TaskResolver.guard";



const routes: Routes = [
    {
        path: '',
        component: TasksComponent,
    },
    {
        path: ':id',
        loadChildren: 'app/components/do-task/do-task.module#DoTaskModule',
        resolve: {task: TaskResolver}
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TasksRoutingModule {}