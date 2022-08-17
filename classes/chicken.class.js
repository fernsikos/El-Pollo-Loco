class Chicken extends Moveableobject {
    x = 250 + Math.random() * 500;
    y = 350;
    height = 80;
    width = 80;
    ckickenSpeed = 0.15+ 0.3 * Math.random();

    constructor() {
        super();
        this.createImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')
        this.animate();
    }

     animate() {
        setInterval(() => {
            this.moveLeft(this.ckickenSpeed)
        }, 1000/60);
     }
  
}