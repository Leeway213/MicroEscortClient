import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { OverviewComponent } from "./overview/overview.component";
import { CashOutComponent } from "./cash-out/cash-out.component";
import { CashRecordComponent } from "./cash-record/cash-record.component";


const routes: Routes = [
    {
        path: '',
        component: UserProfileComponent,
        children: [
            {
                path: '',
                component: OverviewComponent
            },
            {
                path: 'cashOut',
                component: CashOutComponent
            },
            {
                path: 'cashRecord',
                component: CashRecordComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class ProfileRoutingModule {}