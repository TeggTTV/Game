class Vector {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    add(v: Vector) {
        return new Vector(this.x + v.x, this.y + v.y);
    }
    sub(v: Vector) {
        return new Vector(this.x - v.x, this.y - v.y);
    }
    mul(s: number) {
        return new Vector(this.x * s, this.y * s);
    }
    div(s: number) {
        return new Vector(this.x / s, this.y / s);
    }
    mag() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    angle() {
        return Math.atan2(this.y, this.x);
    }
    normalize() {
        return this.div(this.mag());
    }
    limit(max: number) {
        if (this.mag() > max) {
            return this.normalize().mul(max);
        } else {
            return this;
        }
    }
    distance(v: Vector) {
        return this.sub(v).mag();
    }
    copy() {
        return new Vector(this.x, this.y);
    }
    // static random(factor: number = 1) {
    //     return new Vector(Math.random() * factor, Math.random() * factor)
    // }
    static random2D(factor: number = 1) {
        let angle = Math.random() * Math.PI * 2;
        return new Vector(Math.cos(angle) * factor, Math.sin(angle) * factor);
    }
    static fromAngle(angle: number) {
        return new Vector(Math.cos(angle), Math.sin(angle));
    }
    static add(v1: Vector, v2: Vector) {
        return new Vector(v1.x + v2.x, v1.y + v2.y);
    }
    static sub(v1: Vector, v2: Vector) {
        return new Vector(v1.x - v2.x, v1.y - v2.y);
    }
    static mul(v: Vector, s: number) {
        return new Vector(v.x * s, v.y * s);
    }
    static div(v: Vector, s: number) {
        return new Vector(v.x / s, v.y / s);
    }
    static distance(v1: Vector, v2: Vector) {
        return v1.sub(v2).mag();
    }
    static dot(v1: Vector, v2: Vector) {
        return v1.x * v2.x + v1.y * v2.y;
    }
    static angleBetween(v1: Vector, v2: Vector) {
        return Math.acos(Vector.dot(v1, v2) / (v1.mag() * v2.mag()));
    }
    static lerp(v1: Vector, v2: Vector, amount: number) {
        return v1.mul(1 - amount).add(v2.mul(amount));
    }
}
