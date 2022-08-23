class Chicken extends Moveableobject {
    IMAGES_WALKING=[
        "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
        "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
        "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
    ]

    x = 250 + Math.random() * 500;
    y = 350;
    height = 80;
    width = 80;
    ckickenSpeed = 0.15+ 0.3 * Math.random();

    constructor() {
        super();
        this.createImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImagesToCache(this.IMAGES_WALKING);
        this.animate();
    }

     animate() {
        setInterval(() => {
            this.moveLeft(this.ckickenSpeed)
        }, 1000/60);

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING)
        }, 1000/7);
     }
  
}