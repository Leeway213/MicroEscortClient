import { LabelToolComponent } from './../../label-tools/LabelToolComponent';
import { Component, ComponentFactoryResolver, OnInit, Type, ComponentFactory, ViewChild } from '@angular/core';
import { TaskService, TaskModel } from '../../../services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MindToolComponent } from '../mind-tool/mind-tool.component';
import { ProjectService, ProjectModel } from '../../../services/project.service';

@Component({
  selector: 'app-do-task',
  templateUrl: './do-task.component.html',
  styleUrls: ['./do-task.component.css']
})
export class DoTaskComponent implements OnInit {


  tasks: TaskModel[];
  quizResult: any;

  currentProject: ProjectModel;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    public projectService: ProjectService
  ) {
  }

  ngOnInit() {
    this.currentProject = this.projectService.projects.find(value => value.id === this.route.snapshot.params.id);
    console.log(this.currentProject);
    this.initialize();
  }

  private initialize() {
    this.route.data.subscribe(
      res => {
        this.tasks = res.task;
      }
    );
  }

  submit(mindToolComponent: MindToolComponent) {
    mindToolComponent.submit();
  }

  async skip(mindToolComponent: MindToolComponent) {
    try {
      await this.taskService.skipTask(mindToolComponent.currentTask);
    } catch (err) {
      console.log(err);
    }
    mindToolComponent.next();
  }

  next(mindToolComponent: MindToolComponent) {
    this.quizResult = undefined;
    mindToolComponent.next();
  }

  getQuizResult(quizResult: any) {
    this.quizResult = quizResult;
  }

}
