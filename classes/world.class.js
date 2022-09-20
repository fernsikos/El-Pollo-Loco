class World {
    ctx;
    canvas;
    statusbar = new Statusbar();
    coinbar = new Coinbar();
    character = new Character();
    endboss = new Endboss();
    level = level1;
    keyboard;
    camera_x;


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.character.world = this;
        this.checkCollisionInterval();
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
        this.drawToCanvasFromArray(this.level.coins);
        this.drawToCanvas(this.character);
        this.drawToCanvasFromArray(this.level.enemies);
        this.drawToCanvas(this.endboss);
        //part 2 der funktion zum laufen. setzt den cameraausschnitt wieder auf null
        this.ctx.translate(-this.camera_x, 0)
        this.drawToCanvas(this.statusbar);
        this.drawToCanvas(this.coinbar);
        //Draw wird immer wieder ausgeführt wenn die funktionen oberhalt fertig geladen sind. Das passiert so oft es die grafikkarte erlaubt 
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    checkCollisionInterval() {
        setInterval(() => {
            let indexCoins = 0;
            // if(this.character.isColliding(this.endboss)) {
            //     this.character.hit();
            // }
            this.level.coins.forEach(coin => {
                if(this.character.isColliding(coin)) {
                    this.character.collectedCoin(coin, indexCoins);
                    this.level1.coins.splice(indexCoins, 1)
                }
                indexCoins++;
                console.log(indexCoins)
            });

            this.level.enemies.forEach(enemy => {
                if(this.character.isColliding(enemy)) {
                    this.character.hit();
                }
            });
        }, 400);
    }

    drawToCanvas(object) {
        if (object.imageMirrored) {
            this.flipImage(object);
        };
        object.draw(this.ctx);
        object.drawRectangles(this.ctx);
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
}