import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TaskSetModel } from '../../../services/taskset.service';

@Component({
  selector: 'app-recommend-task',
  templateUrl: './recommend-task.component.html',
  styleUrls: ['./recommend-task.component.css']
})
export class RecommendTaskComponent implements OnInit {

  @Input() taskset: TaskSetModel;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateTo(projectId: string) {
    console.log(projectId);
    this.router.navigate(["/tasks", projectId]);
  }

}
