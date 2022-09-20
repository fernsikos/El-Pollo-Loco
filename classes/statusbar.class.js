class Statusbar extends DrawableObject {
    IMAGES_STATUSBAR = [
        "img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png",
    ]

    x = 10;
    y = 10;
    height = 32;
    width = 120;
    healthStatus = 100;

    constructor() {
        super();
        this.loadImagesToCache(this.IMAGES_STATUSBAR);
        this.createImage("img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png");
    }

    syncronizeStatusbar(energy) {
        this.healthStatus = energy;
        this.updateStatusbar();
    }

    updateStatusbar() {
        if(this.healthStatus == 100) {
            this.createImage("img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png");
        } else if(this.healthStatus > 80) {
            this.createImage("img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png");
        } else if(this.healthStatus > 60) {
            this.createImage("img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png");
        } else if(this.healthStatus > 40) {
            this.createImage("img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png");
        } else if(this.healthStatus > 20) {
            this.createImage("img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png");
        } else if(this.healthStatus == 0) {
            this.createImage("img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png");
        }
    }
}