/**
 * Title of Project
 * Author Name
 * 
 * Draw a star field with for loop!
 */

"use strict";

const numStars = 100;

/**
 * OH LOOK I DIDN'T DESCRIBE SETUP!!
*/
function setup() {
    createCanvas(400, 400);

}


/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
*/
function draw() {
    background(0);

    randomSeed(1);
    for (let i = 0; i < numStars; i++) {
        drawStar();
    }

}

function drawStar() {
    const x = random(0, width);
    const y = random(0, height);
    const diameter = random(0, 2);

    push();
    fill(255);
    noStroke();
    ellipse(x, y, diameter);
    pop();
}