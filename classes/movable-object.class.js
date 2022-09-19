class Moveableobject extends DrawableObject{
  
    imageMirrored = false;
    speedY = 0;
    acceleration = 1;
    lastMove = new Date().getTime();

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
 
    isResting() {
        let timePassedSinceLAstMove = new Date().getTime() - this.lastMove;
        timePassedSinceLAstMove = timePassedSinceLAstMove / 1000;
        return timePassedSinceLAstMove > 0.1 && timePassedSinceLAstMove < 5;
    }

    isSleepimg() {
        let timePassedSinceLAstMove = new Date().getTime() - this.lastMove;
        timePassedSinceLAstMove = timePassedSinceLAstMove / 1000;
        return timePassedSinceLAstMove > 5;
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
        this.lastMove = new Date().getTime();
    }

    moveLeft(speed) {
        this.x -= speed;
        this.lastMove = new Date().getTime();
    }

    jump() {
        this.speedY = 15;
        this.lastMove = new Date().getTime();
    }


}