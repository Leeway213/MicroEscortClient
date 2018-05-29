import { Component, OnInit, Input } from '@angular/core';
import { LabelToolComponent } from '../../LabelToolComponent';
import { PolygonCanvas } from '../models/PolygonCanvas';
import { Point } from '../models/Point';
import { ObjectHelper } from '../../../../utils/StaticMethod';
import { Line } from '../models/Line';

@Component({
  selector: 'app-polygon',
  templateUrl: './polygon.component.html',
  styleUrls: ['./polygon.component.css']
})
export class PolygonComponent implements OnInit, LabelToolComponent {
  @Input() data: any;
  @Input() width: number;
  @Input() height: number;
  @Input() mode: "draw" | "select" | "delete";
  @Input() zoom: number;
  @Input() blockKeyInMouseEvent: "ctrlKey" | "shiftKey" | "altKey";

  pointSize: number = 1;
  lineSize: number = 1;

  get canUndo(): boolean {
    return this.polygonCanvas.log && this.polygonCanvas.log.length > 1;
  }

  undo() {
    this.polygonCanvas.undo();
  }

  getResult() {
    return this.polygonCanvas.polygons.map(value => {
      return { polygon: value.polygon, label: value.label };
    });
  }
  refresh() {
    this.initDraw();
  }
  label(args: any) {
    let changed: boolean = false;
    this.polygonCanvas.polygons.map(value => {
      if (value.selected) {
        if (value.label != args.label) {
          value.label = args.label;
          changed = true;
        }
        if (value.color != args.color) {
          value.color = args.color;
          changed = true;
        }
      }
    });
    if (changed) {
      this.polygonCanvas.clearSelection();
      this.polygonCanvas.logOperation();
    }
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
      this.polygonCanvas.logOperation();
    } catch (err) {
      console.log(err);
    }
  }

  onSvgClick(e: MouseEvent) {
    if (e[this.blockKeyInMouseEvent] || this.mode !== "draw") {
      return;
    }
    if (
      e.srcElement &&
      e.srcElement.classList.contains('path-point') &&
      this.mode === 'draw'
    ) {
      // tslint:disable-next-line:radix
      const x = parseInt(e.srcElement.getAttribute('cx')) / this.zoom;
      // tslint:disable-next-line:radix
      const y = parseInt(e.srcElement.getAttribute('cy')) / this.zoom;
      console.log(`draw on point ${x},${y}`);
      this.polygonCanvas.drawOnPoint(new Point(x, y));
      this.logOperation();
      e.stopPropagation();
    } else if(e.srcElement && e.srcElement.classList.contains('path-line') && this.mode === 'draw') {
      const x1 = parseInt(e.srcElement.getAttribute('x1')) / this.zoom;
      const y1 = parseInt(e.srcElement.getAttribute('y1')) / this.zoom;
      const x2 = parseInt(e.srcElement.getAttribute('x2')) / this.zoom;
      const y2 = parseInt(e.srcElement.getAttribute('y2')) / this.zoom;
      const line = new Line();
      line.start = new Point(x1, y1);
      line.end = new Point(x2, y2);

      const p = new Point(e.offsetX / this.zoom, e.offsetY / this.zoom);
      this.polygonCanvas.drawOnLine(p, line);
      this.logOperation();
      e.stopPropagation();
    }
    else {
      // const p = new Point(Math.round(e.offsetX), Math.round(e.offsetY));
      const p = new Point(e.offsetX / this.zoom, e.offsetY / this.zoom);
      console.log(`${p.X}, ${p.Y}`);
      this.polygonCanvas.draw(p);
      this.logOperation();
    }
  }

  selectPolygon(i: number, e: MouseEvent) {
    if (!e[this.blockKeyInMouseEvent] && this.mode === "select") {
      // this.polygonCanvas.clearSelection();
      this.polygonCanvas.polygons[i].selected = !this.polygonCanvas.polygons[i].selected;
    }
  }

  constructor() { }

  ngOnInit() {
  }

  logOperation() {
    // this.operationStack.push(ObjectHelper.objClone(this.polygonCanvas, {}));
    this.polygonCanvas.logOperation();
  }

  zoomPointWhenMouseEnter() {
    this.pointSize = 1.3;
  }

  resumePointWhenMouseLeave() {
    this.pointSize = 1;
  }

  zoomLineWhenMouseEnter() {
    this.lineSize = 2.8;
  }

  resumeLineWhenMouseLeave() {
    this.lineSize = 1;
  }

}
