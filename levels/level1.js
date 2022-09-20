const level1 = new Level(
    backgroundObjects = [
        new Background('img/5_background/layers/air.png', -720, 0),
        new Background('img/5_background/layers/3_third_layer/2.png', -720, 0),
        new Background('img/5_background/layers/2_second_layer/2.png', -720, 0),
        new Background('img/5_background/layers/1_first_layer/2.png', -720, 0),

        new Background("img/5_background/layers/air.png", 0, 0),
        new Background("img/5_background/layers/3_third_layer/1.png", 0, 0),
        new Background("img/5_background/layers/2_second_layer/1.png", 0, 0),
        new Background("img/5_background/layers/1_first_layer/1.png", 0, 0),

        new Background('img/5_background/layers/air.png', 720, 0),
        new Background('img/5_background/layers/3_third_layer/2.png', 720, 0),
        new Background('img/5_background/layers/2_second_layer/2.png', 720, 0),
        new Background('img/5_background/layers/1_first_layer/2.png', 720, 0),

        new Background("img/5_background/layers/air.png", 1440, 0),
        new Background("img/5_background/layers/3_third_layer/1.png", 1440, 0),
        new Background("img/5_background/layers/2_second_layer/1.png", 1440, 0),
        new Background("img/5_background/layers/1_first_layer/1.png", 1440, 0),

        new Background('img/5_background/layers/air.png', 2160, 0),
        new Background('img/5_background/layers/3_third_layer/2.png', 2160, 0),
        new Background('img/5_background/layers/2_second_layer/2.png', 2160, 0),
        new Background('img/5_background/layers/1_first_layer/2.png', 2160, 0),

        new Background("img/5_background/layers/air.png", 2880, 0),
        new Background("img/5_background/layers/3_third_layer/1.png", 2880, 0),
        new Background("img/5_background/layers/2_second_layer/1.png", 2880, 0),
        new Background("img/5_background/layers/1_first_layer/1.png", 2880, 0),

        new Background('img/5_background/layers/air.png', 3600, 0),
        new Background('img/5_background/layers/3_third_layer/2.png', 3600, 0),
        new Background('img/5_background/layers/2_second_layer/2.png', 3600, 0),
        new Background('img/5_background/layers/1_first_layer/2.png', 3600, 0),
    ],
    clouds = [
        new Cloud("img/5_background/layers/4_clouds/1.png", 10, 20),
        new Cloud("img/5_background/layers/4_clouds/1.png", 730, 30),
        new Cloud("img/5_background/layers/4_clouds/1.png", 1450, 20),
        new Cloud("img/5_background/layers/4_clouds/1.png", 2170, 40),
        new Cloud("img/5_background/layers/4_clouds/1.png", 2880, 20),
        new Cloud("img/5_background/layers/4_clouds/1.png", 3600, 30),
        new Cloud("img/5_background/layers/4_clouds/1.png", -710, 20),
    ],
    enemies = [
        new ChickenSmall(400),
        new Chicken(450),
        new Chicken(800),
        new ChickenSmall(1000),
        // new ChickenSmall(1100),
        new Chicken(1400),
        new Chicken(1800),
        new ChickenSmall(1000),
        new Chicken(2400),
        new Chicken(2600),
        new Chicken(2800),
        new ChickenSmall(3000),
    ],

    bottles = [
        new Bottle(600),
        new Bottle(900),
        new Bottle(1000),
        new Bottle(1200),
        new Bottle(1500),
        new Bottle(1800),
        new Bottle(2000),
        new Bottle(2190),
        new Bottle(2300),
        new Bottle(2500),
    ],

    coins = [
        //Arrow
        new Coin(520, 333),
        new Coin(550, 310),
        new Coin(585, 300),
        new Coin(620, 310),
        new Coin(650, 333),
        //Horizontal
        new Coin(1000, 355),
        new Coin(1040, 355),
        new Coin(1080, 355),
        new Coin(1120, 355),
        new Coin(1160, 355),
        new Coin(1200, 355),
        //Vertical
        new Coin(2000, 355),
        new Coin(2000, 315),
        new Coin(2000, 275),
        new Coin(2000, 235),
        new Coin(2000, 195),
    ],

    endboss = [
        new Endboss(3200) //New
    ]
);