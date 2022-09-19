class ChickenSmall extends Moveableobject {

    IMAGES_WALKING = [
        "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
        "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
        "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
    ];

    height = 40;
    width = 45;
    ckickenSpeed = 0.15+ 0.3 * Math.random();
    x;
    y = 385;

    constructor(x, y) {
        super();
        this.x = x;
        this.loadImagesToCache(this.IMAGES_WALKING);
        this.createImage("img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
        this.animate();
    }

    animate() {

        setInterval(() => {
            this.moveLeft(this.ckickenSpeed)
        }, 1000/60);
        
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING)
        }, 1000/9);

       
    }
}