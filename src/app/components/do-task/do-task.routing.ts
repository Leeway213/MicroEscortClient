import { Routes, RouterModule } from "@angular/router";
import { DoTaskComponent } from "./do-task/do-task.component";
import { NgModule } from "@angular/core";
import { TaskResolver } from "../../utils/TaskResolver.guard";
import { TaskSetResolver } from "./utils/TaskSetResolver.guard";
import { PageGuard } from "./utils/page.guard";


const routes: Routes = [
    {
        path: '',
        component: DoTaskComponent,
        resolve: {taskset: TaskSetResolver, task: TaskResolver},
        canDeactivate:[PageGuard],
        canActivate:[PageGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DoTaskRoutingModule {}