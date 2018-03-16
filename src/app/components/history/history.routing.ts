import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { HistoryComponent } from "./history.component";


const routes: Routes = [
    {
        path: '',
        component: HistoryComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class HistoryRoutingModule {}