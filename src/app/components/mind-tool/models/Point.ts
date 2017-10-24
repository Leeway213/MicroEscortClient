export class Point {
    constructor (
        public X: number,
        public Y: number
    ) {}

    toString() {
        return `${this.X},${this.Y}`;
    }

    equal(p: Point): boolean {
        return p && Math.abs(this.X - p.X) <= 0.001 && Math.abs(this.Y - p.Y) <= 0.001;
    }
}

