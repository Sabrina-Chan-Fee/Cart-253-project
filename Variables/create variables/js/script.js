/**
 * create variable
 * Sabrina Chan Fee 
 * 
 * intro to varibale , creat a variable
 */

"use strict";

let holeSize = 180;

/**
 * OH LOOK I DIDN'T DESCRIBE SETUP!!
*/
function setup() {
    createCanvas(480, 480);
}


/**
draw hole in a piece of chees*/
function draw() {

    background(255, 255, 0);

    //chees
    push();
    noStroke();

    fill(0);
    ellipse(140, 175, holeSize);
    pop();
}