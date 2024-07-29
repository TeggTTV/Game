class DamageText {
    position: Vector;
    vel: Vector;
    text: string;
    opacity: number;
    fontSize: number;
    constructor(position: Vector, damage: number) {
        this.position = position;
        this.vel = new Vector(0, 0);
        this.text = damage.toString();
        this.opacity = 1;
        this.fontSize = 30;
    }
    update(deltaTime: number) {
        this.vel.x += Math.random() * 10 - 5;
        this.vel.y -= 10;
        this.position = this.position.add(this.vel.mul(deltaTime));

        this.fontSize -= 0.5;
        this.opacity -= 0.015;
        if (this.opacity <= 0) {
            this.delete();
        }
    }
    delete() {
        let index = damageTexts.indexOf(this);
        damageTexts.splice(index, 1);
    }
    draw() {
        ctx.fillStyle = `rgba(0, 0, 0, ${this.opacity})`;
        ctx.font = this.fontSize + "px Arial";
        ctx.fillText(this.text, this.position.x, this.position.y);
    }
}
