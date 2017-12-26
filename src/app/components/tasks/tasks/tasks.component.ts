import { Router } from '@angular/router';
import { Component, OnInit, trigger, state, style, transition, animate } from '@angular/core';
import { TaskModel } from '../../../services/task.service';
import { ProjectService, ProjectModel } from '../../../services/project.service';
import { LeftNav } from '../../shared-module/left-nav-panel/LeftNav';

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

  navs: LeftNav[] = [
    {
      head: "可做任务",
      items: [
        "图像任务",
        "文本任务",
        "语音任务",
      ],
      link: null
    },
    {
      head: "练功房",
      items: [
        "图像任务",
        "文本任务",
        "语音任务"
      ],
      link: null
    }
  ];

  tasks: TaskModel[] = [];
  candoProjects: ProjectModel[] = [];
  quizProjects: ProjectModel[] = []

  constructor(public projectService: ProjectService, private router: Router) { }

  ngOnInit() {
    this.candoProjects = this.projectService.projects.filter(value => !value.quiz);
    this.quizProjects = this.projectService.projects.filter(value => value.quiz);
  }

  onCardClick(project: ProjectModel) {
    // this.router.navigate(['/tasks'], {queryParams: {id: project.id}});
    this.router.navigate(['/tasks', project.id]);
  }

  navChanged(event: any) {
    if (event.item === -1) {
      this.candoProjects = this.projectService.projects.filter(value => !value.quiz);
      this.quizProjects = this.projectService.projects.filter(value => value.quiz);
      return;
    }
    console.log(event);
    this.candoProjects = this.filtProjects(this.projectService.projects.filter(value => !value.quiz), this.navs[event.nav].items[event.item]);
    this.quizProjects = this.filtProjects(this.projectService.projects.filter(value => value.quiz), this.navs[event.nav].items[event.item]);
  }

  private filtProjects(projects: ProjectModel[], str: string) {
    return projects.filter(value => {
      switch (str) {
        case "图像任务":
          return value.dataType === "image";
        case "文本任务":
          return value.dataType === "text";
        case "语音任务":
          return value.dataType === "voice";
        default:
          return false;
      }
    })
  }

}


