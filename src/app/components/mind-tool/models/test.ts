import { Graph, Vertex } from './Graph';

const graph = new Graph();

let v1 = new Vertex(1, 1);
let v2 = new Vertex(2, 2);
let v3 = new Vertex(3, 3);
let v4 = new Vertex(4, 4);
let v5 = new Vertex(5, 5);
let v6 = new Vertex(6, 6);
let v7 = new Vertex(7, 7);

v1.addNeighbor(v2);
v1.addNeighbor(v5);

v2.addNeighbor(v4);
v2.addNeighbor(v5);
v2.addNeighbor(v7);

v3.addNeighbor(v5);

v4.addNeighbor(v5);
v4.addNeighbor(v6);

v6.addNeighbor(v7);

graph.addVertex(v1);
graph.addVertex(v2);
graph.addVertex(v3);
graph.addVertex(v4);
graph.addVertex(v5);
graph.addVertex(v7);

for (const item of graph.vertexs) {
    console.log(`[${item.X} -->${item.neighbors}`);
}
