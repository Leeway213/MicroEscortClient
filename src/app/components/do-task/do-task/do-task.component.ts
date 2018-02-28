import { LabelToolComponent } from './../../label-tools/LabelToolComponent';
import { Component, ComponentFactoryResolver, OnInit, Type, ComponentFactory, ViewChild } from '@angular/core';
import { TaskService, TaskModel } from '../../../services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MindToolComponent } from '../mind-tool/mind-tool.component';
import { ProjectService, ProjectModel } from '../../../services/project.service';
import { TaskSetModel, TaskSetService } from '../../../services/taskset.service';

@Component({
  selector: 'app-do-task',
  templateUrl: './do-task.component.html',
  styleUrls: ['./do-task.component.css']
})
export class DoTaskComponent implements OnInit {

  private mindToolComponent: MindToolComponent;
  @ViewChild("mindTool") 
  set mindToolComponentSetter(content: MindToolComponent) {
    this.mindToolComponent = content;
  }

  tasks: TaskModel[] = [];
  quizResult: any;

  constructor(
    private tasksetService: TaskSetService,
    private taskService: TaskService,
    private route: ActivatedRoute
  ) { 
  }

  ngOnInit() {
    this.initialize();
  }

  private initialize() {
    this.route.data.subscribe(
      res => {
        this.tasks = res.task.tasks;

        console.log('**********');
        console.log(this.tasks);
      }
    );
  }

  submit() {
    this.mindToolComponent.submit();
  }

  async skip() {
    try {
      await this.taskService.skipTask(this.mindToolComponent.currentTask);
    } catch (err) {
      console.log(err);
    }
    this.mindToolComponent.next();
  }

  next() {
    this.quizResult = undefined;
    this.mindToolComponent.next();
  }

  getQuizResult(quizResult: any) {
    this.quizResult = quizResult;
  }

}
