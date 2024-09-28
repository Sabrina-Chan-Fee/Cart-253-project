/**
 *Plain javascript
 *Sabrina Chan Fee
 experiment with event handling with plain javascript
 * !
 */

"use strict";
// The background colour
const bg = {
    fill: "#000000",
    fills: {
        black: "#000000",
        white: "#ffffff",
    },
    switchKey: 32 // Space bar
}

/**
 * Create the canvas and set up event listener
*/
function setup() {
    createCanvas(400, 400);
    //listen for key press
    window.addEventListener("keydown", changeBg);
}


/**
 * Fill the canvas
*/
function draw() {
    background(bg.fill);
}
/**
 * The event handler: Switch the background
 */
function changeBg(event) {
    // / Use event.keyCode to check if they pressed the switching key...
    if (event.keyCode === bg.switchKey) {
        if (bg.fill === bg.fills.black) {
            bg.fill = bg.fills.white;
        }
        else {
            bg.fill = bg.fills.black;
        }
    }
}