/**
 * Buzzy the return value
 * Pippin Barr
 * 
 * Two flies that buzz around on the canvas
 */

"use strict";


let buzzyTheFly = undefined;
let jazzyTheFly = undefined;
/**
 * Create a canvas
 */
function setup() {
    createCanvas(400, 400);
    buzzyTheFly = createFly(3);
    jazzyTheFly = createFly(10);
}


function createFly(buzziness) {
    let fly = {
        x: random(100, width - 100),
        y: random(100, height - 100),
        size: 20,
        buzziness: buzziness,
    };
    return fly;
}
/**
 * Background, move and draw buzzy
 */
function draw() {
    background("#87ceeb");

    moveFly(buzzyTheFly);
    moveFly(jazzyTheFly);

    drawFly(buzzyTheFly);
    drawFly(jazzyTheFly);
}

/**
 * Move the fly passed in by updating its position
 */
function moveFly(fly) {
    fly.x += random(-fly.buzziness, fly.buzziness);
    fly.y += random(-fly.buzziness, fly.buzziness);
}

/**
 * Draw the fly passed in using its properties
 */
function drawFly(fly) {
    push();
    noStroke();
    fill(0);
    ellipse(fly.x, fly.y, fly.size);
    pop();
}