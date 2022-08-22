class Moveableobject {
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

    playAnimation(Images) {
        let i = this.imageCount % Images.length;
        let imagePath = Images[i];
        this.img = this.imageCache[imagePath];
        this.imageCount++
    }

    moveRight() {

    }

    moveLeft(speed) {
        this.x -= speed;
    }


}