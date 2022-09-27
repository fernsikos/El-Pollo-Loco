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


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.character.world = this;
        this.runInterval();
    }

    draw() {
        //cleart das Canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        //ermöglicht es zu laufen. Unserer camera ausschnitt verschiebt sich um carera_x
        this.ctx.translate(this.camera_x, 0)
        //ab hier objekte ins canvas zeichnen
        this.drawToCanvasFromArray(this.level.backgroundObjects);
        this.drawToCanvasFromArray(this.level.clouds);
        this.drawToCanvasFromArray(this.level.bottles);
        this.drawToCanvasFromArray(this.throwableBottles);
        this.drawToCanvasFromArray(this.level.coins);
        this.drawToCanvas(this.character);
        this.drawToCanvasFromArray(this.level.enemies);
        this.drawToCanvas(this.endboss);
        // this.drawToCanvasFromArray(this.level.endboss); //new
        //part 2 der funktion zum laufen. setzt den cameraausschnitt wieder auf null
        this.ctx.translate(-this.camera_x, 0)
        this.drawToCanvas(this.statusbar);
        this.drawToCanvas(this.coinbar);
        this.drawToCanvas(this.bottlebar);
        //Draw wird immer wieder ausgeführt wenn die funktionen oberhalt fertig geladen sind. Das passiert so oft es die grafikkarte erlaubt 
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    runInterval() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowableBottles();
            this.checkForGameOver();
        }, 100);
    }

    checkCollisions() {
        this.checkEndboss();
        this.checkBottles();
        this.checkCoins();
        this.checkEnemies();
        this.checkBottleHitsEnemies();
        this.checkBottleHitEndboss();
    }

    checkForGameOver() {
        if (this.gameOver) {
            document.getElementById('outro-screen').classList.remove('d-none')
        }
    }

    checkBottleHitEndboss() {
        this.throwableBottles.forEach(bottle => {
            if (bottle.isColliding(this.endboss) && !this.endboss.hit) {
                this.endboss.endbossHit();
                this.endboss.hit = true;
                setTimeout(() => {
                    this.endboss.hit = false;
                }, 1000);
            }
        });
    }

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

    checkThrowableBottles() {
        if(this.keyboard.D && !this.keyboardPressed && this.bottlebar.bottles > 0) {
            this.keyboardPressed = true;
            this.throwableBottles.push(new Throwablebottle(this.character.x + 50, this.character.y +100, this));
            this.bottlebar.bottles --;
            this.bottlebar.updateBottlebar();
            this.character.lastMove = new Date().getTime();
        } else if (!this.keyboard.D) {
            this.keyboardPressed = false
        }
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