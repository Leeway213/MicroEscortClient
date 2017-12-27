import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-longmao-train',
  templateUrl: './longmao-train.component.html',
  styleUrls: ['./longmao-train.component.css']
})
export class LongmaoTrainComponent implements OnInit {
  
  @ViewChild("markdownEle") markdownEle: ElementRef;

  constructor() { }

  ngOnInit() {
  }

}
