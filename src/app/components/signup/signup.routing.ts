import { Routes, RouterModule } from "@angular/router";
import { SignupComponent } from "./signup/signup.component";
import { NgModule } from "@angular/core";


const routes: Routes = [
    {
        path: '',
        component: SignupComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SignupRoutingModule {}