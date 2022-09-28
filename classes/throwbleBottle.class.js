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

    animate() {
        let timeoutSet = false;

        let interval = setInterval(() => {
            if (this.isAboveGround() && !this.bottleHit) {
                this.playAnimation(this.IMAGES_BOTTLEANIMATION);
            } else {
                if (!timeoutSet) {
                    timeoutSet = true;
                    
                    

                    setTimeout(() => {
                        clearInterval(interval);
                        let index = world.throwableBottles.indexOf(this); 
                        world.throwableBottles.splice(index, 1);
                    }, 400);
                }

                this.playAnimation(this.IMAGES_BOTTLESPLASH);
                this.shatter_sound.play();
            }
        }, 100);
    }

    throw(x,y) {
        if (!world.character.facingLeft) {
            this.x = x;
            this.y = y;
            this.speedY = 20;
                setInterval(() => {
                    if (this.y < 350 && !this.bottleHit) {
                        this.x += this.speedX;
                    } 
                }, 1000/60);
        } else {
            this.x = x -40;
            this.y = y;
            this.speedY = 20;
                setInterval(() => {
                    if (this.y < 350 && !this.bottleHit) {
                        this.x -= this.speedX;
                    } 
                }, 1000/60);
        }
        
    }
}