import { Component, OnInit, Input } from '@angular/core';
import { ProjectModel } from '../../../services/project.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  @Input() projects: ProjectModel[] = [];

  @Input() type: string;

  constructor() { }

  ngOnInit() {
    console.log(this.projects);
  }
}
