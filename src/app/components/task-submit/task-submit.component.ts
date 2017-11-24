import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';

@Component({
  selector: 'app-task-submit',
  templateUrl: './task-submit.component.html',
  styleUrls: ['./task-submit.component.css']
})
export class TaskSubmitComponent implements OnInit {

  submitConfirm: boolean;

  @Input() quizResult: any;

  @Output() onSubmit = new EventEmitter();
  @Output() onNext = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  submit() {
    this.submitConfirm = false;
    this.onSubmit.emit();
  }

  next() {
    this.onNext.emit();
  }

}
