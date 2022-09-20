class Level {
    enemies;
    clouds;
    backgroundObjects;
    bottles;
    coins;
    endboss;
    level_start = -600;
    level_end = 3300;

    constructor(backgroundObjects, clouds, enemies, bottles, coins, endboss) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.bottles = bottles;
        this.coins = coins;
        this.endboss = endboss;
    }
}