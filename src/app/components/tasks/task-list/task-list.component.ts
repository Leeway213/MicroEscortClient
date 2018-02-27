import { Component, OnInit, Input } from '@angular/core';
import { TaskSetModel } from '../../../services/taskset.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  @Input() tasksets: TaskSetModel[] = [];

  @Input() type: string;

  constructor() { }

  ngOnInit() {
  }
}
