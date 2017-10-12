import { Point } from './Point';
export class BoundingBox {

    constructor() {
        this.center = new Point(-1, -1);
    }

  start: Point;

  center: Point;

  private _width: number;
  get width() {
    return this._width;
  }
  set width(value: number) {
    if (this._width !== value) {
      this._width = value;
      this.svgWidth = Math.abs(this._width);
      if (this._width < 0) {
        this.svgStart.X = this.start.X - this.svgWidth;
      } else {
        this.svgStart.X = this.start.X;
      }
    }
  }

  private _height: number;
  get height() { return this._height; }
  set height(value: number) {
    if ( this._height !== value) {
      this._height = value;
      this.svgHeight = Math.abs(this._height);

      if (this._height < 0) {
        this.svgStart.Y = this.start.Y - this.svgHeight;
      } else {
        this.svgStart.Y = this.start.Y;
      }
    }
  }

  svgStart: Point;

  svgWidth: number;
  svgHeight: number;

  fillColor: string;

  strokeColor: string;
  strokeWidth: number;

  caculateCenter() {
      this.center.X = this.start.X + (this.width / 2);
      this.center.Y = this.start.Y + (this.height / 2);
  }
}
