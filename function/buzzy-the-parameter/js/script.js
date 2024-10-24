/**
 * Buzzy the parameter
 * Pippin Barr
 * 
 * A fly that buzzes around on the canvas
 */

"use strict";

// Our fly that will buzz around
let buzzyTheFly = {
    x: 200,
    y: 200,
    size: 30,
    buzziness: 4
};
let jazzyTheFly = {
    x: 200,
    y: 250,
    size: 30,
    buzziness: 10
};
/**
 * Create a canvas
 */
function setup() {
    createCanvas(400, 400);
}
function draw() {
    background("#87ceeb");

    moveFly(buzzyTheFly);
    drawFly(buzzyTheFly);

    moveFly(jazzyTheFly);
    drawFly(jazzyTheFly);
}

function moveFly(fly) {
    // Move buzzy
    fly.x += random(-fly.buzziness, fly.buzziness);
    fly.y += random(-fly.buzziness, fly.buzziness);

}
/**
 * Background, move and draw buzzy
 */
function drawFly(fly) {


    // Draw buzzy
    push();
    noStroke();
    fill(0);
    ellipse(fly.x, fly.y, fly.size);
    pop();
}

