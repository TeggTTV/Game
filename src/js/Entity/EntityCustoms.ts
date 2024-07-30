class EntityCustoms {
    health: number | null;
    maxHealth: number | null;
    speed: number | null;

    constructor(health: number, maxHealth: number, speed: number) {
        this.health = health;
        this.maxHealth = maxHealth;
        this.speed = speed;
    }
}