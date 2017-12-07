import { Router } from '@angular/router';
import { Component, OnInit, trigger, state, style, transition, animate } from '@angular/core';
import { TaskService, TaskModel } from '../../services/task.service';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  animations: [
    trigger('hover', [
      state('yes', style({
        'transform': 'scale(1.03)'
      })),
      state('no', style({
        'transform': 'scale(1)'
      })),
      transition('yes => no', animate('200ms ease-out')),
      transition('no => yes', animate('200ms ease-out'))
    ])
  ]
})
export class TasksComponent implements OnInit {

  tasks: TaskModel[] = [];
  projects: ProjectModel[] = [];

  constructor(private projectService: ProjectService, private router: Router) { }

  ngOnInit() {
    this.projectService.getProjects();
  }

  onCardClick(project: ProjectModel) {
    console.log(project);
    this.router.navigate(['tasks', project.id]);
  }

}

export class ProjectModel {
  id: string;
  name: string;
  description: string;
  quiz: boolean;
  requester: string;
  createdAt: Date;
  updatedAt: Date;
}

