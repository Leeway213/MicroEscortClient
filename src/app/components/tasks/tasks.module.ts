import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './tasks/tasks.component';
import { TasksRoutingModule } from './tasks.routing';
import { MatCardModule } from '@angular/material';
import { FilterPipe } from './utils/filter.pipe';
import { DoTaskModule } from '../do-task/do-task.module';
import { MySharedModule } from '../shared-module/shared.module';
import { TaskHouseComponent } from './task-house/task-house.component';
import { TrainingHouseComponent } from './training-house/training-house.component';
import { RecommendTaskComponent } from './recommend-task/recommend-task.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskListResolver } from './utils/TaskListResolver.guard';

@NgModule({
  imports: [
    MySharedModule,
    TasksRoutingModule,
    MatCardModule
  ],
  declarations: [
    TasksComponent,
    FilterPipe,
    TaskHouseComponent,
    TrainingHouseComponent,
    RecommendTaskComponent,
    TaskListComponent
  ],
  providers: [FilterPipe, TaskListResolver],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TasksModule { }
