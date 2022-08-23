class Character extends Moveableobject {
    IMAGES_WALKING = [
        "img/2_character_pepe/2_walk/W-21.png",
        "img/2_character_pepe/2_walk/W-22.png",
        "img/2_character_pepe/2_walk/W-23.png",
        "img/2_character_pepe/2_walk/W-24.png",
        "img/2_character_pepe/2_walk/W-25.png",
        "img/2_character_pepe/2_walk/W-26.png",
    ]

    x = 100;
    y = 210;
    height = 220;
    width = 110;
    world;
    walkingSpeed = 13;


    constructor() {
        super();
        this.createImage('img/2_character_pepe/1_idle/idle/I-1.png')
        this.loadImagesToCache(this.IMAGES_WALKING);
        this.animate();
    }


    animate() {
        setInterval(() => {
            if(this.world.keyboard.RIGHT) {
            this.playAnimation(this.IMAGES_WALKING);
            this.moveRight(this.walkingSpeed);
            };

            if(this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
                this.moveLeft(this.walkingSpeed);
            }
        }, 1000 / 15);
    }


    jump() {

    }
}