import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskModel } from '../tasks/tasks.component';
import { MindToolComponent } from '../mind-tool/mind-tool.component';
import { BoundingBox } from '../mind-tool/models/BoundingBox';
import { ToolType } from '../mind-tool/models/ToolType';

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
    private route: ActivatedRoute) { }

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
