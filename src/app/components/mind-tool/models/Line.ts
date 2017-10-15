import { Point } from "./Point";
export class Line {
  start: Point;
  end: Point;

  isOnLine(p: Point): boolean {
    return (
      Math.round(
        (p.Y - this.start.Y) / (p.X - this.start.X) -
          (this.end.Y - this.start.Y) / (this.end.X - this.start.X)
      ) === 0 &&
      Math.sqrt(p.X - this.start.X) + Math.sqrt(p.Y - this.start.Y) <=
        Math.sqrt(this.end.X - this.start.X) +
          Math.sqrt(this.end.Y - this.start.Y)
    );
  }
}
