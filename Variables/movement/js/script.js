/**
 * Title of Project
 * Author Name
 * 
 * HOW EMBARRASSING! I HAVE NO DESCRIPTION OF MY PROJECT!
 * PLEASE REMOVE A GRADE FROM MY WORK IF IT'S GRADED!
 */

"use strict";
let bird = {
    x: 120,
    y: 480,
    size: 50,
    velocity: {
        x: 0,
        y: 0,
    },
    minVelocity: {
        x: -3,
        y: -2,
    },
    maxVelocity: {
        x: 3,
        y: 2,
    },
    accelaration: {
        x: 0.025,
        y: -0.05,
    },
}
/**
 * OH LOOK I DIDN'T DESCRIBE SETUP!!
*/
function setup() {
    createCanvas(640, 480);
}


/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
*/
function draw() {
    background(0);

    // Move the bird
    bird.velocity.x += bird.accelaration.x;
    bird.velocity.y += bird.accelaration.y;

    bird.velocity.x = constrain(bird.velocity.x, bird.minVelocity.x, bird.maxVelocity.x);
    bird.velocity.y = constrain(bird.velocity.y, bird.minVelocity.y, bird.maxVelocity.y);

    bird.x = bird.x + bird.velocity.x;
    bird.y = bird.y + bird.velocity.y;

    // Draw the bird
    push();
    ellipse(bird.x, bird.y, bird.size);
    pop();
}