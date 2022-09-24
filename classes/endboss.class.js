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
    ]

    x = 3200;
    y = 50;
    width = 300;
    height = 400;
    characterAriivedAtEndboss = false;
    endboss_sound = new Audio('audio/chicken1.wav');



    constructor(x) {
        super();
        this.loadImagesToCache(this.IMAGES_ALERT);
        this.loadImagesToCache(this.IMAGES_WALKING);
        this.createImage("img/4_enemie_boss_chicken/2_alert/G5.png");
        this.animate();
        this.playSound();
    }

    animate() {
        let i = 0;
        setInterval(() => {
            if (i < 30) {
                this.playAnimation(this.IMAGES_ALERT);
            } else {
                this.playAnimation(this.IMAGES_WALKING);
                this.moveLeft(5)
            }
            this.checkIfCharacterAtEndboss();
            if (this.characterAriivedAtEndboss) {
                i++;
            }
        }, 200);
    }

    checkIfCharacterAtEndboss() {
        if (world.character.x > world.endboss.x - 400) {
            this.characterAriivedAtEndboss = true;
        }
    }

    playSound() {

        setInterval(() => {
            if (this.characterAriivedAtEndboss) {
                this.endboss_sound.play()
            }
        }, 15000)

    }

}