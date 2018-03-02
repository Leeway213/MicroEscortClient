import { Component, OnInit, Input } from '@angular/core';
import { LabelToolComponent } from '../../LabelToolComponent';
import { Point } from '../models/Point';
import { ObjectHelper } from '../../../../utils/StaticMethod';

@Component({
  selector: 'app-point',
  templateUrl: './point.component.html',
  styleUrls: ['./point.component.css']
})
export class PointComponent implements OnInit, LabelToolComponent {

  @Input() data: any;
  @Input() width: number;
  @Input() height: number;
  @Input() mode: "draw" | "select" | "delete";
  @Input() zoom: number;
  @Input() blockKeyInMouseEvent: "ctrlKey" | "shiftKey" | "altKey";

  canUndo: boolean;

  points: { label: string, point: Point, selected: boolean }[] = [];

  dragging: boolean;
  draggingIndex: number;

  operationStack: any[] = [];

  logOperation() {
    this.operationStack.push(ObjectHelper.objClone(this.points) as { label: string, point: Point, selected: boolean });
    this.canUndo = this.operationStack.length > 0;
  }

  undo() {
    if (this.operationStack.length <= 0) {
      return;
    }
    this.operationStack.pop();
    this.points = this.operationStack[this.operationStack.length - 1];
    if (!this.points) {
      this.points = [];
    }
    this.canUndo = this.operationStack.length > 0;
  }

  getResult() {
    return this.points.map(value => {
      return { label: value.label, point: value.point }
    });
  }

  refresh() {
    this.points = [];
    this.operationStack = [];
  }

  label(args: any) {
    this.points.map(value => {
      if (value.selected) {
        value.label = args.label;
      }
    });
    this.logOperation();
  }

  constructor() { }

  ngOnInit() {
  }

  onClick(e: MouseEvent) {
    if (e[this.blockKeyInMouseEvent]) {
      return;
    }

    if (this.dragging) {
      this.logOperation();
      this.dragging = false;
      return;
    }

    console.log(e);
    if (this.mode === 'draw') {
      this.points.map(value => value.selected ? value.selected = false : undefined);
      this.points.push({ label: null, point: new Point(e.offsetX, e.offsetY), selected: true });
      this.logOperation();
    }
  }

  onPointMouseDown(e: MouseEvent, i: number) {
    if (e[this.blockKeyInMouseEvent]) {
      return;
    }

    if (e.buttons === 1) {
      this.dragging = true;
      this.draggingIndex = i;
      e.stopPropagation();
      e.preventDefault();
    }
  }

  onPointMouseMove(e: MouseEvent) {
    // if (e[this.blockKeyInMouseEvent]) {
    //   return;
    // }

    if (this.dragging) {
      // this.points[this.draggingIndex].point.X += e.movementX / this.zoom;
      // this.points[this.draggingIndex].point.Y += e.movementY / this.zoom;
      this.points[this.draggingIndex].point.X = e.offsetX;
      this.points[this.draggingIndex].point.Y = e.offsetY;
      e.stopPropagation();
      e.preventDefault();
    }
  }

  onPointMouseUp(e: MouseEvent, i: number) {
    // if (e[this.blockKeyInMouseEvent]) {
    //   return;
    // }

    if (this.mode === "select") {
      this.points.map(value => value.selected ? value.selected = false : undefined);
      this.points[i].selected = true;
      this.logOperation();
      return;
    }

    if (this.mode === "delete") {
      this.points.splice(i, 1);
      this.logOperation();
      return;
    }
  }

}
