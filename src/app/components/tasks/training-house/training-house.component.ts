import { Component, OnInit, Input } from '@angular/core';
import { ProjectModel } from '../../../services/project.service';
import { Router } from '@angular/router';
import { TaskSetModel } from '../../../services/taskset.service';

@Component({
  selector: 'app-training-house',
  templateUrl: './training-house.component.html',
  styleUrls: ['./training-house.component.css']
})
export class TrainingHouseComponent implements OnInit {

  @Input() project: ProjectModel;

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  navigateTo(tasksetId: string) {
    this.router.navigate(['/tasks', tasksetId]);
  }

}
