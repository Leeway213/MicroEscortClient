import { Line } from "./Line";
import { Point } from "./Point";
import { Polygon } from "./Polygon";
export class PolygonCanvas {
  private _points: Point[];
  get points() {
    return this._points;
  }

  private _lines: Line[];
  get lines() {
    return this._lines;
  }

  private _polygons: Polygon[];
  get polygons() {
    return this._polygons;
  }

  private _paths: Path[];

  constructor() {
    this._points = [];
    this._lines = [];
    this._polygons = [];
    this._paths = [];
  }

  draw(p: Point) {
    // 如果_paths为空，说明正在画第一个点;
    // 如果_paths的最后一个元素中，endIndex不是undefined，说明前一个path已结束;
    // 只画一个点，并建立新的path后即返回。
    if (
      this._paths.length === 0 ||
      this._paths[this._paths.length - 1].endIndex
    ) {
      const pointCount: number = this.drawPoint(p);
      this._paths.push({ startIndex: pointCount - 1 } as Path);
      return;
    } else {
      const newLine: Line = new Line();
      newLine.start = this._points[this._points.length - 1];
      newLine.end = p;

      // 获取最近的交点
      const intersection = this.getNearestIntersection(newLine);

      if (intersection) {
        const pointCount = this.drawPoint(intersection);
        this.drawLine(newLine.start, intersection);
        this._paths[this._paths.length - 1].endIndex = pointCount - 1;
      } else {
        this.drawPoint(p);
        this.drawLine(newLine.start, newLine.end);
      }
    }
  }

  private drawPoint(p: Point): number {
    if (this._points.length >= 3) {
    }
    this._points.push(p);
    return this._points.length;
  }

  private drawLine(startPoint: Point, endPoint: Point): number {
    const line = new Line();
    line.start = startPoint;
    line.end = endPoint;
    this._lines.push(line);
    return this._lines.length;
  }

  private getNearestIntersection(line: Line): Point {
    const points = this.getIntersections(line);

    let result: Point;

    if (points) {
      points.forEach((value, index, arr) => {
        if (result) {
          result =
            Math.sqrt(value.X - line.start.X) +
              Math.sqrt(value.Y - line.start.Y) <
            Math.sqrt(result.X - line.start.X) +
              Math.sqrt(result.Y - line.start.Y)
              ? value
              : result;
        } else {
          result = value;
        }
      });
    }

    return result;
  }

  private getIntersections(line: Line): Point[] {
    const points: Point[] = [];

    this._lines.forEach((value, index, arr) => {
      if (index !== this._lines.length - 1) {
        const intersection: Point = CanvasUtils.getIntersection(line, value);
        if (intersection) {
          console.log(`cross lines is ${index}`);
          points.push(intersection);
        }
      }
    });

    if (points.length > 0) {
      return points;
    } else {
      return undefined;
    }
  }
}

export class Path {
  startIndex: number;
  endIndex: number;
}

export class CanvasUtils {
  /**
   * 直线相交排斥实验
   * @param line1
   * @param line2
   */
  static isRectCross(line1: Line, line2: Line): boolean {
    return (
      Math.min(line1.start.X, line1.end.X) <=
        Math.max(line1.start.X, line2.end.X) &&
      Math.min(line1.start.X, line2.end.X) <=
        Math.max(line1.start.X, line1.end.X) &&
      Math.min(line1.start.Y, line1.end.Y) <=
        Math.max(line1.start.Y, line2.end.Y) &&
      Math.min(line1.start.Y, line2.end.Y) <=
        Math.max(line1.start.Y, line1.end.Y)
    );
  }

  static isLineSegmentCross(line1: Line, line2: Line): boolean {
    if (
      this.multi(line1.start, line1.end, line2.start) *
        this.multi(line1.start, line1.end, line2.end) <=
        0 &&
      this.multi(line2.start, line2.end, line1.start) *
        this.multi(line2.start, line2.end, line1.end) <=
        0
    ) {
      return true;
    } else {
      return false;
    }
  }

  static getIntersection(line1: Line, line2: Line): Point {
    let x: number;
    let y: number;

    if (this.isRectCross(line1, line2)) {
      if (this.isLineSegmentCross(line1, line2)) {
        const tmpxLeft =
          (line2.end.X - line2.start.X) * (line1.start.Y - line1.end.Y) -
          (line1.end.X - line1.start.X) * (line2.start.Y - line2.end.Y);
        const tmpxRight =
          (line1.start.Y - line2.start.Y) *
            (line1.end.X - line1.start.X) *
            (line2.end.X - line2.start.X) +
          line2.start.X *
            (line2.end.Y - line2.start.Y) *
            (line1.end.X - line1.start.X) -
          line1.start.X *
            (line1.end.Y - line1.start.Y) *
            (line2.end.X - line2.start.X);

        x = tmpxRight / tmpxLeft;

        const tmpLeft =
          (line1.start.X - line1.end.X) * (line2.end.Y - line2.start.Y) -
          (line1.end.Y - line1.start.Y) * (line2.start.X - line2.end.X);
        const tmpRight =
          line1.end.Y *
            (line1.start.X - line1.end.X) *
            (line2.end.Y - line2.start.Y) +
          (line2.end.X - line1.end.X) *
            (line2.end.Y - line2.start.Y) *
            (line1.start.Y - line1.end.Y) -
          line2.end.Y *
            (line2.start.X - line2.end.X) *
            (line1.end.Y - line1.start.Y);

        y = tmpRight / tmpLeft;

        console.log(`cross point is (${x},${y})`);
        return new Point(x, y);
      }
    }
    return undefined;
  }

  private static multi(p1: Point, p2: Point, p3: Point): number {
    return (p1.X - p3.X) * (p2.Y - p3.Y) - (p2.X - p3.X) * (p1.Y - p3.Y);
  }
}
