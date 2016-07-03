(function () {
    document.addEventListener('DOMContentLoaded', init);

    let webcamFeed;
    let webcamDisplay;

    function init() {
        setupWebcam();
        setupWebcamDisplay();
    }

    function setupWebcam() {
        let webCamOptions = {
            // 'audio': true,
            'video': {
                'width': 320,
                'height': 240
            }
        };

        navigator.getUserMedia =
            navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia;

        if (!navigator.getUserMedia) {
            alert('Webcam not supported');
        }

        navigator.getUserMedia(webCamOptions, onStream, onError);
    }

    function setupWebcamDisplay() {
        let webcamCanvas = document.getElementById('webcam-output');

        webcamDisplay = webcamCanvas.getContext('2d');
    }

    function onStream(stream) {
        webcamFeed = document.getElementById('webcam-stream');

        webcamFeed.src = window.URL.createObjectURL(stream);

        webcamFeed.onloadedmetadata = () => {
            webcamFeed.play();
            tick();
        };
    }

    function tick() {
        webcamDisplay.drawImage(webcamFeed, 0, 0, webcamFeed.width, webcamFeed.height);

        requestAnimationFrame(() => tick());
    }

    function onError(error) {
        console.error('The following error occurred: ', error.name);
    }
}());
