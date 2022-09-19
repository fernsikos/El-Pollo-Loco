class Coin extends Moveableobject {
    IMAGES_COINS = [
        "img/8_coin/coin_1.png",
        "img/8_coin/coin_2.png",
    ];

    height = 80;
    width = 80;
    x;
    y;

    constructor(x, y) {
        super();
        this.loadImagesToCache(this.IMAGES_COINS);
        this.x = x;
        this.y = y;
        this.createImage("img/8_coin/coin_1.png");
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COINS);
        }, 250);
    }
}