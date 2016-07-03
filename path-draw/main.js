(function () {
    let playing = false;

    document.addEventListener('DOMContentLoaded', init);

    function init() {
        let background = createCanvasLayer('background');
        let layer1     = createCanvasLayer('layer1');

        inheritDimensionsFromCSS('canvas');

        setupPlayButton();
    }

    function setupPlayButton() {
        let playButton = document.getElementById('play-button');
        let eval = () => {
            if (playing) {
                stop();

                playButton.textContent = 'Play';
                return;
            }

            play();
            playButton.textContent = 'Stop';
        };

        playButton.textContent = playing ? 'Stop': 'Play';

        playButton.addEventListener('click', eval);
    }

    function play() {
        playing = true;

        tick(() => {
            let rdm1 = Math.floor(Math.random() * 500);
            let rdm2 = Math.floor(Math.random() * 500);

            outline('layer1', [
                {x: rdm1,   y: rdm1},
                {x: rdm2, y: rdm1},
                {x: rdm2, y: rdm2},
                {x: rdm1,   y: rdm2}
            ]);
        });
    }

    function stop() {
        playing = false;
    }

    function tick(fn) {
        if (!playing) {
            return;
        }

        fn();

        requestAnimationFrame(() => tick(fn));
    }

    function outline(contextId, corners, color = 'red') {
        let context = document.getElementById(contextId).getContext('2d');

        context.strokeStyle = color;
        context.fillStyle   = 'red';

        context.beginPath();

        for (let j = 0; j < corners.length; ++j) {
            let nextCorner;
            let corner = corners[j];

            context.moveTo(corner.x, corner.y);

            if (j === corners.length - 1) {
                nextCorner = corners[0];

            } else {
                nextCorner = corners[j + 1];
            }

            context.lineTo(nextCorner.x, nextCorner.y);
        }

        context.closePath();

        context.stroke();
        context.fill();
    }

    function createCanvasLayer(layerId) {
        let context;
        let canvas = document.createElement('canvas');

        canvas.id = layerId;

        context = canvas.getContext('2d');

        document
            .getElementById('layer-container')
            .appendChild(canvas);

        return context;
    }

    function inheritDimensionsFromCSS(selector) {
        document.querySelectorAll(selector)
            .forEach((element) => {
                let style = window.getComputedStyle(element);

                element.setAttribute('width', parseInt(style.width, 10));
                element.setAttribute('height', parseInt(style.height, 10));
            });
    }
}());
