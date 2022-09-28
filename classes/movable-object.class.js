class Moveableobject extends DrawableObject{
  
    imageMirrored = false;
    energy = 100;
    speedY = 0;
    acceleration = 1.2;
    lastMove = new Date().getTime();
    lastHit = 0; //weg?
    isAlive = true;
    isHit = false;
    jumping_sound = new Audio('audio/jump.mp3');

    constructor() {
        super();
        this.jumping_sound.volume = 0.4;
    }

    applyGravity() {
        setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0) {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
            } else {
                this.speedY = 0;
            }
        }, 1000/25);
    }

    isAboveGround() {
        if(this instanceof Throwablebottle) {
            return this.y < 360;
        } else {
            return this.y < 210;
        }
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
        this.jumping_sound.play();
        this.lastMove = new Date().getTime();
    }

    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height  -this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    }
}