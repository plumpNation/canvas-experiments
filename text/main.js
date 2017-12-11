const fontSize = 20;
const message = 'I am a label and there are more things to say';

const canvas = document.createElement('canvas');
canvas.width = canvas.height = 200;

const context = canvas.getContext('2d');

// set up the font
context.font = fontSize + 'px Arial';
// so we can measure the text
const messageSize = context.measureText(message);
// and make the canvas match the area we actually need
canvas.width = canvas.height = messageSize.width;

// we've resized the canvas, and now we have to re set the font.
context.font = fontSize + 'px Arial';

context.fillStyle = 'black';
context.fillRect(0, 0, canvas.width, canvas.height);

context.fillStyle = 'white';
context.fillText(message, 0, fontSize);

document.body.appendChild(canvas);
