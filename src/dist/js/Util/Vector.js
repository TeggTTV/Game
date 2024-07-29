"use strict";
class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    add(v) {
        return new Vector(this.x + v.x, this.y + v.y);
    }
    sub(v) {
        return new Vector(this.x - v.x, this.y - v.y);
    }
    mul(s) {
        return new Vector(this.x * s, this.y * s);
    }
    div(s) {
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
    limit(max) {
        if (this.mag() > max) {
            return this.normalize().mul(max);
        }
        else {
            return this;
        }
    }
    distance(v) {
        return this.sub(v).mag();
    }
    copy() {
        return new Vector(this.x, this.y);
    }
    static random2D(factor = 1) {
        let angle = Math.random() * Math.PI * 2;
        return new Vector(Math.cos(angle) * factor, Math.sin(angle) * factor);
    }
    static fromAngle(angle) {
        return new Vector(Math.cos(angle), Math.sin(angle));
    }
    static add(v1, v2) {
        return new Vector(v1.x + v2.x, v1.y + v2.y);
    }
    static sub(v1, v2) {
        return new Vector(v1.x - v2.x, v1.y - v2.y);
    }
    static mul(v1, v2) {
        return new Vector(v1.x * v2.x, v1.y * v2.y);
    }
    static div(v1, v2) {
        return new Vector(v1.x / v2.x, v1.y / v2.y);
    }
    static distance(v1, v2) {
        return v1.sub(v2).mag();
    }
    static dot(v1, v2) {
        return v1.x * v2.x + v1.y * v2.y;
    }
    static angleBetween(v1, v2) {
        return Math.acos(Vector.dot(v1, v2) / (v1.mag() * v2.mag()));
    }
    static lerp(v1, v2, amount) {
        return v1.mul(1 - amount).add(v2.mul(amount));
    }
}
//# sourceMappingURL=Vector.js.map