/**
 * Mr. Furious
 * Pippin Barr
 *
 * A guy who becomes visibly furious!
 */

"use strict";

// Our friend Mr. Furious
let mrFurious = {
    // Position and size
    x: 200,
    y: 200,
    size: 100,
    // Colour
    fill: {
        r: 255,
        g: 225,
        b: 225
    },
    shakeAmount: 0,
};

let skyColor = {
    fill: {
        r: 173,
        g: 216,
        b: 250,
    }
};
// let skyColor = ('blue');

let bird = {
    x: 0,
    y: 100,
    size: 10,
    speed: 0.25,
};

/**
 * Create the canvas
 */
function setup() {
    createCanvas(400, 400);
}

/**
 * Draw (and update) Mr. Furious
 */
function draw() {

    background(skyColor.fill.r, skyColor.fill.g, skyColor.fill.b);
    skyColor.fill.r -= 0.3;
    skyColor.fill.g -= 0.3;
    skyColor.fill.b -= 0.3;

    skyColor.fill.g = constrain(skyColor.fill.g, 0, 255);
    skyColor.fill.b = constrain(skyColor.fill.b, 0, 255);
    skyColor.fill.b = constrain(skyColor.fill.b, 0, 255);

    // skyColor.b -= 5;
    // Draw Mr. Furious as a coloured circle
    push();
    noStroke();
    fill(mrFurious.fill.r, mrFurious.fill.g, mrFurious.fill.b);
    mrFurious.fill.r += 0.3;
    mrFurious.fill.g -= 0.3;
    mrFurious.fill.b -= 0.3;

    mrFurious.fill.g = constrain(mrFurious.fill.g, 0, 255);
    mrFurious.fill.b = constrain(mrFurious.fill.b, 0, 255);


    mrFurious.shakeAmount += 0.01;
    mrFurious.shakeAmount = constrain(mrFurious.shakeAmount, 0, 10);
    const x = mrFurious.x + random(-mrFurious.shakeAmount, mrFurious.shakeAmount);
    const y = mrFurious.x + random(-mrFurious.shakeAmount, mrFurious.shakeAmount);

    ellipse(x, y, mrFurious.size);
    pop();

    //move bird (best to but the math here)
    bird.x += bird.speed;
    bird.y += bird.speed;

    bird.x = constrain(bird.x, 0, 400);
    bird.y = constrain(bird.y, 0, 350);


    //bird
    push();
    noStroke();
    fill("red");
    rectMode(CENTER);
    rect(bird.x, bird.y, bird.size, bird.size);
    pop();
}