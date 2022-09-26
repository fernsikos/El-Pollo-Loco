let canvas;
let world;
let keyboard = new Keyboard();


function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    // document.getElementById('intro-screen').classList.add('d-none');
}

// function introAnimation() {
//     document.getElementById('intro-text').style = "transform: scale(1.2)";
//     setTimeout(() => {
//         document.getElementById('intro-text').style = "transform: scale(1.0)";
//     }, 1000);
//     setTimeout(() => {
//         introAnimation()
//     }, 2000);
// }

function fullscreen() {
    let fullscreen = document.getElementById('fullscreen');
    openFullscreen(fullscreen);
}

/* View in fullscreen */
function openFullscreen(elem) {
    document.getElementById('canvas').classList.add('canvasFullscreen')
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
    }
}

/* Close fullscreen */
function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
        restoreCanvasSize();
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
        restoreCanvasSize();
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
        restoreCanvasSize();
    }
}

function restoreCanvasSize() {
    document.getElementById('canvas').classList.remove('canvasFullscreen')
}

window.addEventListener('keydown', (event) => {
    if (event.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if (event.keyCode == 38) {
        keyboard.UP = true;
    }

    if (event.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if (event.keyCode == 40) {
        keyboard.DOWN = true;
    }

    if (event.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (event.keyCode == 68) {
        keyboard.D = true;
    }
});

window.addEventListener('keyup', (event) => {
    if (event.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if (event.keyCode == 38) {
        keyboard.UP = false;
    }

    if (event.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if (event.keyCode == 40) {
        keyboard.DOWN = false;
    }

    if (event.keyCode == 32) {
        keyboard.SPACE = false;
    }

    if (event.keyCode == 68) {
        keyboard.D = false;
    }
})