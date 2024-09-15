/**
 * variable intro
 * Sabrina Chan Fee
 * 
 *  
 */

"use strict";

/**
 * OH LOOK I DIDN'T DESCRIBE SETUP!!
*/
function setup() {
    createCanvas(100, 480);
}


/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
*/
function draw() {
    background(0);

    //draw circle
    push();
    fill(255, 255, 0);
    noStroke();
    // ellipse(width / 2, height / 2, 100, 100);
    ellipse(mouseX, mouseY, 100, 100);

    pop();
}