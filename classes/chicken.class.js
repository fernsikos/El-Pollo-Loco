class Chicken extends Moveableobject {
    IMAGES_WALKING = [
        "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
        "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
        "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
    ]

    x = 250 + Math.random() * 500;
    y = 370;
    height = 60;
    width = 60;
    ckickenSpeed = 0.15 + 0.3 * Math.random();
    imageDead = new Image();
    offset = {
        top: 15,
        bottom: 15,
        right: 15,
        left: 15,
    }

    constructor(x) {
        super();
        this.createImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = x;
        this.loadImagesToCache(this.IMAGES_WALKING);
        this.imageDead.src = "img/3_enemies_chicken/chicken_normal/2_dead/dead.png";
        this.animate();
    }

    /**
     * Animates the chicken by changing its position with random speed and showing walking animation.
     */
    animate() {
        let interval = setInterval(() => {
            if (!this.isHit) {
                this.moveLeft(this.ckickenSpeed)
            }
        }, 1000 / 60);

        let interval2 = setInterval(() => {
            if (!this.isHit) {
                this.playAnimation(this.IMAGES_WALKING)
            }
        }, 1000 / 7);
        intervalIds.push(interval);
        intervalIds.push(interval2);
    }

}