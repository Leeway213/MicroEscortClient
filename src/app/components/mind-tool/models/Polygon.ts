import { Point } from './Point';

export class Polygon {
    points: Point[];

    label: string;

    toString() {
        return this.points.map(value => value.toString()).join(' ');
    }
}
