class Bottle extends DrawableObject {
    IMAGES_BOTTLE = [
        "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
        "img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
    ];

    height = 50;
    width = 50;
    x;
    y = 370;
    randomImage = Math.round(Math.random());
    offset = {
        top: 10,
        bottom: 10,
        right: 20,
        left: 20,
    }

    constructor(x) {
        super();
        this.createImage(this.IMAGES_BOTTLE[this.randomImage]);
        this.x = x;
    }
}