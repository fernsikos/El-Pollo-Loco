class Moveableobject extends DrawableObject {

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

    /**
     * Checkes if object is above ground or is moving upwards. If true reduces the y speed by accelaration.
     * If false keeps speed y at 0.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            } else {
                this.speedY = 0;
            }
        }, 1000 / 25);
    }

    /**
     * checkes if an object is above ground.
     * @returns true if bottles are above 360 and other objects above 210.
     */
    isAboveGround() {
        if (this instanceof Throwablebottle) {
            return this.y < 360;
        } else {
            return this.y < 210;
        }
    }

    /**
     * Plays an animation using an array of images.
     * @param {Array} Images array with images for animation.
     */
    playAnimation(Images) {
        let i = this.imageCount % Images.length;
        let imagePath = Images[i];
        this.img = this.imageCache[imagePath];
        this.imageCount++
    }

    /**
     * Moves an object to the right by changing its x variable.
     * @param {Variable} speed 
     */
    moveRight(speed) {
        this.x += speed;
        this.imageMirrored = false;
        this.lastMove = new Date().getTime();
    }

    /**
     * Moves an object to the left by changing its x variable.
     * @param {Variable} speed 
     */
    moveLeft(speed) {
        this.x -= speed;
        this.lastMove = new Date().getTime();
    }

    /**
     * Let an object jump by changing its speed y variable.
     * Playes jumping sound
     */
    jump() {
        this.speedY = 15;
        this.jumping_sound.play();
        this.lastMove = new Date().getTime();
    }

    /**
     * 
     * @param {Object} mo 
     * @returns true if an object is colliding with this object. 
     */
    isColliding(mo) {
        return this.isCollidingHorizontal(mo) &&
            this.isCollidingVertical(mo)
    }

    /**
     * 
     * @param {Object} mo 
     * @returns True if colliding horizontally.
     */
    isCollidingHorizontal(mo) {
        return this.getRightPosition() > mo.x + mo.offset.left &&
            this.getLeftPosition() < mo.x + mo.width - mo.offset.right
    }

    /**
     * 
     * @param {Object} mo 
     * @returns True if colliding vertically.
     */
    isCollidingVertical(mo) {
        return this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    }

    /**
     * 
     * @returns objects right position.
     */
    getRightPosition() {
        return this.x + this.width - this.offset.right
    }

     /**
     * 
     * @returns objects left position.
     */
    getLeftPosition() {
        return this.x + this.offset.left
    }
}