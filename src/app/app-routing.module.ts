import { AuthGuard } from './utils/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskPublisherComponent } from './components/task-publisher/task-publisher.component';
import { TasksComponent } from './components/tasks/tasks/tasks.component';
import { TaskResolver } from './utils/TaskResolver.guard';
import { UserProfileResolver } from './utils/UserProfileResolver.guard';

const routes: Routes = [
    {
        path: 'login', loadChildren: 'app/components/login/login.module#LoginModule'
    },
    {
        path: 'signup', loadChildren: 'app/components/signup/signup.module#SignupModule'
    },
    {
        path: 'tasks', loadChildren: 'app/components/tasks/tasks.module#TasksModule', canActivate: [AuthGuard], resolve: { userProfile: UserProfileResolver }
    },
    {
        path: 'profile', loadChildren: 'app/components/user-profile/user-profile.module#UserProfileModule', canActivate: [AuthGuard], resolve: {userProfile: UserProfileResolver}
    },
    {
        path: '**', redirectTo: 'tasks', pathMatch: 'full'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { enableTracing: false })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
