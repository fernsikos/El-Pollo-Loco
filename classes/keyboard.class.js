class Keyboard {
    UP;
    DOWN;
    LEFT;
    RIGHT;
    SPACE;
    D;
    PRESSED;
    TOUCHED;

    constructor() {
        this.keyboardEvents();
        this.touchEvents();
    }

    /**
     * Eventlistener for touch inputs.
     */
    touchEvents() {
        document.getElementById('btn-up').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.SPACE = true;
        });

        document.getElementById('btn-up').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.SPACE = false;
        });

        document.getElementById('btn-left').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.LEFT = true;
        });

        document.getElementById('btn-left').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.LEFT = false;
        });

        document.getElementById('btn-right').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.RIGHT = true;
        });

        document.getElementById('btn-right').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.RIGHT = false;
        });

        document.getElementById('btn-bottle').addEventListener('touchstart', (e) => {
            e.preventDefault();
            if (!this.TOUCHED)
            this.D = true;
            this.TOUCHED = true;
            setTimeout(() => {
                this.D = false;
            }, 100);
        });

        document.getElementById('btn-bottle').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.D = false;
            this.TOUCHED = false;
        });
    }

    /**
     * Eventlistener for keypress inputs.
     */
    keyboardEvents() {
        window.addEventListener('keydown', (event) => {
            if (event.keyCode == 37) {
                this.LEFT = true;
            }

            if (event.keyCode == 38) {
                this.UP = true;
            }

            if (event.keyCode == 39) {
                this.RIGHT = true;
            }

            if (event.keyCode == 40) {
                this.DOWN = true;
            }

            if (event.keyCode == 32) {
                this.SPACE = true;
            }
            if (event.keyCode == 68 && !this.PRESSED) {
                this.D = true;
                this.PRESSED = true;
                setTimeout(() => {
                    this.D = false;
                }, 100);
            }
        });

        /**
         * Eventlistener for keyup inputs.
         */
        window.addEventListener('keyup', (event) => {
            if (event.keyCode == 37) {
                this.LEFT = false;
            }

            if (event.keyCode == 38) {
                this.UP = false;
            }

            if (event.keyCode == 39) {
                this.RIGHT = false;
            }

            if (event.keyCode == 40) {
                this.DOWN = false;
            }

            if (event.keyCode == 32) {
                this.SPACE = false;
            }

            if (event.keyCode == 68) {
                this.D = false;
                this.PRESSED = false;
            }
        })
    }
}