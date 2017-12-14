import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './tasks/tasks.component';
import { TasksRoutingModule } from './tasks.routing';
import { MatCardModule } from '@angular/material';
import { FilterPipe } from './utils/filter.pipe';

@NgModule({
  imports: [
    CommonModule,
    TasksRoutingModule,
    MatCardModule
  ],
  declarations: [TasksComponent, FilterPipe],
  providers: [FilterPipe]
})
export class TasksModule { }
