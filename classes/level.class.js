class Level {
    enemies;
    clouds;
    backgroundObjects;
    bottles;
    coins;
    level_start = -600;
    level_end = 3000;

    constructor(backgroundObjects, clouds, enemies, bottles, coins) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.bottles = bottles;
        this.coins = coins;
    }
}