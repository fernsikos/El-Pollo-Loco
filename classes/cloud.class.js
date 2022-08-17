class Cloud extends Moveableobject {
    height = 300;
    width = 720;

    constructor(imagePath, x, y) {
        super();
        this.createImage(imagePath);
        this.x = x;
        this.y = y;
        this.animate();
    }

    animate() {
        setInterval(() => {
         this.moveLeft(0.15);   
        }, 1000/25);
        
    }
}