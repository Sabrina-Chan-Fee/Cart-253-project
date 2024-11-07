/**
 * Tarot
 * Pippin Barr
 * 
 * Some experiments with data representing a Tarot deck
 */

"use strict";

//out tarot data
let tarot = undefined;
let fortune = "click for a fortune";

/**
 * Load tarot dat
 */
function preload() {
    tarot = loadJSON("assets/data/tarot_interpretations.json");
}


/**
 * create canvas
*/
function setup() {
    createCanvas(800, 400);
}


/**
 * display tarot
*/
function draw() {
    background(0);

    //display the information
    push();
    textSize(16);
    fill("yellow");
    textAlign(CENTER, CENTER);
    text(fortune, width / 2, height / 2);
    pop();
}

function mousePressed() {
    // Choose a random card
    let card = random(tarot.tarot_interpretations);
    // Choose a random fortune
    fortune = random(card.fortune_telling);

}