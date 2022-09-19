class World {
    ctx;
    canvas;
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

        //Draw wird immer wieder ausgeführt wenn die funktionen oberhalt fertig geladen sind. Das passiert so oft es die grafikkarte erlaubt 
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }


    drawToCanvas(object) {
        if (object.imageMirrored) {
            this.ctx.save();
            this.ctx.translate(object.width, 0);
            this.ctx.scale(-1, 1)
            object.x = object.x * -1;
        };
        this.ctx.drawImage(object.img, object.x, object.y, object.width, object.height);
        if (object.imageMirrored) {
            this.ctx.restore();
            object.x = object.x * -1;
        }
    }

    drawToCanvasFromArray(array) {
        array.forEach(element => {
            this.drawToCanvas(element)
        });
    }
}