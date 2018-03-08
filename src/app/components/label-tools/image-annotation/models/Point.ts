export class Point {
    constructor (
        public X: number,
        public Y: number
    ) {}

    toString() {
        return `${this.X},${this.Y}`;
    }

    equal(p: Point): boolean {
        // return p && Math.abs(this.X - p.X) < eps && Math.abs(this.Y - p.Y) < eps;
        return p && parseFloat(this.X.toFixed(10)) === parseFloat(p.X.toFixed(10)) && parseFloat(this.Y.toFixed(10)) === parseFloat(p.Y.toFixed(10));
    }
}

