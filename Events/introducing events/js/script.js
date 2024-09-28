/**
 * Intro to events
 * Sabrina Chan Fe
 * 
 * Taking a look at how events work in javascrip and p5
 * 
 */

"use strict";

/**
 *Creates the canvas
*/
function setup() {
    createCanvas(400, 400);
}


/**
 * Does nothing
*/
function draw() {

}

/**
 * The mousePressed() function is AUTOMATICALLY CALLED BY p5
 * whenever the mouse button is pressed down! Handy!
 */
function mousePressed() {
    // Draw an ellipse on the canvas when the mouse is pressed down
    push();
    noStroke();
    fill(255, 255, 0);
    ellipse(mouseX, mouseY, 50);
    pop();
}