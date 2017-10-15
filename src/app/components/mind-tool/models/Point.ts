export class Point {
    constructor (
        public X: number,
        public Y: number
    ) {}

    toString() {
        return `${this.X},${this.Y}`;
    }

    equal(p: Point): boolean {
        return this.X === p.X && this.Y === p.Y;
    }
}

