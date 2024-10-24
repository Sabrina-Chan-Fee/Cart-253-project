/**
 * speech speech
 * Sabrina Chan Fee
 * 
 * Interactive speech playing interface
 */

"use strict";

//speakc itself
const speech = ["Veni", "Vidi", "Vici", "Sensi malum."];
//index
let speechIndex = 0;

/**
 * OH LOOK I DIDN'T DESCRIBE SETUP!!
*/
function setup() {
    createCanvas(600, 100);
}


/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
*/
function draw() {
    background(0);
    let currentLine = speech[speechIndex];
    //display line
    push();
    fill(255);
    textSize(32);
    textAlign(CENTER, CENTER);
    text(currentLine, width / 2, height / 2);
    pop();
}

function mousePressed() {
    speechIndex++;
    if (speechIndex >= speech.length)
        speechIndex = 0;


}