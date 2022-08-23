class World {
    ctx;
    canvas;
    character = new Character();
    keyboard;

    backgroundObjects = [
        new Background("img/5_background/layers/air.png", 0, 0),
        new Background("img/5_background/layers/3_third_layer/1.png", 0, 0),
        new Background("img/5_background/layers/2_second_layer/1.png", 0, 0),
        new Background("img/5_background/layers/1_first_layer/1.png", 0, 0),
    ];
    clouds = [
        new Cloud("img/5_background/layers/4_clouds/1.png", 10, 20),
    ]
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
    ]

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
        //ab hier objekte ins canvas zeichnen
        this.drawToCanvasFromArray(this.backgroundObjects);
        this.drawToCanvasFromArray(this.clouds);
        this.drawToCanvas(this.character);
        this.drawToCanvasFromArray(this.enemies);

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