import { Line } from "./Line";
import { Point } from "./Point";
import { Polygon } from "./Polygon";
import { Graph, Vertex } from "./Graph";
export class PolygonCanvas {
  private _points: Point[];
  get points() {
    return this._points;
  }

  private _lines: Line[];
  get lines() {
    return this._lines;
  }

  private _graphs: Graph[];
  get graphs() {
    return this._graphs;
  }

  rings: Vertex[][];

  preVertex: Vertex;

  constructor() {
    this._points = [];
    this._lines = [];
    this._graphs = [];
    this.rings = [];
  }

  draw(p: Point) {
    for (const item of this._graphs) {
      const found = item.findVertex(p);
      if (found && !this.preVertex) {
        this.preVertex = found;
        return;
      }
    }

    // 如果_paths为空，说明正在画第一个点;
    // 如果_paths的最后一个元素中，endIndex不是undefined，说明前一个path已结束;
    // 只画一个点，并建立新的path后即返回。
    if (!this.preVertex) {
      const newGraph = new Graph();
      this.preVertex = new Vertex(p.X, p.Y);
      newGraph.addVertex(this.preVertex);
      this._graphs.push(newGraph);
      this.drawPoint(this.preVertex);

      return;
    } else {
      const graph = this._graphs[this._graphs.length - 1];
      const newLine: Line = new Line();
      // newLine.start = this._points[this._points.length - 1];
      newLine.start = this.preVertex;
      newLine.end = p;

      // 获取最近的交点
      const intersection = this.getNearestIntersection(newLine);

      if (intersection) {
        intersection.addNeighbor(this.preVertex);
        // 在图中插入交点
        const crossGraphIndex = this.onWhichGraphIndex(intersection.left);
        const crossGraph = this._graphs[crossGraphIndex];
        // const neighbor = crossGraph.findVertex(newLine.start);
        // if (neighbor) {
        //   intersection.addNeighbor(neighbor);
        // }

        // if (!this._points.some(v => v.equal(intersection))) {
        //   this.drawPoint(intersection);
        // } else {
        //   const lastGraph = this._graphs[this._graphs.length - 1];
        //   lastGraph.addVertex(intersection);
        // }

        if (intersection.equal(intersection.left)) {
          intersection.left.addNeighbor(this.preVertex);
          graph.addVertex(intersection);
        } else if (intersection.equal(intersection.right)) {
          intersection.right.addNeighbor(this.preVertex);
          graph.addVertex(intersection);
        }

        crossGraph.insertVertexBetweenLine(
          intersection,
          intersection.left,
          intersection.right
        );

        // 如果交点位于其他graph上
        if (crossGraphIndex !== this._graphs.length - 1) {
          crossGraph.merge(this._graphs.pop(), [intersection]);
        }
        
        if (crossGraph.findVertex(p)) {
          if (crossGraphIndex === this._graphs.length - 1) {
            const end = crossGraph.findVertex(newLine.end);
            crossGraph.addEdge(this.preVertex, end);
            this.drawLine(this.preVertex, end);
          } else {

          }
        }

        this.drawLine(this.preVertex, intersection);

        crossGraph.getRings();

        this.preVertex = undefined;
      } else {
        const tmpVertex = new Vertex(p.X, p.Y);
        // const neighbor = graph.findVertex(
        //   this._points[this._points.length - 1]
        // );
        tmpVertex.addNeighbor(newLine.start as Vertex);
        graph.addVertex(tmpVertex);

        this.drawPoint(p);
        this.drawLine(this.preVertex, graph.vertexs[graph.vertexCount - 1]);
        this.preVertex = tmpVertex;
      }
    }
  }

  private drawPoint(p: Point): number {
    this._points.push(p);
    return this._points.length;
  }

  private drawLine(startPoint: Vertex, endPoint: Vertex): number {
    const line = new Line();
    line.start = startPoint;
    line.end = endPoint;
    this._lines.push(line);
    return this._lines.length;
  }

  private getNearestIntersection(line: Line): Intersection {
    const intersections = this.getIntersections(line);

    let result: Intersection;

    if (intersections) {
      intersections.forEach((value, index, arr) => {
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

  private getIntersections(line: Line): Intersection[] {
    const intersections: Intersection[] = [];

    this._lines.forEach((value, index, arr) => {
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

  private onWhichGraph(args: any): Graph {
    if (args instanceof Line) {
      return this.onWhichGraph(args.start);
    } else if (args instanceof Point) {
      return this._graphs.find((value, index, arr) => {
        return value.vertexs.some((v, i, a) => {
          return v.equal(args);
        });
      });
    }
  }

  private onWhichLine(p: Point): Line {
    return this._lines.find((value, index, arr) => {
      return value.isOnLine(p);
    });
  }

  private onWhichGraphIndex(args: any): number {
    if (args instanceof Line) {
      return this.onWhichGraphIndex(args.start);
    } else if (args instanceof Point) {
      return this._graphs.findIndex((value, index, arr) => {
        return value.vertexs.some((v, i, a) => {
          return v.equal(args);
        });
      });
    }
  }

  private onWhichLineIndex(p: Point): number {
    return this._lines.findIndex((value, index, arr) => {
      return value.isOnLine(p);
    });
  }
}

export class Path {
  startIndex: number;
  endIndex: number;
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

export class Intersection extends Vertex {
  left: Vertex;
  right: Vertex;
}
