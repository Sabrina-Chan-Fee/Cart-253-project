/**
 * gradient
 * Sabrina Chan Fee
 * 
 * Draw a gradient
 */

"use strict";

const numStars = 100;

/**
 * create canvass
*/
function setup() {
    createCanvas(600, 300);

}


/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
*/
function draw() {
    background(0);


    for (let x = 0; x <= width; x++) {
        const shade = map(x, 0, width, 0, 255);
        push();
        stroke(shade);
        line(x, 0, x, height);
        pop();
    }

}

