class Level {
    enemies;
    clouds;
    backgroundObjects;
    bottles;
    level_start = -600;
    level_end = 3000;

    constructor(backgroundObjects, clouds, enemies, bottles) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.bottles = bottles;
    }
}