import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-verify-panel',
  templateUrl: './verify-panel.component.html',
  styleUrls: ['./verify-panel.component.css']
})
export class VerifyPanelComponent implements OnInit {

  @Input() message: string;

  @Output() resultChange = new EventEmitter();

  options = [
    { value: true, viewValue: "正确" },
    { value: false, viewValue: "错误" }
  ];

  result: boolean;

  resultChanged() {
    this.resultChange.emit(this.result);
  }

  constructor() { }

  ngOnInit() {
  }

}
