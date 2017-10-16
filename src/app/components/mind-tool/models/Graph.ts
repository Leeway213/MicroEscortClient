import { Point } from './Point';
import { Line } from './Line';
export class Graph {
    vertexCount: number;
    edgeCount: number;
    vertexs: Vertex[];

    constructor() {
        this.vertexCount = this.edgeCount = 0;
        this.vertexs = [];
    }

    addVertex(v: Vertex) {
        v.neighbors = v.neighbors || [];
        this.vertexCount++;
        if (v.neighbors.length > 0) {
            this.edgeCount += v.neighbors.length;
            v.neighbors.forEach((value, index, arr) => {
                const neighbor = this.findVertex(value);
                neighbor.neighbors.push(v);
            });
        }
        this.vertexs.push(v);
    }

    insertVertexBetweenLine(v: Vertex, left: Vertex, right: Vertex) {
        const a = this.findVertex(left);
        const b = this.findVertex(right);
        v.addNeighbor(a);
        v.addNeighbor(b);
        this.addVertex(v);
        a.removeNeighbor(b);
        b.removeNeighbor(a);
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

}

export class Vertex extends Point {
    neighbors: Vertex[];

    visited: boolean;

    constructor(x: number, y: number) {
        super(x, y);
        this.neighbors = [];
    }

    adjacentTo(v: Vertex): boolean {
        return this.neighbors.some(value => value.equal(v));
    }

    addNeighbor(v: Vertex): number {
        this.neighbors = this.neighbors || [];

        if (this.findNeighborIndex(v) !== -1) {
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
            return item.equal(v);
        });
    }
}
