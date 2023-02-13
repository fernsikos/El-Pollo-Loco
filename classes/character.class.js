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
    ];

    IMAGES_RESTING = [
        "img/2_character_pepe/1_idle/idle/I-1.png",
        "img/2_character_pepe/1_idle/idle/I-2.png",
        "img/2_character_pepe/1_idle/idle/I-3.png",
        "img/2_character_pepe/1_idle/idle/I-4.png",
        "img/2_character_pepe/1_idle/idle/I-5.png",
        "img/2_character_pepe/1_idle/idle/I-6.png",
        "img/2_character_pepe/1_idle/idle/I-7.png",
        "img/2_character_pepe/1_idle/idle/I-8.png",
        "img/2_character_pepe/1_idle/idle/I-9.png",
        "img/2_character_pepe/1_idle/idle/I-10.png",
    ];

    IMAGES_SLEEPING = [
        "img/2_character_pepe/1_idle/long_idle/I-11.png",
        "img/2_character_pepe/1_idle/long_idle/I-12.png",
        "img/2_character_pepe/1_idle/long_idle/I-13.png",
        "img/2_character_pepe/1_idle/long_idle/I-14.png",
        "img/2_character_pepe/1_idle/long_idle/I-15.png",
        "img/2_character_pepe/1_idle/long_idle/I-16.png",
        "img/2_character_pepe/1_idle/long_idle/I-17.png",
        "img/2_character_pepe/1_idle/long_idle/I-18.png",
        "img/2_character_pepe/1_idle/long_idle/I-19.png",
        "img/2_character_pepe/1_idle/long_idle/I-20.png",
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',
    ];

    IMAGES_HURT = [
        "img/2_character_pepe/4_hurt/H-41.png",
        "img/2_character_pepe/4_hurt/H-42.png",
        "img/2_character_pepe/4_hurt/H-43.png",
    ]

    x = 100;
    y = 210;
    height = 220;
    width = 110;
    world;
    walkingSpeed = 20;
    facingLeft = false;
    walking_sound = new Audio('audio/walking_modified.mp3');
    hit_sound = new Audio('audio/ouch.mov');
    jumping_sound = new Audio('audio/jump.mp3');
    offset = {
        top: 120,
        bottom: 15,
        right: 35,
        left: 30,
    }




    constructor(world) {
        super();
        this.createImage('img/2_character_pepe/1_idle/idle/I-1.png')
        this.loadImagesToCache(this.IMAGES_WALKING);
        this.loadImagesToCache(this.IMAGES_JUMPING);
        this.loadImagesToCache(this.IMAGES_RESTING);
        this.loadImagesToCache(this.IMAGES_SLEEPING);
        this.loadImagesToCache(this.IMAGES_DEAD);
        this.loadImagesToCache(this.IMAGES_HURT);
        this.hit_sound.volume = 0.3;
        this.jumping_sound.volume = 0.4;
        this.animate();
        this.applyGravity();
    }

    /**
     * Animates characters position in relation to player input.
     * Sycronizes picture animation in relation to his movements, health status and actions.
     */
    animate() {
        this.animateMovements();
        this.animateImages();
    }

    /**
     * Reduces energy from character, syncronizes healthbar and updates time of last hit and move.
     * Set character to hit for 1s and checkes if character is dead.
     */
    hit() {
        this.energy -= 20;
        this.world.statusbar.syncronizeStatusbar(this.energy);
        this.hit_sound.play();
        this.lastHit = new Date().getTime();
        this.lastMove = new Date().getTime();
        this.setHitCycle();
        this.checkIfCharacterDead();
    }

    /**
     * Comparing current time with time of characters last move.
     * @returns True if character is not moving longer then 0.1s but shorter then 5s.
     */
    isResting() {
        let timePassedSinceLAstMove = new Date().getTime() - this.lastMove;
        timePassedSinceLAstMove = timePassedSinceLAstMove / 1000;
        return timePassedSinceLAstMove > 0.1 && timePassedSinceLAstMove < 5;
    }

    /**
     * Comparing current time with time of characters last move.
     * @returns True if character is not moving longer then 5s.
     */
    isSleeping() {
        let timePassedSinceLAstMove = new Date().getTime() - this.lastMove;
        timePassedSinceLAstMove = timePassedSinceLAstMove / 1000;
        return timePassedSinceLAstMove > 5;
    }

    /**
     * Comparing current time with time oc characters last hit.
     * @returns True if for 0.5s character got hit.
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 0.5;
    }

    // Templates/Returns

    /**
     * Animates characters movements in relation to player input.
     */
    animateMovements() {
        let interval = setInterval(() => {
            this.walking_sound.pause();
            this.letCharacterJump();
            this.letCharacterWalkRight();
            this.letCharacterWalkLeft();
            this.world.camera_x = 100 - this.x;
        }, 1000 / 15);
        intervalIds.push(interval);
    }

    /**
     * Animates characters pictures in relation to player input, health status and actions.
     */
    animateImages() {
        let interval2 = setInterval(() => {
            if (this.energy === 0) {
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
            } else if (this.isSleeping()) {
                this.playAnimation(this.IMAGES_SLEEPING)
            } else if (this.isResting()) {
                this.playAnimation(this.IMAGES_RESTING)
            }
        }, 1000 / 10);
        intervalIds.push(interval2);
    }

    /**
     * Sets is hit variable to true und resets it after delay of 1s.
     */
    setHitCycle() {
        this.isHit = true;
        setTimeout(() => {
            this.isHit = false
        }, 1000);
    }

    /**
     * Checkes if energy of character if lower then 1.
     * If true sets variable to not alive and game over.
     */
    checkIfCharacterDead() {
        if (this.energy < 1) {
            this.isAlive = false;
            this.world.gameOver = true;
        }
    }

    /**
     * Lets the character jump when space key pressed
     */
    letCharacterJump() {
        if (this.world.keyboard.SPACE && !this.isAboveGround()) {
            this.jump();
            this.jumping_sound.play()
        }
    }

     /**
     * Lets the character walk right when right key pressed
     */
    letCharacterWalkRight() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end) {
            this.moveRight(this.walkingSpeed);
            this.facingLeft = false;
            if (!this.isAboveGround()) { this.walking_sound.play() };
        };
    }

      /**
     * Lets the character walk left when left key pressed
     */
    letCharacterWalkLeft() {
        if (this.world.keyboard.LEFT && this.x > this.world.level.level_start) {
            this.imageMirrored = true;
            this.facingLeft = true;
            this.moveLeft(this.walkingSpeed);
            if (!this.isAboveGround()) { this.walking_sound.play() };
        }
    }
}