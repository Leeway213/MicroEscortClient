import { Component, OnInit, Input } from '@angular/core';
import { LabelToolComponent } from '../../LabelToolComponent';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.css']
})
export class LineComponent implements OnInit, LabelToolComponent {
  @Input() data: any;
  @Input() width: number;
  @Input() height: number;
  @Input() mode: "draw" | "select" | "delete";
  @Input() zoom: number;
  @Input() blockKeyInMouseEvent: "ctrlKey" | "shiftKey" | "altKey";

  canUndo: boolean;

  undo() {
    throw new Error("Method not implemented.");
  }

  getResult() {
    throw new Error("Method not implemented.");
  }

  refresh() {
    throw new Error("Method not implemented.");
  }

  label(args: any) {
    throw new Error("Method not implemented.");
  }

  constructor() { }

  ngOnInit() {
  }

}
