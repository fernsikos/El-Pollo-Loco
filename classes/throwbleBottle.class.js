class Throwablebottle extends Moveableobject {
    IMAGES_BOTTLEANIMATION = [
        "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
    ];

    IMAGES_BOTTLESPLASH = [
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
    ]

    height = 50;
    width = 50;
    x = 150;
    y = 330;
    speedX = 3;
    world;
    bottleHit = false;
    shatter_sound = new Audio('audio/glas-shatter.mp3');
    offset = {
        top: 10,
        bottom: 10,
        right: 20,
        left: 20,
    }


    constructor(x, y, world) {
        super();
        this.loadImagesToCache(this.IMAGES_BOTTLEANIMATION);
        this.loadImagesToCache(this.IMAGES_BOTTLESPLASH);
        this.createImage("img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png");
        this.applyGravity();
        this.world = world;
        this.throw(x, y);
        this.animate();
        this.shatter_sound.volume = 0.4;
    }

    /**
     * Shows bottle throw animation if bottle above ground and not hit an enemy yet.
     * if bottle did hit an enemy or ground, it shows splash animation, plays sound.
     * After animation is played, it stopes intervall and removes the bottle.
     */
    animate() {
        let timeoutSet = false;
        let interval = setInterval(() => {
            if (this.bottleIsInFlight()) {
                this.playAnimation(this.IMAGES_BOTTLEANIMATION);
            } else {
                if (!timeoutSet) {
                    timeoutSet = true;
                    this.stopBottleIntervall(interval);
                }
                this.playAnimation(this.IMAGES_BOTTLESPLASH);
                this.shatter_sound.play();
            }
        }, 100);
    }

    /**
     * Checks in which direction the bottle needs to be throwed and thows the bottle.
     * @param {Variable} x 
     * @param {Variable} y 
     */
    throw(x, y) {
        if (!world.character.facingLeft) {
            this.throwBottleLeft(x, y);
        } else {
            this.throwBottleRight(x, y);
        }

    }

    //Template/Returns

    /**
     * 
     * @returns true if the bottle is in flight.
     */
    bottleIsInFlight() {
        return this.isAboveGround() && !this.bottleHit
    }

    /**
     *  Throws bottle to the left in relation to the character.
     * @param {Variable} x 
     * @param {Variable} y 
     */
    throwBottleLeft(x, y) {
        this.x = x;
        this.y = y;
        this.speedY = 20;
        setInterval(() => {
            if (this.y < 350 && !this.bottleHit) {
                this.x += this.speedX;
            }
        }, 1000 / 60);
    }

    /**
     * Throws bottle to the right in relation to the character.
     * @param {Variable} x 
     * @param {Variable} y 
     */
    throwBottleRight(x, y) {
        this.x = x - 40;
        this.y = y;
        this.speedY = 20;
        setInterval(() => {
            if (this.y < 350 && !this.bottleHit) {
                this.x -= this.speedX;
            }
        }, 1000 / 60);
    }

    /**
     * 
     * @param {Variable} interval interval id
     * @returns timeout to stop intervall and delete the throwed bottle.
     */
    stopBottleIntervall(interval) {
        return setTimeout(() => {
            clearInterval(interval);
            let index = world.throwableBottles.indexOf(this);
            world.throwableBottles.splice(index, 1);
        }, 400);
    }
}