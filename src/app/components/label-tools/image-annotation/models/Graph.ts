import { Point } from "./Point";
import { Line } from "./Line";
export class Graph {
  vertexCount: number;
  edgeCount: number;
  vertexs: Vertex[];
  rings: Vertex[][] = [];

  constructor() {
    this.vertexCount = this.edgeCount = 0;
    this.vertexs = [];
  }

  addVertex(v: Vertex) {
    const found = this.findVertex(v);
    if (found) {
      // v.neighbors.forEach(value => {
      //   if (!found.findNeighbor(value)) {
      //     found.addNeighbor(value);
      //     this.getRings();
      //   }
      // });
      return;
    }
    v.neighbors = v.neighbors || [];
    this.vertexCount++;
    if (v.neighbors.length > 0) {
      this.edgeCount += v.neighbors.length;
      v.neighbors.forEach((value, index, arr) => {
        const neighbor = this.findVertex(value);
        if (neighbor) {
          neighbor.neighbors.push(v);
        }
      });
    }
    this.vertexs.push(v);
  }

  insertVertexBetweenLine(v: Vertex, left: Vertex, right: Vertex) {
    if (v.equal(left) || v.equal(right)) {
      return;
    }
    v.addNeighbor(left);
    v.addNeighbor(right);
    this.addVertex(v);
    left.removeNeighbor(right);
    right.removeNeighbor(left);
  }

  removeVertex(v: Vertex) {
    this.vertexs.splice(this.findVertexIndex(v), 1);

    v.neighbors.forEach((value, index, arr) => {
      value.neighbors.splice(value.findNeighborIndex(v), 1);
    });
    this.vertexCount--;
    this.edgeCount -= v.neighbors.length;
  }

  findVertex(p: Point): Vertex {
    return this.vertexs.find((v, i, arr) => {
      return v.equal(p);
    });
  }

  findVertexIndex(p: Point): number {
    return this.vertexs.findIndex((v, i, arr) => {
      return v.equal(p);
    });
  }

  addEdge(start: Point, end: Point) {
    const startVertex = this.findVertex(start);
    const endVertex = this.findVertex(end);
    startVertex.addNeighbor(endVertex);
    endVertex.addNeighbor(startVertex);
  }

  removeEdge(start: Point, end: Point) {
    const startV = this.findVertex(start);
    const endV = this.findVertex(end);

    if (startV && endV) {
      startV.removeNeighbor(endV);
      endV.removeNeighbor(startV);
      this.edgeCount--;
    }
  }

  merge(g: Graph, commonVertexs: Vertex[]) {
    g.vertexs.forEach(v => {
      if (!commonVertexs.some(item => item.equal(v))) {
        this.vertexs.push(v);
        this.vertexCount++;
      } else {
        v.neighbors.forEach(value => {
          this.edgeCount += this.findVertex(v).addNeighbor(value);
        });
      }
    });
  }

  getRings(): Vertex[][] {
    const result: Vertex[][] = [];

    this.vertexs.forEach(value => {
      if (!value.traversed) {
        this.getRingsRFS(value, result).next();
      }
    });

    this.vertexs.forEach(value => {
      value.visited = false;
      value.traversed = false;
    });

    // this.getRingsRFS(this.vertexs[0], result).next();

    for(let item of result) {
      if (!this.rings.find(value => this.isSameRing(value, item))) {
        this.rings.push(item);
      }
    }

    // this.rings = result.sort((x, y) => {
    //   return this.getRingArea(y) - this.getRingArea(x);
    // });
    this.rings.sort((x, y) => {
      return this.getRingArea(y) - this.getRingArea(x);
    });

    return this.rings;
  }

  private isSameRing(ring1: Vertex[], ring2: Vertex[]): boolean {
    if (ring1.length !== ring2.length) {
      return false;
    }
    for (let i = 0; i < ring1.length; i++) {
      if (!ring2.includes(ring1[i])) {
        return false;
      }
    }
    return true;
  }

  private *getRingsRFS(
    v: Vertex,
    result?: Vertex[][],
    cache?: Vertex[]
  ): Iterator<Vertex[]> {
    cache = cache || [];
    result = result || [];
    v.visited = true;
    v.traversed = true;
    cache.push(v);

    for (const item of v.neighbors) {
      if (item.visited) {
        const index = cache.findIndex(p => p.equal(item));
        if (index !== cache.length - 2) {
          const newRing = cache.slice(index, cache.length);
          if (!result.some(value => this.isSameRing(value, newRing))) {
            result.push(newRing);
          }
        }
      } else {
        this.getRingsRFS(item, result, cache).next();
      }
    }

    const pop = cache.pop();
    if (pop) {
      pop.visited = false;
    }
    yield* result;
  }

  private getRingArea(ring: Vertex[]): number {
    let s = 0;
    const len = ring.length;
    let j = len - 1;

    for (let i = 0; i < len; i++) {
      s += (ring[i].X + ring[j].X) * (ring[j].Y - ring[i].Y);
      j = i;
    }
    return Math.abs(s / 2);
  }
}

export class Vertex extends Point {
  neighbors: Vertex[];

  visited: boolean;

  traversed: boolean;

  constructor(x: number, y: number) {
    super(x, y);
    this.neighbors = [];
  }

  adjacentTo(v: Vertex): boolean {
    return this.neighbors.some(value => value.equal(v));
  }

  addNeighbor(v: Vertex): number {
    this.neighbors = this.neighbors || [];

    if (this.findNeighborIndex(v) !== -1 || v.equal(this)) {
      return 0;
    }
    this.neighbors.push(v);
    return 1;
  }

  removeNeighbor(v: Vertex) {
    this.neighbors.splice(this.findNeighborIndex(v), 1);
  }

  findNeighbor(v: Vertex): Vertex {
    return this.neighbors.find((item, i, arr) => {
      return v.equal(item);
    });
  }

  findNeighborIndex(v: Vertex): number {
    return this.neighbors.findIndex((item, i, arr) => {
      return v.equal(item);
    });
  }
  

}
