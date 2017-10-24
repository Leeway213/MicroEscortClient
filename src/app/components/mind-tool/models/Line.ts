import { Point } from "./Point";
export class Line {
  start: Point;
  end: Point;

  constructor(start?: Point, end?: Point) {
    this.start = start;
    this.end = end;
  }

  isOnLine(p: Point): boolean {
    return (
      (p.Y - this.start.Y) / (p.X - this.start.X) -
        (this.end.Y - this.start.Y) / (this.end.X - this.start.X) ===
        0 &&
      Math.pow(p.X - this.start.X, 2) + Math.pow(p.Y - this.start.Y, 2) <=
        Math.pow(this.end.X - this.start.X, 2) +
          Math.pow(this.end.Y - this.start.Y, 2)
    );
  }
}
