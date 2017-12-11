/**
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Drawing_DOM_objects_into_a_canvas
 */

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

const data = `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}">
    <foreignObject
        width="100%"
        height="100%">
        <div xmlns="http://www.w3.org/1999/xhtml">
            <h1>Lorem Ipsum</h1>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
        </div>
    </foreignObject>
</svg>`;

const img = new Image();
const svg = new Blob([data], {type: 'image/svg+xml'});
const url = window.URL.createObjectURL(svg);

const canvas = document.createElement('canvas');
canvas.width = WIDTH;
canvas.height = HEIGHT;

const context = canvas.getContext('2d');

img.onload = function() {
    context.drawImage(img, 0, 0);
    window.URL.revokeObjectURL(url);
};

img.src = url;

document.body.appendChild(canvas);
