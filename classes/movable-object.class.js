class Moveableobject extends DrawableObject{
  
    imageMirrored = false;
 

    playAnimation(Images) {
        let i = this.imageCount % Images.length;
        let imagePath = Images[i];
        this.img = this.imageCache[imagePath];
        this.imageCount++
    }

    moveRight(speed) {
        this.x += speed;
        this.imageMirrored = false;
    }

    moveLeft(speed) {
        this.x -= speed;
        
    }


}