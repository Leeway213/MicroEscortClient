import { Routes, RouterModule } from "@angular/router";
import { DoTaskComponent } from "./do-task/do-task.component";
import { NgModule } from "@angular/core";
import { TaskResolver } from "../../utils/TaskResolver.guard";


const routes: Routes = [
    {
        path: '',
        component: DoTaskComponent,
        resolve: {task: TaskResolver}
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DoTaskRoutingModule {}