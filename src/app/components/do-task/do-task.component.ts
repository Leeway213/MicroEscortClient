import { LabelToolComponent } from './../label-tools/LabelToolComponent';
import { ToolSwitchDirective } from '../../directives/tool-switch.directive';
import { Component, ComponentFactoryResolver, OnInit, Type, ComponentFactory, ViewChild } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskModel } from '../tasks/tasks.component';
import { MindToolComponent } from '../mind-tool/mind-tool.component';

@Component({
  selector: 'app-do-task',
  templateUrl: './do-task.component.html',
  styleUrls: ['./do-task.component.css']
})
export class DoTaskComponent implements OnInit {


  tasks: TaskModel[];
  quizResult: any;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
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

  next(mindToolComponent: MindToolComponent) {
    this.quizResult = undefined;
    mindToolComponent.next();
  }

  getQuizResult(quizResult: any) {
    this.quizResult = quizResult;
  }

}
