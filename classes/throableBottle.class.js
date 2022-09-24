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

    constructor(x, y) {
        super();
        this.loadImagesToCache(this.IMAGES_BOTTLEANIMATION);
        this.loadImagesToCache(this.IMAGES_BOTTLESPLASH);
        this.createImage("img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png");
        this.applyGravity();
        this.throw(x, y);
    }

    throw(x,y) {
        this.x = x;
        this.y = y;
        this.speedY = 20;
        if ( this.isAboveGround()) {
            setInterval(() => {
                this.x += this.speedX;
            }, 1000/60);
        }
    }
}