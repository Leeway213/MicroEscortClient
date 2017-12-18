import { AuthGuard } from './utils/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskPublisherComponent } from './components/task-publisher/task-publisher.component';
import { TasksComponent } from './components/tasks/tasks/tasks.component';
import { TaskResolver } from './utils/TaskResolver.guard';

const routes: Routes = [
    {
        path: 'login', loadChildren: 'app/components/login/login.module#LoginModule'
    },
    {
        path: 'signup', loadChildren: 'app/components/signup/signup.module#SignupModule'
    },
    {
        path: 'tasks', loadChildren: 'app/components/tasks/tasks.module#TasksModule', canActivate: [AuthGuard]
    },
    // {
    //     path: 'do', loadChildren: 'app/components/do-task/do-task.module#DoTaskModule', resolve: {do: TaskResolver}
    // },
    {
        path: 'profile', loadChildren: 'app/components/user-profile/user-profile.module#UserProfileModule', canActivate: [AuthGuard]
    },
    {
        path: '**', redirectTo: 'tasks', pathMatch: 'full'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {enableTracing: false})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
