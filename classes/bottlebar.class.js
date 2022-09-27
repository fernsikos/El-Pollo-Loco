class Bottlebar extends DrawableObject {
    IMAGE_BOTTLEBAR = [
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png",
    ]

    x = 10;
    y = 70;
    height = 32;
    width = 120;
    bottles = 0;
    

    constructor() {
        super();
        this.createImage("img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png")
    }

    updateBottles() {
        this.addBottle();
        this.updateBottlebar();
    }

    removeBottle() {
        this.bottles --;
    }

    addBottle() {
        this.bottles++;
    }

    updateBottlebar() {
        if(this.bottles === 10) {
            this.createImage("img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png");
        } else  if(this.bottles > 8) {
            this.createImage("img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png");
        } else if(this.bottles > 6) {
            this.createImage("img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png");
        } else if(this.bottles > 4) {
            this.createImage("img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png");
        } else if(this.bottles > 2) {
            this.createImage("img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png");
        } else if(this.bottles < 2) {
            this.createImage("img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png");
        }
    }
}