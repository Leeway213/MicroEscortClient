import { AuthGuard } from './utils/auth.guard';
import { NgModule } from '@angular/core';
import { MindToolComponent } from './components/mind-tool/mind-tool.component';
import { RouterModule, Routes } from '@angular/router';
import { TaskPublisherComponent } from './components/task-publisher/task-publisher.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { TaskResolver } from './utils/TaskResolver.guard';
import { DoTaskComponent } from './components/do-task/do-task.component';

const routes: Routes = [
    {
        path: '', redirectTo: 'tasks', pathMatch: 'full'
    },
    {
        path: 'login', loadChildren: 'app/components/login/login.module#LoginModule'
    },
    {
        path: 'signup', loadChildren: 'app/components/signup/signup.module#SignupModule'
    },
    {
        path: 'tasks', component: TasksComponent, canActivate: [AuthGuard]
    },
    {
        path: 'tasks/:id', component: DoTaskComponent, resolve: {task: TaskResolver}
    },
    {
        path: 'profile', loadChildren: 'app/components/user-profile/user-profile.module#UserProfileModule', canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
