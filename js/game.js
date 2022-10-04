let canvas;
let world;
intervalIds = [];

/**
 * Start game function. It gets the canvas, checkes for mobile devicec an initiates the level.
 * It creates the world and hitdes all the intro and outro elements.
 */
function init() {
    canvas = document.getElementById('canvas');
    initLevel();
    world = new World(canvas);
    document.getElementById('intro-screen').classList.add('d-none');
    document.getElementById('intro-text').classList.add('d-none');
    document.getElementById('outro-screen-game-over').classList.add('d-none');
    document.getElementById('outro-screen-you-lost').classList.add('d-none');
    document.getElementById('help-section-container').classList.add('opacity-zero');
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
}

function toggleHelpSection() {
    document.getElementById('help-section-container').classList.toggle('opacity-zero');
}

