class DrawableObject {
    x;
    y;
    height;
    width;
    img;
    imageCount = 0;
    imageCache = {

    };

    /**
     * Creates a new image element and sets path.
     * @param {URL} path 
     */
    createImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Iterates through tze array. Creates an image, sets image path and pushes image to the image cache.
     * @param {Array} imageArray Array with url´s from images.
     */
    loadImagesToCache(imageArray) {
        imageArray.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Draws an image to the canvas.
     * @param {Object} ctx Context of canvas.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * For develloper pupose. Draws blue rechtangles around objects.
     * Draws red rechtangles around objects in relation to the offset.
     * @param {Object} ctx Context of canvas.
     */
    drawRectangles(ctx) {
        this.drawImageRectangles(ctx);
        this.drawHitRectangles(ctx);
    }

    /**
     * For develloper pupose. Draws rechtangles around images
     * @param {Object} ctx 
     */
    drawImageRectangles(ctx) {
        if (this.needToDrawRectangles()) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    /**
     * For develloper pupose. Draws smaller rectangles around images representing the hit zone
     * @param {Object} ctx 
     */
    drawHitRectangles(ctx) {
        if (this.needToDrawRectangles()) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.right - this.offset.left, this.height - this.offset.top - this.offset.bottom);
            ctx.stroke();
        }
    }

    // Templates/ Returns

    needToDrawRectangles() {
        return this instanceof Chicken || this instanceof Character || this instanceof Bottle || this instanceof Coin || this instanceof ChickenSmall || this instanceof Endboss
    }
}