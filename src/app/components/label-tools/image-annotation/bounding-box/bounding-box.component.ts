import { TaskModel } from './../../../tasks/tasks.component';
import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { LabelToolComponent } from '../../LabelToolComponent';
import { BoundingBox } from '../models/BoundingBox';
import { ObjectHelper } from '../../../mind-tool/utils/StaticMethod';
import { Point } from '../models/Point';

@Component({
  selector: 'app-tool-bounding-box',
  templateUrl: './bounding-box.component.html',
  styleUrls: ['./bounding-box.component.css']
})
export class BoundingBoxComponent implements OnInit, LabelToolComponent {
  @Input() blockKeyInMouseEvent: "ctrlKey" | "shiftKey" | "altKey";
  @Input() zoom: number;
  @Input() mode: 'draw' | 'select' | 'delete';
  @Input() width: number;
  @Input() height: number;
  @Input() data: any;

  canUndo: boolean;

  @ViewChild('svgContainer') svgContainerRef: ElementRef;

  showResult: boolean;

  boundingBoxs: Array<BoundingBox>;

  operationStack: any[];


  // 调整boundingbox大小时需要用到的临时变量
  // 正在调整大小的boundingbox实例
  resizingBoundingBox: BoundingBox;
  // 调整的边 left right top bottom
  resizingBound: string;
  // 是否时resizing状态
  resizing: boolean;

  constructor () {}


  ngOnInit(): void {
    // (this.svgContainerRef.nativeElement as HTMLElement).addEventListener('mousedown', event => { this.onMouseDown(event) }, true);
    // (this.svgContainerRef.nativeElement as HTMLElement).addEventListener('mousemove', event => { this.onMouseMove(event) }, true);
    // (this.svgContainerRef.nativeElement as HTMLElement).addEventListener('mouseup', event => { this.onMouseUp(event) }, true);

    console.log(this.data);
    this.refresh();
  }

  refresh() {
    this.boundingBoxs = [];
    this.operationStack = [];
    this.canUndo = false;
    this.showResult = !this.data.quiz;
  }

  label(args: any) {
    this.boundingBoxs.map(value => {
      if (value.selected) {
        value.label = args.label;
        value.fillColor = args.color;
      }
    });
    this.logOperation();
  }

  clickBox(i: number) {
    if (this.mode === 'select') {
      this.boundingBoxs[i].selected = !this.boundingBoxs[i].selected;
    } else if (this.mode === 'delete') {
      this.boundingBoxs.splice(i, 1);
    }
    this.operationStack.push(ObjectHelper.objClone(
      this.boundingBoxs,
      []
    ) as BoundingBox[]);
  }

  startResize(e: any) {
    if (e[this.blockKeyInMouseEvent]) {
      return;
    }
    const tmp: string[] = e.srcElement.id.split('-');
    // tslint:disable-next-line:radix
    const index: number = parseInt(tmp[2]);
    this.resizingBoundingBox = this.boundingBoxs[index];
    this.resizingBound = tmp[0];
    this.resizing = true;

    e.stopPropagation();
  }

  resizeBound(e: MouseEvent) {
    switch (this.resizingBound) {
      case `left`:
        this.resizingBoundingBox.svgWidth +=
          this.resizingBoundingBox.svgStart.X - e.offsetX;
        this.resizingBoundingBox.svgStart.X = e.offsetX;
        break;
      case `right`:
        this.resizingBoundingBox.svgWidth =
          e.offsetX - this.resizingBoundingBox.svgStart.X;
        break;
      case `top`:
        this.resizingBoundingBox.svgHeight +=
          this.resizingBoundingBox.svgStart.Y - e.offsetY;
        this.resizingBoundingBox.svgStart.Y = e.offsetY;
        break;
      case `bottom`:
        this.resizingBoundingBox.svgHeight =
          e.offsetY - this.resizingBoundingBox.svgStart.Y;
        break;
    }
  }

  onMouseDown(e: MouseEvent) {
    if (e[this.blockKeyInMouseEvent]) {
      return;
    }
    if (e.buttons === 1 && this.mode === 'draw') {
        this.startBounding(e);
    }
  }

  onMouseMove(e: MouseEvent) {
    if (e[this.blockKeyInMouseEvent]) {
      return;
    }
    // if in resizing mode
    if (this.resizing) {
      this.resizeBound(e);
      return;
    }

    if (
      e.buttons === 1 &&
      this.boundingBoxs.length >= 1 &&
      this.mode === 'draw'
    ) {
      this.moveBounding(e);
    }
  }

  onMouseUp(e: MouseEvent) {
    if (e[this.blockKeyInMouseEvent]) {
      return;
    }
    if (this.resizing) {
      this.resizing = false;
      this.logOperation();
      return;
    }

    if (e.button === 0) {
      if (this.boundingBoxs.length >= 1 && this.mode === 'draw') {
        this.endBounding(e);
      }
    }
  }

  startBounding(e: MouseEvent) {
    // 将最后一个bounding的selected设置为false
    if (this.boundingBoxs.length > 0) {
      this.boundingBoxs[this.boundingBoxs.length - 1].selected = false;
    }

    const boundingbox: BoundingBox = new BoundingBox();
    boundingbox.start = new Point(e.offsetX, e.offsetY);
    boundingbox.svgStart = new Point(e.offsetX, e.offsetY);
    boundingbox.strokeColor = '#555555';
    boundingbox.selected = true;
    this.boundingBoxs.push(boundingbox);
  }

  moveBounding(e: MouseEvent) {
    const boundingbox: BoundingBox = this.boundingBoxs[
      this.boundingBoxs.length - 1
    ];
    boundingbox.width = e.offsetX - boundingbox.start.X;
    boundingbox.height = e.offsetY - boundingbox.start.Y;
  }

  endBounding(e: MouseEvent) {
    const boundingbox: BoundingBox = this.boundingBoxs[
      this.boundingBoxs.length - 1
    ];
    if (!boundingbox.width && !boundingbox.height) {
      this.boundingBoxs.pop();
      return;
    }
    this.logOperation();
  }

  undo() {
    console.log('undo');
    console.log(this.operationStack);

    if (this.operationStack.length <= 0) {
      return;
    }
    this.operationStack.pop();
    this.boundingBoxs = this.operationStack[this.operationStack.length - 1];
    if (!this.boundingBoxs) {
      this.boundingBoxs = [];
    }
    this.canUndo = this.operationStack.length > 0;
  }

  logOperation() {
    this.operationStack.push(ObjectHelper.objClone(
      this.boundingBoxs,
      []
    ) as BoundingBox[]);
    this.canUndo = this.operationStack.length > 0;
  }

  getResult(): any {
    this.showResult = true;
    return this.boundingBoxs.map(value => value.getResult());
  }
}
