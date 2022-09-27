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
    keyboard;
    camera_x;
    keyboardPressed = false;
    gameOver = false;
    intervalIds = [];
    coin_sound = new Audio('audio/bling.mov');
   


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.character.world = this;
        this.runInterval();
        this.coin_sound.volume = 0.3;
    }

    draw() {
        //clears canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        //ables character to walk. Shifts camera position by x
        this.ctx.translate(this.camera_x, 0)
        //section for drawing objects to canvas that relates to world (movable)
        this.drawToCanvasFromArray(this.level.backgroundObjects);
        this.drawToCanvasFromArray(this.level.clouds);
        this.drawToCanvasFromArray(this.level.bottles);
        this.drawToCanvasFromArray(this.throwableBottles);
        this.drawToCanvasFromArray(this.level.coins);
        this.drawToCanvas(this.character);
        this.drawToCanvasFromArray(this.level.enemies);
        this.drawToCanvas(this.endboss);
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
     * runs the game logic. checks collisions, if bottles are collected and if the game is over
     */
    runInterval() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowableBottles();
            this.checkForGameOver();
        }, 100);
    }

    /**
     * checks if objects are colliding
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
     * checks if variable gameOver is true and showes end screen
     */
    checkForGameOver() {
        if (this.gameOver) {
            document.getElementById('outro-screen').classList.remove('d-none')
        }
    }


    /**
     * iterates through the array with the throwed bottles. Checkes if bottle 
     * is colliding with endboss and triggers hit function
     */
    checkBottleHitEndboss() {
        this.throwableBottles.forEach(bottle => {
            if (bottle.isColliding(this.endboss) && !this.endboss.hit) {
                this.endboss.endbossHit();
            }
        });
    }

    /**
     * if there are throwed bottles in the array, the function iterates through it, then 
     * itterates through the array with the enemies. Checkes if a bottle is colliding with 
     * an enemy and triggers the kill enemy function
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
     * checkes if d is pressed and not hold down and if bottles are available to throw.
     * If true set the key-pressed varible tue true and pushes a new bottle in the throwablebottle array.
     * Then updates the bottlebar, the available bottles and the time of characters last move.
     * If the first check was false, it checkes if the d key ist still pressed. If false, resets d pressed variable.
     */
    checkThrowableBottles() {
        if(this.keyboard.D && !this.keyboardPressed && this.bottlebar.bottles > 0) {
            this.keyboardPressed = true;
            this.throwableBottles.push(new Throwablebottle(this.character.x + 50, this.character.y +100, this));
            this.bottlebar.removeBottle();
            this.bottlebar.updateBottlebar();
            this.updateCharactersLastMove();
        } else if (!this.keyboard.D) {
            this.keyboardPressed = false
        }
    }

    updateCharactersLastMove() {
        this.character.lastMove = new Date().getTime();
    }

    drawToCanvas(object) {
        if (object.imageMirrored) {
            this.flipImage(object);
        };
        object.draw(this.ctx);
        // object.drawRectangles(this.ctx);
        if (object.imageMirrored) {
            this.restoreImage(object);
        }
    }

    drawToCanvasFromArray(array) {
        array.forEach(element => {
            this.drawToCanvas(element)
        });
    }

    flipImage(object) {
        this.ctx.save();
        this.ctx.translate(object.width, 0);
        this.ctx.scale(-1, 1)
        object.x = object.x * -1;
    }

    restoreImage(object) {
        this.ctx.restore();
        object.x = object.x * -1;
    }

    checkEnemies() {
        this.level.enemies.forEach(enemy => {
            if (this.character.isColliding(enemy) && this.character.speedY > -0.1 && enemy.isAlive && !this.character.isHit) {
                this.character.hit();
            } else if (this.character.isColliding(enemy) && this.character.speedY < 0 && !enemy.isHit) {
                this.killEnemy(enemy);
                this.character.jump();
            }
        });
    }

    killEnemy(enemy) {
        enemy.isHit = true;
        enemy.isAlive = false;
        enemy.img = enemy.imageDead;
        setTimeout(this.removeDeadEnemies, 2000, this)
    }

    removeDeadEnemies(world) {
        if(world.level.enemies) {
            world.level.enemies = world.level.enemies.filter((e) => e.isAlive)
        }
    }

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

    checkBottles() {
        this.level.bottles.forEach(bottle => {
            if (this.character.isColliding(bottle)) {
                let bottlePosition = this.level.bottles.indexOf(bottle);
                this.level.bottles.splice(bottlePosition, 1);
                this.bottlebar.updateBottles();
            }
        });
    }

    checkEndboss() {
        if (this.character.isColliding(this.endboss)) {
            this.character.hit();
        }
    }
}