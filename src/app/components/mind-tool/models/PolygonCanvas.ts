import { Graph, Vertex } from "./Graph";
import { Line } from "./Line";
import { Point } from "./Point";
export class PolygonCanvas extends Graph {
  lines: Line[];

  preVertex: Vertex;

  constructor() {
    super();
    this.lines = [];
  }

  draw(p: Point) {
    const found = this.findVertex(p);
    let onLine: Line;
    {
      for (const value of this.lines) {
        const tmp = this.getNeareastPointFromPointToLine(p, value);
        if (tmp) {
          const distance = this.getDistanceBetween(tmp, p);
          if (this.getDistanceBetween(tmp, p) <= 5) {
            p = tmp;
            onLine = value;
            break;
          }
        }
      }
    }

    if (!this.preVertex) {
      if (found) {
        this.preVertex = found;
      } else if (!onLine) {
        const newVertex = new Vertex(p.X, p.Y);
        this.addVertex(newVertex);
        this.preVertex = newVertex;
      } else {
        const newVertex = new Vertex(p.X, p.Y);
        this.insertVertexBetweenLine(
          newVertex,
          <Vertex>onLine.start,
          <Vertex>onLine.end
        );
        this.preVertex = newVertex;
      }
    } else {
      if (found) {
        this.addEdge(this.preVertex, found);
        this.drawLine(this.preVertex, found);
        this.preVertex = undefined;
        this.getRings();
      } else {
        // 求this.preVertex到p的延长线（X轴延长4）; 用以计算在线段this.preVertex--->p与某条线段即将相交时的交点
        const gradient = (p.Y - this.preVertex.Y) / (p.X - this.preVertex.X);
        const endPointX = p.X > this.preVertex.X ? p.X + 1 : p.X - 1;
        const endPointY = gradient * (endPointX - p.X) + p.Y;
        const extendPoint = new Point(endPointX, endPointY);

        const tmpLine = new Line();
        tmpLine.start = this.preVertex;
        tmpLine.end = extendPoint;
        const intersection = this.getNearestIntersection(tmpLine);

        if (intersection && !intersection.equal(this.preVertex)) {
          intersection.addNeighbor(this.preVertex);
          this.insertVertexBetweenLine(
            intersection,
            intersection.left,
            intersection.right
          );

          this.drawLine(this.preVertex, intersection);

          this.preVertex = undefined;

          this.getRings();
        } else {
          const newVertex = new Vertex(p.X, p.Y);
          newVertex.addNeighbor(this.preVertex);
          this.addVertex(newVertex);
          this.drawLine(this.preVertex, newVertex);
          this.preVertex = newVertex;
        }
      }
    }
  }

  drawOnPoint(p: Point) {
    const found = this.findVertex(p);
    if (!p.equal(this.preVertex)) {
      if (this.preVertex) {
        this.addEdge(this.preVertex, found);
        this.drawLine(this.preVertex, found);

        this.preVertex = undefined;

        this.getRings();
      } else {
        this.preVertex = this.findVertex(p);
      }
    }
  }

  drawLine(start: Vertex, end: Vertex) {
    const line = new Line();
    line.start = start;
    line.end = end;
    this.lines.push(line);
  }

  private getNeareastPointFromPointToLine(
    p: Point,
    l: Line
  ): Point | undefined {
    const gradient = (l.start.Y - l.end.Y) / (l.start.X - l.end.X);
    const reverseGradient = 1 / gradient;
    const nearX = Math.round(
      (p.Y - l.start.Y + gradient * l.start.X - reverseGradient * p.X) /
        (gradient - reverseGradient)
    );
    const nearY = Math.round(p.Y - reverseGradient * (p.X - nearX));
    const nearPoint = new Point(nearX, nearY);

    if (this.isBetween(nearPoint, l.start, l.end)) {
      return nearPoint;
    } else {
      return undefined;
    }
  }

  private isBetween(p: Point, left: Point, right: Point): boolean {
    return (
      Math.pow(p.X - left.X, 2) + Math.pow(p.Y - left.Y, 2) <=
      Math.pow(right.X - left.X, 2) + Math.pow(right.Y - left.Y, 2)
    );
  }

  private getDistanceBetween(p1: Point, p2: Point): number {
    return Math.sqrt(Math.pow(p1.X - p2.X, 2) + Math.pow(p1.Y - p2.Y, 2));
  }

  private getNearestIntersection(line: Line): Intersection {
    const intersections = this.getIntersections(line);

    let result: Intersection;

    if (intersections) {
      intersections.forEach((value, index, arr) => {
        if (result) {
          result =
            Math.pow(value.X - line.start.X, 2) +
              Math.pow(value.Y - line.start.Y, 2) <
            Math.pow(result.X - line.start.X, 2) +
              Math.pow(result.Y - line.start.Y, 2)
              ? value
              : result;
        } else {
          result = value;
        }
      });
    }

    return result;
  }

  private getIntersections(line: Line): Intersection[] {
    const intersections: Intersection[] = [];

    this.lines.forEach((value, index, arr) => {
      if (!line.start.equal(value.end)) {
        const intersection = CanvasUtils.getIntersection(line, value);
        if (intersection) {
          console.log(`cross lines is ${index}`);
          intersection.left = value.start as Vertex;
          intersection.right = value.end as Vertex;
          intersections.push(intersection);
        }
      }
    });

    if (intersections.length > 0) {
      return intersections;
    } else {
      return undefined;
    }
  }

  //   private onWhichGraph(args: any): Graph {
  //     if (args instanceof Line) {
  //       return this.onWhichGraph(args.start);
  //     } else if (args instanceof Point) {
  //       return this._graphs.find((value, index, arr) => {
  //         return value.vertexs.some((v, i, a) => {
  //           return v.equal(args);
  //         });
  //       });
  //     }
  //   }

  private onWhichLine(p: Point): Line {
    return this.lines.find((value, index, arr) => {
      return value.isOnLine(p);
    });
  }

  //   private onWhichGraphIndex(args: any): number {
  //     if (args instanceof Line) {
  //       return this.onWhichGraphIndex(args.start);
  //     } else if (args instanceof Point) {
  //       return this._graphs.findIndex((value, index, arr) => {
  //         return value.vertexs.some((v, i, a) => {
  //           return v.equal(args);
  //         });
  //       });
  //     }
  //   }

  //   private onWhichLineIndex(p: Point): number {
  //     return this.lines.findIndex((value, index, arr) => {
  //       return value.isOnLine(p);
  //     });
  //   }
}

export class Intersection extends Vertex {
  left: Vertex;
  right: Vertex;
}

export class CanvasUtils {
  /**
     * 直线相交矩形排斥判断
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

  /**
     * 直线相交跨立判断
     * @param line1
     * @param line2
     */
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

  /**
     * 获取两线段交点
     * @param line1
     * @param line2
     */
  static getIntersection(line1: Line, line2: Line): Intersection {
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

        x = Math.round(tmpxRight / tmpxLeft);

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

        y = Math.round(tmpRight / tmpLeft);

        console.log(`cross point is (${x},${y})`);
        return new Intersection(x, y);
      }
    }
    return undefined;
  }

  private static multi(p1: Point, p2: Point, p3: Point): number {
    return (p1.X - p3.X) * (p2.Y - p3.Y) - (p2.X - p3.X) * (p1.Y - p3.Y);
  }
}
