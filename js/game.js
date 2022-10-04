let canvas;
let world;
intervalIds = [];

/**
 * Start game function. It gets the canvas, checkes for mobile devicec an initiates the level.
 * It creates the world and hitdes all the intro and outro elements.
 */
function init() {
    canvas = document.getElementById('canvas');
    checkForMobileDevice();
    initLevel();
    world = new World(canvas);
    document.getElementById('intro-screen').classList.add('d-none');
    document.getElementById('intro-text').classList.add('d-none');
    document.getElementById('outro-screen').classList.add('d-none');
}

/**
 * Showes the intro animation by changing the scale of the element.
 */
function introAnimation() {
    document.getElementById('intro-text').style = "font-size: 31px; margin-top: 20px";
    setTimeout(() => {
        document.getElementById('intro-text').style = "font-size: 28px; margin-top: 22px";
    }, 1000);
    setTimeout(() => {
        introAnimation()
    }, 2000);
}

/**
 * Toggles gamepad on and off.
 */
function toggleGamepad() {
    document.getElementById('mobile-gamepad').classList.toggle('opacity-zero');
    console.log("toggle")
}

/**
 * Check if user uses a mobile device and locks screen in landscape mode.
 */
function checkForMobileDevice() {
    if (window.innerWidth < 1000) {
        screen.orientation.lock('landscape');
    }
}




