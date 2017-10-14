import { PolygonCanvas } from "./models/PolygonCanvas";
import { ObjectHelper } from "./utils/StaticMethod";
import { ToolType } from "./models/ToolType";
import { concat } from "@angular-devkit/schematics/node_modules/rxjs/operator/concat";
import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild
} from "@angular/core";
import { BoundingBox } from "./models/BoundingBox";
import { Point } from "./models/Point";

@Component({
  selector: "app-mind-tool",
  templateUrl: "./mind-tool.component.html",
  styleUrls: ["./mind-tool.component.css"]
})
export class MindToolComponent implements OnInit {
  @ViewChild("image") imageRef: ElementRef;


  @Input() imgSrc: string;

  imageEle: HTMLImageElement;

  @Input() srcWidth: number;
  @Input() srcHeight: number;

  @Input() toolType: ToolType;

  operationStack: any[];

  width: number;
  height: number;
  zoomTimes: number;
  zoom = 1;

  boundingBoxs: Array<BoundingBox>;
  polygonCanvas: PolygonCanvas;

  resizing = false;
  resizingBoundingBox: BoundingBox;
  resizingBound: string;

  translating = false;
  transX = 0;
  transY = 0;

  constructor() {}

  ngOnInit() {
    this.imageEle = this.imageRef.nativeElement as HTMLImageElement;
    this.width = this.srcWidth;
    this.height = this.srcHeight;

    this.zoomTimes = 0;
    this.operationStack = [];

    switch (this.toolType) {
      case ToolType.BoundingBox:
        this.boundingBoxs = [];
        break;
      case ToolType.Path:
        this.polygonCanvas = new PolygonCanvas();
        break;
    }

    document.onkeydown = e => {
      if (e.ctrlKey && e.key === "z") {
        this.undo();
      }
    };
  }

  disableMenu() {
    return false;
  }

  onZoomInClick() {
    this.zoomIn();
  }

  onZoomOutClick() {
    this.zoomOut();
  }

  fitImage() {
    this.zoom = 1;
    this.zoomTimes = 0;
    this.transX = 0;
    this.transY = 0;
  }

  onMouseDown(e: MouseEvent) {
    if (e.buttons === 1 && !e.shiftKey) {
      switch (this.toolType) {
        case ToolType.BoundingBox:
          this.startBounding(e);
          break;
      }
    } else if (e.buttons === 1 && e.shiftKey) {
      this.translating = true;
    }

    e.preventDefault();
  }

  onMouseMove(e: MouseEvent) {
    if (this.resizing) {
      this.resizeBound(e);
      return;
    }

    if (this.translating && e.buttons === 1) {
      this.translate(e);
      return;
    }

    if (
      this.toolType === ToolType.BoundingBox &&
      e.buttons === 1 &&
      this.boundingBoxs.length >= 1
    ) {
      this.moveBounding(e);
    }

    e.preventDefault();
  }

  onMouseUp(e: MouseEvent) {
    if (this.resizing) {
      this.resizing = false;
      this.operationStack.push(ObjectHelper.objClone(
        this.boundingBoxs,
        []
      ) as BoundingBox[]);
      return;
    }

    if (this.translating) {
      this.translating = false;
      return;
    }
    if (e.button === 0) {
      switch (this.toolType) {
        case ToolType.BoundingBox:
          if (this.boundingBoxs.length >= 1) {
            this.endBounding(e);
            this.operationStack.push(ObjectHelper.objClone(
              this.boundingBoxs,
              []
            ) as BoundingBox[]);
          }
          break;

        case ToolType.Path:
          const p = new Point(Math.round(e.offsetX), Math.round(e.offsetY));
          console.log(`${p.X}, ${p.Y}`);
          this.polygonCanvas.draw(p);
          break;
      }
    }

    e.preventDefault();
  }

  onMouseWheel(e: WheelEvent) {
    if (e.shiftKey) {
      if (e.deltaY < 0) {
        this.zoomIn();
      } else if (e.deltaY > 0 && this.zoomTimes > 0) {
        this.zoomOut();
      }
      e.preventDefault();
    }
  }

  zoomIn() {
    this.zoom += 0.2 * (this.zoomTimes++ + 1);
  }

  zoomOut() {
    this.zoom -= 0.2 * (--this.zoomTimes + 1);
  }

  startBounding(e: MouseEvent) {
    console.log(`start ${e.offsetX}--${e.offsetY}`);
    const boundingbox: BoundingBox = new BoundingBox();
    boundingbox.start = new Point(e.offsetX, e.offsetY);
    boundingbox.svgStart = new Point(e.offsetX, e.offsetY);
    boundingbox.strokeColor = "#555555";
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
    }
  }

  startResize(e: MouseEvent) {
    const tmp: string[] = e.srcElement.id.split("-");
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

  translate(e: MouseEvent) {
    this.transX += e.movementX / this.zoom;
    this.transY += e.movementY / this.zoom;
  }

  undo() {
    if (this.operationStack.length <= 0) {
      return;
    }
    this.operationStack.pop();
    switch (this.toolType) {
      case ToolType.BoundingBox:
        this.undoBounding();
        break;
    }
  }

  undoBounding() {
    this.boundingBoxs = this.operationStack[this.operationStack.length - 1];
    if (!this.boundingBoxs) {
      this.boundingBoxs = [];
    }
  }
}
