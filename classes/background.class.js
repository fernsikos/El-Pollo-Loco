class Background extends Moveableobject{
    x = 0;
    y = 0;
    height = 480;
    width = 721;

    constructor(imagePath, x, y) {
        super();
        this.createImage(imagePath);
        this.x = x;
        this. y = y;
    }

}