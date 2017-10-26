import { NgModule } from '@angular/core';
import { MindToolComponent } from './components/mind-tool/mind-tool.component';
import { LoginComponent } from './components/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
    // {
    //     path: '', redirectTo: 'login', pathMatch: 'full'
    // },
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'signup', component: SignupComponent
    },
    {
        path: 'requester', redirectTo: 'login', pathMatch: 'full'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
