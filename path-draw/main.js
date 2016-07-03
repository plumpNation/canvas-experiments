(function () {
    let playing = false;
    let previousPoint;

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

            drawLine('layer1', {x: rdm1,   y: rdm2});
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

    function drawLine(contextId, point, color = 'red') {
        let context = document.getElementById(contextId).getContext('2d');

        if (!previousPoint) {
            previousPoint = {
                'x': 0,
                'y': 0
            };
        }

        context.strokeStyle = color;
        context.lineWidth   = '1';

        context.beginPath();
        context.moveTo(previousPoint.x, previousPoint.y);
        context.lineTo(point.x, point.y);
        context.stroke();

        previousPoint = point;
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
