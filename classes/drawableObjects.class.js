class DrawableObject {
    x;
    y;
    height;
    width;
    img;
    imageCount = 0;
    imageCache = {

    };

       //img element wird erstellt, aber noch nicht aufs canvas gezeichnet.
    createImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImagesToCache(imageArray) {
        imageArray.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawRectangles(ctx) {

        if (this instanceof Chicken || this instanceof Character || this instanceof Bottle || this instanceof Coin || this instanceof ChickenSmall || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

}