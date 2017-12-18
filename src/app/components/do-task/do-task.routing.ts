import { Routes, RouterModule } from "@angular/router";
import { DoTaskComponent } from "./do-task/do-task.component";
import { NgModule } from "@angular/core";


const routes: Routes = [
    {
        path: '',
        component: DoTaskComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DoTaskRoutingModule {}