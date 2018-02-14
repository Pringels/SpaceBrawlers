export class Vector {
    constructor(public x: number, public y: number) {}

    add(v: Vector) {
        this.x = this.x + v.x;
        this.y = this.y + v.y;
    }

    sub(v: Vector) {
        this.x = this.x - v.x;
        this.y = this.y - v.y;
    }

    mult(n: number) {
        this.x = this.x * n;
        this.y = this.y * n;
    }

    div(n: number) {
        this.x = this.x / n;
        this.y = this.y / n;
    }

    mag(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    normalize() {
        const m = this.mag();
        if (m != 0) {
            this.div(m);
        }
    }

    limit(max: number) {
        if (this.mag() > max) {
            this.normalize();
            this.mult(max);
        }
    }

    get() {
        return Object.assign({}, this);
    }

    static add(v1: Vector, v2: Vector): Vector {
        return new Vector(v1.x + v2.x, v1.y + v2.y);
    }

    static sub(v1: Vector, v2: Vector): Vector {
        return new Vector(v1.x - v2.x, v1.y - v2.y);
    }
}
