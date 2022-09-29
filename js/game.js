let canvas;
let world;
let keyboard = new Keyboard();
intervalIds = [];


function init() {
    canvas = document.getElementById('canvas');
    checkForMobileDevice();
    initLevel();
    world = new World(canvas, keyboard);
    document.getElementById('intro-screen').classList.add('d-none');
    document.getElementById('intro-text').classList.add('d-none');
    document.getElementById('outro-screen').classList.add('d-none');
}

function introAnimation() {
    document.getElementById('intro-text').style = "font-size: 31px; margin-top: 20px";
    setTimeout(() => {
        document.getElementById('intro-text').style = "font-size: 28px; margin-top: 22px";
    }, 1000);
    setTimeout(() => {
        introAnimation()
    }, 2000);
}

function toggleGamepad() {
    document.getElementById('mobile-gamepad').classList.toggle('opacity-zero');
    console.log("toggle")
}

function checkForMobileDevice() {
    if (window.innerWidth < 1000) {
      screen.orientation.lock('landscape');
    }
  }

function restoreCanvasSize() {
    document.getElementById('canvas').classList.remove('canvasFullscreen')
}




