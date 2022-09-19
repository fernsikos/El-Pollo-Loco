class Character extends Moveableobject {
    IMAGES_WALKING = [
        "img/2_character_pepe/2_walk/W-21.png",
        "img/2_character_pepe/2_walk/W-22.png",
        "img/2_character_pepe/2_walk/W-23.png",
        "img/2_character_pepe/2_walk/W-24.png",
        "img/2_character_pepe/2_walk/W-25.png",
        "img/2_character_pepe/2_walk/W-26.png",
    ]

    IMAGES_JUMPING = [
        "img/2_character_pepe/3_jump/J-31.png",
        "img/2_character_pepe/3_jump/J-32.png",
        "img/2_character_pepe/3_jump/J-33.png",
        "img/2_character_pepe/3_jump/J-34.png",
        "img/2_character_pepe/3_jump/J-35.png",
        "img/2_character_pepe/3_jump/J-36.png",
        "img/2_character_pepe/3_jump/J-37.png",
        "img/2_character_pepe/3_jump/J-38.png",
        "img/2_character_pepe/3_jump/J-39.png",
    ]

    x = 100;
    y = 80; //210
    height = 220;
    width = 110;
    world;
    walkingSpeed = 20;
    walking_sound = new Audio('audio/walking_modified.mp3');



    constructor() {
        super();
        this.createImage('img/2_character_pepe/1_idle/idle/I-1.png')
        this.loadImagesToCache(this.IMAGES_WALKING);
        this.loadImagesToCache(this.IMAGES_JUMPING);
        this.walking_sound.volume = 0.7;
        this.animate();
        this.applyGravity();
    }


    animate() {
        setInterval(() => {

            this.walking_sound.pause();
            if (this.world.keyboard.SPACE) {
               console.log("Space");
                this.jump();
            }
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end) {
                this.moveRight(this.walkingSpeed);
                this.walking_sound.play();
            };

            if (this.world.keyboard.LEFT && this.x > this.world.level.level_start) {
                this.imageMirrored = true;
                this.moveLeft(this.walkingSpeed);
                this.walking_sound.play();
            }
            this.world.camera_x = 100 - this.x;

        }, 1000 / 15);

        setInterval(() => {
            if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 1000 / 10);
    }


    jump() {

    }
}