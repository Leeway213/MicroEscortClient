import { Component, OnInit } from '@angular/core';
import { LabelToolComponent } from '../../LabelToolComponent';
import { PolygonCanvas } from '../models/PolygonCanvas';
import { Point } from '../models/Point';

@Component({
  selector: 'app-polygon',
  templateUrl: './polygon.component.html',
  styleUrls: ['./polygon.component.css']
})
export class PolygonComponent implements OnInit, LabelToolComponent {
  data: any;
  width: number;
  height: number;
  mode: "draw" | "select" | "delete";
  zoom: number;
  blockKeyInMouseEvent: "ctrlKey" | "shiftKey" | "altKey";
  canUndo: boolean;
  undo() {
    throw new Error("Method not implemented.");
  }
  getResult() {
    throw new Error("Method not implemented.");
  }
  refresh() {
    this.initDraw();
  }
  label(args: any) {
    throw new Error("Method not implemented.");
  }

  polygonCanvas: PolygonCanvas;

  initDraw() {
    try {
    this.polygonCanvas = new PolygonCanvas();

    this.polygonCanvas.draw(new Point(2, 2));
    this.polygonCanvas.draw(new Point(2, this.height - 2));
    this.polygonCanvas.draw(new Point(this.width - 2, this.height - 2));
    this.polygonCanvas.draw(new Point(this.width - 2, 2));
    this.polygonCanvas.draw(new Point(2, 2));
    } catch (err) {
      console.log(err);
    }
  }

  onSvgClick(e: MouseEvent) {
    console.log(this.blockKeyInMouseEvent);
    console.log(e[this.blockKeyInMouseEvent]);
    if (e[this.blockKeyInMouseEvent]) {
      return;
    }
    if (
      e.srcElement &&
      e.srcElement.classList.contains('path-point') &&
      this.mode === 'draw'
    ) {
      // tslint:disable-next-line:radix
      const x = parseInt(e.srcElement.getAttribute('cx'));
      // tslint:disable-next-line:radix
      const y = parseInt(e.srcElement.getAttribute('cy'));
      console.log(`draw on point ${x},${y}`);
      this.polygonCanvas.drawOnPoint(new Point(x, y));
    } else {
      // const p = new Point(Math.round(e.offsetX), Math.round(e.offsetY));
      const p = new Point(e.offsetX, e.offsetY);
      console.log(`${p.X}, ${p.Y}`);
      this.polygonCanvas.draw(p);
    }
  }

  constructor() { }

  ngOnInit() {
  }

}
