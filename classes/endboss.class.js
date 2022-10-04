class Endboss extends Moveableobject {
    IMAGES_ALERT = [
        "img/4_enemie_boss_chicken/2_alert/G5.png",
        "img/4_enemie_boss_chicken/2_alert/G6.png",
        "img/4_enemie_boss_chicken/2_alert/G7.png",
        "img/4_enemie_boss_chicken/2_alert/G8.png",
        "img/4_enemie_boss_chicken/2_alert/G9.png",
        "img/4_enemie_boss_chicken/2_alert/G10.png",
        "img/4_enemie_boss_chicken/2_alert/G11.png",
        "img/4_enemie_boss_chicken/2_alert/G12.png",
    ];

    IMAGES_WALKING = [
        "img/4_enemie_boss_chicken/1_walk/G1.png",
        "img/4_enemie_boss_chicken/1_walk/G2.png",
        "img/4_enemie_boss_chicken/1_walk/G3.png",
        "img/4_enemie_boss_chicken/1_walk/G4.png",
    ];

    IMAGES_HIT = [
        "img/4_enemie_boss_chicken/4_hurt/G21.png",
        "img/4_enemie_boss_chicken/4_hurt/G22.png",
        "img/4_enemie_boss_chicken/4_hurt/G23.png",
    ];

    IMAGES_DEAD = [
        "img/4_enemie_boss_chicken/5_dead/G24.png",
        "img/4_enemie_boss_chicken/5_dead/G25.png",
        "img/4_enemie_boss_chicken/5_dead/G26.png",
    ]

    x = 3200;
    y = 50;
    width = 300;
    height = 400;
    energy = 100;
    world;
    hit = false;
    characterAriivedAtEndboss = false;
    endboss_sound = new Audio('audio/chicken1.wav');
    offset = {
        top: 120,
        bottom: 50,
        right: 50,
        left: 50,
    }



    constructor(x) {
        super();
        this.loadImagesToCache(this.IMAGES_ALERT);
        this.loadImagesToCache(this.IMAGES_WALKING);
        this.loadImagesToCache(this.IMAGES_HIT);
        this.loadImagesToCache(this.IMAGES_DEAD);
        this.createImage("img/4_enemie_boss_chicken/2_alert/G5.png");
        this.animate();
        this.playSound();
    }

    /**
     * Animates the endboss. Playes alert animation with some delay until character arrives at endboss.
     */
    animate() {
        let i = 0;
        let interval = setInterval(() => {
            this.checkIfCharacterAtEndboss();
            if (this.characterAriivedAtEndboss) {
                i++;
            }
            if (this.energy < 1) {
                this.playAnimation(this.IMAGES_DEAD)
                this.isAlive = false;
            } else if (this.hit) {
                this.playAnimation(this.IMAGES_HIT)
            } else if (i < 30) {
                this.playAnimation(this.IMAGES_ALERT);
            } else {
                this.playAnimation(this.IMAGES_WALKING);
                this.moveLeft(5)
            }
        }, 200);
        intervalIds.push(interval);
    }

    /**
     * Checkes if character arrived at endboss with comparing their x values
     */
    checkIfCharacterAtEndboss() {
        if (world.character.x > world.endboss.x - 400) {
            this.characterAriivedAtEndboss = true;
        }
    }

    /**
     * Set enboss variable to hit, reduces energy from endboss, and reset hit variable after delay.
     * Initiates game over when endboss dead
     */
    endbossHit() {
        this.hit = true;
        this.resetHitVariable();
        this.energy -= 20;
        this.checkIfEndbossDead();
    }

    /**
     * Playes chicken sound every 10s after character arrived at endboss.
     */
    playSound() {
         let interval = setInterval(() => {
            if (this.characterAriivedAtEndboss && this.isAlive) {
                this.endboss_sound.play()
            }
        }, 10000);
        intervalIds.push(interval);
    }

    // Templates/Returns

    /**
     * Reset hit variable after delay of 1s.
     */
    resetHitVariable() {
        setTimeout(() => {
            this.hit = false;
        }, 1000);
    }

    /**
     * Checkes if endboss is dead and triggers game over after delay.
     */
    checkIfEndbossDead() {
        if (this.energy === 0) {
            setTimeout(() => {
                this.world.gameOver = true;
            }, 1000);
        }
    }
}