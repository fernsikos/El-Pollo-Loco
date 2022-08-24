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
    walkingSpeed = 20;
    walking_sound = new Audio('audio/walking_modified.mp3');
    


    constructor() {
        super();
        this.createImage('img/2_character_pepe/1_idle/idle/I-1.png')
        this.loadImagesToCache(this.IMAGES_WALKING);
        this.walking_sound.volume = 0.7;
        this.animate();
    }


    animate() {
        setInterval(() => {
            this.walking_sound.pause();
            if(this.world.keyboard.RIGHT && this.x < this.world.level.level_end) {
            this.playAnimation(this.IMAGES_WALKING);
            this.moveRight(this.walkingSpeed);
            this.walking_sound.play();
            };

            if(this.world.keyboard.LEFT && this.x > this.world.level.level_start) {
                this.playAnimation(this.IMAGES_WALKING);
                this.imageMirrored = true;
                this.moveLeft(this.walkingSpeed);
                this.walking_sound.play();
            }
            this.world.camera_x = 100 -this.x;
        }, 1000 / 15);
    }


    jump() {

    }
}