class Moveableobject extends DrawableObject{
  
    imageMirrored = false;
    speedY = 0;
    acceleration = 1;

    applyGravity() {
        setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0) {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
            }
        }, 1000/25);
    }

    isAboveGround() {
        return this.y < 210;
    }
 

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

    jump() {
        this.speedY = 25;
        console.log("Jump");
    }


}