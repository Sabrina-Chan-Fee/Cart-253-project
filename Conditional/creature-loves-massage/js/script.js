/**
 * Creature Loves Massage
 * Pippin Barr
 * 
 * A creature that responds to mouse massage by changing colour
 */

"use strict";

// Our creature
const creature = {
    // Position
    x: 200,
    y: 200,
    // Size
    size: 200,
    // Fill
    fill: "#000000", // Starts out bored
    // Possible fills for the creature that show its mood
    // We'll need these when we start changing its colour
    // and its nice to keep them along with all the other info
    // about the creature
    fills: {
        bored: "#000000", // Black
        happy: "#33cc33", // Green
        angry: "#cc3333" // Red
    }
};

/**
 * Creates the canvas
 */
function setup() {
    createCanvas(400, 400);
}

/**
 * Fills the background, displays the creature 
 */
function draw() {
    background(255, 200, 127);

    checkInput();
    drawCreature();
}

/**
 * Responds to user input
 */
function checkInput() {
    //distance between the mouse and the center of the creature
    const distance = dist(mouseX, mouseY, creature.x, creature.y);
    //size of creature is in diameter so we divide by 2
    const mouseOverlapsCreature = (distance < creature.size / 2);
    const mouseIsMoving = (movedX !== 0 || movedY != 0);
    // Check if the mouse is pressed...
    if (mouseOverlapsCreature && mouseIsMoving) {
        // The mouse is pressed!
        // Change the colour of the creature to show it's happy
        // It likes the mouse! Squeak squeak!
        creature.fill = creature.fills.happy;
    }
    else {
        // The mouse isn't pressed and no key is pressed!
        // Change the colour of the creature to show it's bored
        creature.fill = creature.fills.bored;
    }
}

/**
 * Draws the creature
 */
function drawCreature() {
    push();
    noStroke();
    // Use the creature's fill
    fill(creature.fill);
    // Display the creature at its position and size
    ellipse(creature.x, creature.y, creature.size);
    pop();
}