import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-introduction-viewer',
  templateUrl: './introduction-viewer.component.html',
  styleUrls: ['./introduction-viewer.component.css']
})
export class IntroductionViewerComponent implements OnInit {

  @Input() content: string;

  constructor() { }

  ngOnInit() {
  }

}
