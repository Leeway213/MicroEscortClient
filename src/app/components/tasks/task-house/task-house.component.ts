import { Component, OnInit, Input } from '@angular/core';
import { ProjectModel } from '../../../services/project.service';
import { TaskSetModel } from '../../../services/taskset.service';

@Component({
  selector: 'app-task-house',
  templateUrl: './task-house.component.html',
  styleUrls: ['./task-house.component.css']
})
export class TaskHouseComponent implements OnInit {

  private _tasksets: TaskSetModel[] = [];
  
  get tasksets() {
    return this._tasksets;
  }

  @Input() set tasksets(value: TaskSetModel[]) {
    if (this._tasksets != value) {
      this._tasksets = value;
      this.getRecommends();
    }
  }

  recommends: TaskSetModel[][] = [];
  recommendTaskSets: TaskSetModel[] = [];

  getRecommends() {
    this.recommends = [];
    this.recommendTaskSets = this.tasksets;
    let tmp: TaskSetModel[] = [];
    this.recommendTaskSets.forEach((value, index, array) => {
      tmp.push(value);
      if(index % 2 === 0 && index !== 0) {
        this.recommends.push(tmp);
        tmp = [];
      }
    });
    if (tmp.length > 0) {
      this.recommends.push(tmp);
    }
  }

  constructor() { }

  ngOnInit() {
  }

  // _projects: ProjectModel[] = [];

  // get projects() {
  //   return this._projects;
  // }

  // @Input() set projects(value: ProjectModel[]) {
  //   if (this._projects != value) {
  //     this._projects = value;
  //     this.getRecommends();
  //   }
  // }

  // @Input() recommendProjects: ProjectModel[] = [];

  // recommends: ProjectModel[][] = [];

  // getRecommends() {
  //   this.recommends = [];
  //   this.recommendProjects = this.projects;
  //   let tmp: ProjectModel[] = []
  //   this.recommendProjects.forEach((value, index, array) => {
  //     tmp.push(value);
  //     if (index % 3 === 0) {
  //       this.recommends.push(tmp);
  //       tmp = [];
  //       console.log(this.recommends);
  //     }
  //   });
  //   if (tmp.length > 0) {
  //     this.recommends.push(tmp);
  //   }
  //   this.recommends.reverse();
  // }

}
