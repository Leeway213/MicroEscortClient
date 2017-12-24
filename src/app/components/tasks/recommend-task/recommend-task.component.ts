import { Component, OnInit, Input } from '@angular/core';
import { ProjectModel } from '../../../services/project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recommend-task',
  templateUrl: './recommend-task.component.html',
  styleUrls: ['./recommend-task.component.css']
})
export class RecommendTaskComponent implements OnInit {

  @Input() project: ProjectModel;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateTo(projectId: string) {
    console.log(projectId);
    this.router.navigate(["/tasks", projectId]);
  }

}
