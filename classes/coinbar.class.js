class Coinbar extends DrawableObject {
    IMAGES_COINBAR = [
        "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png",
    ]

    x = 10;
    y = 40;
    height = 32;
    width = 120;
    coins = 0;


    constructor() {
        super();
        this.createImage("img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png");
    }

    updateCoins() {
        this.coins++ ;
        this.coinHealthBonus++;
        this.updateCoinbar();
        
    }

    updateCoinbar() {
        if(this.coins === 16) {
            this.createImage("img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png");
        } else if(this.coins > 12) {
            this.createImage("img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png");
        } else if(this.coins > 9) {
            this.createImage("img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png");
        } else if(this.coins > 6) {
            this.createImage("img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png");
        } else if(this.coins > 3) {
            this.createImage("img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png");
        } 
    }
}