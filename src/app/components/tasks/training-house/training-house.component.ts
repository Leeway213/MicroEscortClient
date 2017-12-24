import { Component, OnInit, Input } from '@angular/core';
import { ProjectModel } from '../../../services/project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-training-house',
  templateUrl: './training-house.component.html',
  styleUrls: ['./training-house.component.css']
})
export class TrainingHouseComponent implements OnInit {

  @Input() projects: ProjectModel[] = [];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateTo(projectId: string) {
    this.router.navigate(['/tasks', projectId]);
  }

}
