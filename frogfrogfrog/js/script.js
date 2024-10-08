/**
 * fogfrogfrog
 * Pippin Barr
 * 
 * A game of catching flies with your frog-arrow
 * 
 * Instructions:
 * - Move the frog with your mouse
 * - Click to launch the arrow
 * - Catch flies
 * 
 * Made with p5
 * https://p5js.org/
 */

"use strict";

// Our bow
const bow = {
    // The bow's body has a position and size
    body: {
        x: 320,
        y: 520,
        size: 150
    },
    // The bow's arrow has a position, size, speed, and state
    arrow: {
        x: undefined,
        y: 480,
        size: 20,
        speed: 20,
        // Determines how the arrow moves each frame
        state: "idle" // State can be: idle, outbound, inbound
    },

};

// Flower target worth 1 point
// Has a position, size, and speed of horizontal movement
const flower = {
    x: 0,
    y: 200, // Will be random
    size: 10,
    speed: 3
};

//flying golden disk target worth 2 point
const goldDisk = {
    x: 0,
    y: 200, // Will be random
    size: 20,
    speed: 1,
};

//current score
let score = 0;
//current score
let state = "title"; //can be game or title

//number of arrows left
let arrowNumber = 5; //can be game or title

/**
 * Creates the canvas and initializes the flower
 */
function setup() {
    createCanvas(640, 480);

    // Give the flower its first random position
    resetFlower();
    resetGoldDisk();
}

function draw() {

    if (state === "title")
        title();
    else if (state === "game" && arrowNumber != 0)
        game();
    else if (state = "end")
        end();
}

function title() {
    background("pink");
    text("FOnrgFrongFrong", 100, 100);
}

function end() {
    background("pink");
    text("END", 100, 100);
}

function game() {
    background("#87ceeb");

    moveTargets();
    moveBow();
    moveArrow();

    checkArrowFlowerOverlap();
    checkArrowDiskOverlap();

    drawBow();
    drawFlower();
    drawScore();
    drawArrowScore();
    drawGoldDisk();
}



/**
 * Handles moving the Arrow based on its state
 */
function moveArrow() {
    // Arrow matches the bow's x
    bow.arrow.x = bow.body.x;
    // If the arrow is idle, it doesn't do anything
    if (bow.arrow.state === "idle") {
        // Do nothing
    }
    // move arrow up
    else if (bow.arrow.state === "outbound") {
        bow.arrow.y += -bow.arrow.speed;
        // The arrow bounces back if it hits the top
        if (bow.arrow.y <= 0) {
            bow.arrow.state = "inbound";
            arrowNumber--;
            //set to endcard when player runs out of arrows
            if (arrowNumber === 0) {
                state = "end";
            }
        }
    }
    // If the arrow is inbound, reset arrow at the bottom
    else if (bow.arrow.state === "inbound") {
        resetArrow();
        bow.arrow.state = "idle";
    }
}

/**
 * Handles the arrow overlapping the flower
 */
function checkArrowFlowerOverlap() {
    // Get distance from arrow to Flower
    const d = dist(bow.arrow.x, bow.arrow.y, flower.x, flower.y);
    // Check if it's an overlap
    const hitFlower = (d < bow.arrow.size / 2 + flower.size / 2);

    if (hitFlower) {
        //increase score by 1
        score++;
        // Reset the Flower
        resetFlower();
        // Bring back the arrow
        bow.arrow.state = "inbound";
    }
}

/**
 * Handles the arrow overlapping the disk
 */
function checkArrowDiskOverlap() {
    // Get distance from arrow to Flower
    const dg = dist(bow.arrow.x, bow.arrow.y, goldDisk.x, goldDisk.y);

    // Check if it's an overlap
    const hitGoldDisk = (dg < bow.arrow.size / 2 + goldDisk.size / 2);

    if (hitGoldDisk) {
        //increase score by 2
        score += 2;
        // Reset the disk
        resetGoldDisk();
        // Bring back the arrow
        bow.arrow.state = "inbound";
    }
}

/**
 * Launch the arrow on click (if it's not launched yet)
 */
function mousePressed() {
    if (state === "title") {
        state = "game";
    }
    else if (state === "game") {
        if (bow.arrow.state === "idle") {
            bow.arrow.state = "outbound";
        }
    }

}

/**
 * Moves the Flower according to its speed
 * Resets the Flower if it gets all the way to the right
 */
function moveTargets() {
    // Move the Flower
    flower.x += flower.speed;
    flower.y = 400 * noise(1000, 0.005 * frameCount + 20000);

    // Move the Disk
    goldDisk.x += goldDisk.speed;
    goldDisk.y = 400 * noise(100, 0.005 * frameCount + 2000);

    // Handle the flower going off the canvas
    if (flower.x > width) {
        resetFlower();
    } else if (goldDisk.x > width) {// Handle the disk going off the canvas
        resetGoldDisk();
    }
}

/**
 * Resets the flower to the left 
 */
function resetFlower() {
    flower.x = 0;
    flower.y = 400 * noise(1000, 0.005 * frameCount + 20000);
}

/**
 * Resets the golden disk to the left 
 */
function resetGoldDisk() {
    goldDisk.x = 0;
    goldDisk.y = 400 * noise(1000, 0.005 * frameCount + 20000);
}

/**
 * Reset the arrow to the mouse position on x
 */
function resetArrow() {
    bow.arrow.x = bow.body.x;
    bow.arrow.y = 480;
}

/**
 * Moves the arrow to the mouse position on x
 */
function moveBow() {
    bow.body.x = mouseX;
}

/**
 * Displays the score
 */
function drawScore() {
    push();
    textAlign(RIGHT, TOP);
    textSize(128);
    fill("pink");
    textStyle(BOLD);
    text(score, width, 20);
    pop();
}

/**
 * Displays the number of arrows left
 */
function drawArrowScore() {
    push();
    textAlign(LEFT, TOP);
    textSize(128);
    fill("pink");
    textStyle(BOLD);
    text(arrowNumber, 0, 20);
    pop();
}

/**
 * Draws the flying golden disk
 */

function drawGoldDisk() {
    push();
    noStroke();
    fill("yellow");
    ellipse(goldDisk.x, goldDisk.y, goldDisk.size);
    pop();
}

/**
 * Displays the target flower
 */
function drawFlower() {
    push();
    noStroke();
    fill("pink");
    ellipse(flower.x, flower.y, flower.size);
    pop();
}

/**
 * Displays the arrow (tip and line connection) and the bow (body)
 */
function drawBow() {

    // Draw the arrow
    push();
    stroke("brown");
    strokeWeight(bow.arrow.size);
    line(bow.arrow.x, bow.arrow.y, bow.arrow.x, bow.arrow.y + 100);//arrow size of 100
    pop();

}