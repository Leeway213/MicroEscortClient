import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-quiz-result',
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.css']
})
export class QuizResultComponent implements OnInit {

  @Input() correct: boolean;

  @Output() onNext = new EventEmitter();

  hintText: string;

  constructor() { }

  ngOnInit() {
    this.correct ?
      this.hintText = '回答正确' :
      this.hintText = '回答错误';
  }

  next() {
    this.onNext.emit();
  }

}
