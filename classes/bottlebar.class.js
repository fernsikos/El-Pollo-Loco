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

    /**
     * Increases the number of bottles by 1 and updates the bottle bar.
     */
    updateBottles() {
        this.addBottle();
        this.updateBottlebar();
    }

    /**
     * Reduces the number of bottle by 1.
     */
    removeBottle() {
        this.bottles--;
    }

    /**
     * Increases the number of bottles by 1.
     */
    addBottle() {
        this.bottles++;
    }

    /**
      * Updates the bottlebar with the right pictures in relation to the number of bottles.
      */
    updateBottlebar() {
        if (this.bottles === 10) {
            this.createImage("img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png");
        } else if (this.bottles > 8) {
            this.createImage("img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png");
        } else if (this.bottles > 6) {
            this.createImage("img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png");
        } else if (this.bottles > 4) {
            this.createImage("img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png");
        } else if (this.bottles > 2) {
            this.createImage("img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png");
        } else if (this.bottles < 2) {
            this.createImage("img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png");
        }
    }
}