class World {
    ctx;
    canvas;
    statusbar = new Statusbar();
    coinbar = new Coinbar();
    character = new Character();
    bottlebar = new Bottlebar();
    endboss = new Endboss();
    level = level1;
    throwableBottles = [];
    keyboard = new Keyboard();
    camera_x;
    gameOver = false;
    coin_sound = new Audio('audio/bling.mov');
    bottle_sound = new Audio('audio/bottle-open.mp3')

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
        this.character.world = this;
        this.endboss.world = this;
        this.runInterval();
        this.coin_sound.volume = 0.3;
        this.bottle_sound.volume = 0.5;
    }

    /**
     * runs the game logic. checks collisions, if bottles are collected and if the game is over.
     */
    runInterval() {
        let interval = setInterval(() => {
            this.checkCollisions();
            this.checkThrowableBottles();
            this.checkForGameOver();
        }, 100);
        intervalIds.push(interval);
    }

    /**
     * checks if variable gameOver is true.
     * Showes you lost screen if character lost, or game over, if endboss lost.
     */
    checkForGameOver() {
        if (this.gameOver) {
            this.clearIntervals()
            if(this.character.isAlive) {
                document.getElementById('outro-screen-game-over').classList.remove('d-none')
            } else {
                document.getElementById('outro-screen-you-lost').classList.remove('d-none')
            }
            this.character.walking_sound.pause();
        }
    }

    /**
     * is clearing all necessary intervalls.
     */
    clearIntervals() {
        intervalIds.forEach(id => {
            clearInterval(id)
        });
    }

    /**
     * checks if objects are colliding.
     */
    checkCollisions() {
        this.checkEndboss();
        this.checkBottles();
        this.checkCoins();
        this.checkEnemies();
        this.checkBottleHitsEnemies();
        this.checkBottleHitEndboss();
    }

    /**
     * iterates through the array with the throwed bottles. Checkes if bottle 
     * is colliding with endboss and triggers hit function.
     */
    checkBottleHitEndboss() {
        this.throwableBottles.forEach(bottle => {
            if (bottle.isColliding(this.endboss) && !this.endboss.hit) {
                this.endboss.endbossHit();
                bottle.bottleHit = true;
            }
        });
    }

    /**
     * if there are throwed bottles in the array, the function iterates through it, then 
     * itterates through the array with the enemies. Checkes if a bottle is colliding with 
     * an enemy and triggers the kill enemy function.
     */
    checkBottleHitsEnemies() {
        if (this.throwableBottles) {
            this.throwableBottles.forEach(bottle => {
                this.level.enemies.forEach(enemy => {
                    if (bottle.isColliding(enemy) && !enemy.isHit) {
                        this.killEnemy(enemy);
                    }
                });
            });
        }
    }

    /**
     * Checkes if character is hit by an enemy or if the character is jumping on an enemy.
     * 
     */
    checkEnemies() {
        this.level.enemies.forEach(enemy => {
            if (this.characterHitByEnemy(enemy)) {
                this.character.hit();
            } else if (this.characterJumpOnEnemy(enemy)) {
                this.killEnemy(enemy);
                this.character.jump();
            }
        });
    }

    /**
    * iterates through all coins and checkes if character is colliding with it.
    */
    checkCoins() {
        this.level.coins.forEach(coin => {
            if (this.character.isColliding(coin)) {
                let coinPosition = this.level.coins.indexOf(coin);
                this.level.coins.splice(coinPosition, 1)
                this.coinbar.updateCoins();
                this.coin_sound.play();
            }
        });
    }

    /**
     * iterates through all bottles and checks if the character is colliding with it.
     * If true, playes bottle sound and updates bottles.
     */
    checkBottles() {
        this.level.bottles.forEach(bottle => {
            if (this.character.isColliding(bottle)) {
                let bottlePosition = this.level.bottles.indexOf(bottle);
                this.level.bottles.splice(bottlePosition, 1);
                this.bottlebar.updateBottles();
                this.bottle_sound.play();
            }
        });
    }

    /**
     * Checkes if the endboss is colliding with character.
     */
    checkEndboss() {
        if (this.character.isColliding(this.endboss)) {
            this.character.hit();
        }
    }

    /**
     * checkes  if bottles are available to throw.
     * If pushes a new bottle in the throwablebottle array.
     * Then updates the bottlebar, the available bottles and the time of characters last move.
     */
    checkThrowableBottles() {
        if (this.keyboard.D && this.bottlebar.bottles > 0) {
            this.throwableBottles.push(new Throwablebottle(this.character.x + 50, this.character.y + 100, this));
            this.bottlebar.removeBottle();
            this.bottlebar.updateBottlebar();
            this.updateCharactersLastMove();
        }
    }

    /**
     * updates the time from the characters last move .
     */
    updateCharactersLastMove() {
        this.character.lastMove = new Date().getTime();
    }

    /**
     * Sets the parameter of an enemy to Hit and not Alive.
     * Shows the picture of a dead enemy and removes it after 2 sec.
     * @param {Object} enemy 
     */
    killEnemy(enemy) {
        enemy.isHit = true;
        enemy.isAlive = false;
        enemy.img = enemy.imageDead;
        setTimeout(this.removeDeadEnemies, 2000, this)
    }

    /**
     * Removes all dead enemies from the world with filtering for alive enemies.
     * @param {Object} world 
     */
    removeDeadEnemies(world) {
        if (world.level.enemies) {
            world.level.enemies = world.level.enemies.filter((e) => e.isAlive)
        }
    }

    /**
     * Function for drawing objects to the canvas.
     */
    draw() {
        //clears canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        //ables character to walk. Shifts camera position by x
        this.ctx.translate(this.camera_x, 0)
        //section for drawing objects to canvas that relates to world (movable)
        this.drawToCanvasFromArray(this.level.backgroundObjects);
        this.drawToCanvasFromArray(this.level.clouds);
        this.drawToCanvasFromArray(this.level.bottles);
        this.drawToCanvasFromArray(this.level.coins);
        this.drawToCanvas(this.character);
        this.drawToCanvasFromArray(this.level.enemies);
        this.drawToCanvas(this.endboss);
        this.drawToCanvasFromArray(this.throwableBottles);
        //resets camera position
        this.ctx.translate(-this.camera_x, 0)
        //section for drawing objects to canvas that relates to screen (not movable)
        this.drawToCanvas(this.statusbar);
        this.drawToCanvas(this.coinbar);
        this.drawToCanvas(this.bottlebar);
        //draw is run as often the graphic card allows it to do
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * Checks if the object needs to be drawn flipped. Draws a single object to the canvas.
     * Restore the flipped mehod if drawn image was flipped.
     * @param {Object} object 
     */
    drawToCanvas(object) {
        if (object.imageMirrored) {
            this.flipImage(object);
        };
        object.draw(this.ctx);
        // object.drawRectangles(this.ctx); For develloper purpose only
        if (object.imageMirrored) {
            this.restoreImage(object);
        }
    }

    /**
     * Iterates through an array with objects and runs drwaToCanvas function.
     * @param {Array} array 
     */
    drawToCanvasFromArray(array) {
        array.forEach(element => {
            this.drawToCanvas(element)
        });
    }

    /**
     * Saves canvas configuratin, translate the x axis, mirrores the picture, and adjusts the x axis from object.
     * @param {Object} object 
     */
    flipImage(object) {
        this.ctx.save();
        this.ctx.translate(object.width, 0);
        this.ctx.scale(-1, 1)
        object.x = object.x * -1;
    }

    /**
     * Restores the saved canvas configuration.
     * @param {Object} object 
     */
    restoreImage(object) {
        this.ctx.restore();
        object.x = object.x * -1;
    }

    //Templates/Returns

    /**
     * 
     * @param {Object} enemy 
     * @returns true if character is not jumping and got hit by enemy.
     */
    characterHitByEnemy(enemy) {
        return this.character.isColliding(enemy) && this.character.speedY > -0.1 && enemy.isAlive && !this.character.isHit
    }

    /**
     * 
     * @param {Object} enemy 
     * @returns true if character is jumping on an enemy.
     */
    characterJumpOnEnemy(enemy) {
        return this.character.isColliding(enemy) && this.character.speedY < 0 && !enemy.isHit
    }
}