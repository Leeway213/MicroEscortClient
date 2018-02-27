import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, trigger, state, style, transition, animate } from '@angular/core';
import { TaskModel } from '../../../services/task.service';
import { ProjectService, ProjectModel } from '../../../services/project.service';
import { LeftNav } from '../../shared-module/left-nav-panel/LeftNav';
import { TaskSetModel, TaskSetService } from '../../../services/taskset.service';

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

  selectedNav: number = 0;

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
        "语音任务",
        "外联任务"
      ],
      link: null
    }
  ];

  tasks: TaskModel[] = [];

  candoTaskSets: TaskSetModel[] = [];
  trainingProject: ProjectModel = this.projectService.project;
  // candoProjects: ProjectModel[] = [];
  // quizProjects: ProjectModel[] = []

  constructor(
    public projectService: ProjectService,
    private tasksetService: TaskSetService,
    private router: Router,
    private route: ActivatedRoute
  ) { 
    this.candoTaskSets = this.tasksetService.tasksets;
    // this.trainingProject = this.projectService.project;
  }

  ngOnInit() {
    // this.route.data.subscribe(
    //   data => {
    //     if (data.tasklist) {
    //       this.candoTaskSets = data.tasklist;
    //     }
    //     if (data.trainingProject) {
    //       this.trainingProject = data.trainingProject;
    //     }
    //   }
    // );
    // this.candoProjects = this.projectService.projects.filter(value => !value.quiz);
    // this.quizProjects = this.projectService.projects.filter(value => value.quiz);
  }

  onCardClick(project: ProjectModel) {
    // this.router.navigate(['/tasks'], {queryParams: {id: project.id}});
    this.router.navigate(['/tasks', project.id]);
  }

  navChanged(event: any) {
    this.selectedNav = event.nav;

    if (event.item === -1) {
      this.candoTaskSets = this.tasksetService.tasksets;
      this.trainingProject = this.projectService.project;
      // this.candoProjects = this.projectService.projects.filter(value => !value.quiz);
      // this.quizProjects = this.projectService.projects.filter(value => value.quiz);
      return;
    }
    console.log(event);
    this.candoTaskSets = this.filtTaskSets(this.tasksetService.tasksets, this.navs[event.nav].items[event.item]);
    this.trainingProject = this.filtProjects(this.projectService.project, this.navs[event.nav].items[event.item]) as ProjectModel;
    // this.candoProjects = this.filtProjects(this.projectService.projects.filter(value => !value.quiz), this.navs[event.nav].items[event.item]);
    // this.quizProjects = this.filtProjects(this.projectService.projects.filter(value => value.quiz), this.navs[event.nav].items[event.item]);
  }

  private filtTaskSets(tasksets: TaskSetModel[], str: string) {
    return tasksets.filter(value => {
      switch (str) {
        case "图像任务":
          return value.dataType === "image";
        case "文本任务":
          return value.dataType === "text";
        case "语音任务":
          return value.dataType === "voice";
        case "外联任务":
          return value.type === "foreign";
        default:
          return false;
      }
    });
  }
  private filtProjects(project: ProjectModel, str: string) {
    return {
      tasksets: this.filtTaskSets(project.tasksets, str)
    };
    // return projects.filter(value => {
    //   switch (str) {
    //     case "图像任务":
    //       return value.dataType === "image";
    //     case "文本任务":
    //       return value.dataType === "text";
    //     case "语音任务":
    //       return value.dataType === "voice";
    //     case "外联任务":
    //       return value.type === "foreign";
    //     default:
    //       return false;
    //   }
    // })
  }

}


