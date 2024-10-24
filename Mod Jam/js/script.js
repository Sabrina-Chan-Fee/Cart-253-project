/**
 * Archery game
 * Sabrina Chan Fee
 * 
 * A game of launchign arrow at flowers and flying golden disk
 * 
 * Instructions:
 * - Move the arrow with left anf right key
 * - Click pace bar to launch the arrow
 * - if player misses they shot they lose an arrow. player has 5 arrow in total
 * 
 * Made with p5
 * https://p5js.org/
 * Base template by Pipin Barr
 */

"use strict";

//Arrow
const arrow = {
    // The arrow has a position, size, speed, and state
    x: 320,
    y: 460,
    size: 10,
    speed: 20,
    // Determines how the arrow moves each frame
    state: "idle" // State can be: idle, outbound, inbound

};

// Flower target worth 1 point
// Has a position, size, and speed of horizontal movement
const flower = {
    x: 0,
    y: 200,
    size: 13,
    speed: 1
};

//flying golden disk target worth 2 point
// Has a position, size, and speed of horizontal movement
const goldDisk = {
    x: 0,
    y: 200,
    size: 15,
    speed: 0.5,
};

//current score
let score = 0;
//current state of the game
let state = "title"; //can be game or title or end

//number of arrows left in the game
let arrowNumber = 5;

/**
 * Creates the canvas and initializes the flower
 */
function setup() {
    createCanvas(640, 480);

    // Give the flower/disk its first random position
    resetFlower();
    resetGoldDisk();
}
/**
 * Displays the title page
 */
function title() {
    //game title
    push();
    textAlign(CENTER, BASELINE);
    textSize(30);
    background("pink");
    fill("black");
    textStyle(BOLD);
    text("Archery Game!", 320, 150);
    pop();

    //instruction on how to start
    push();
    textAlign(CENTER, BASELINE);
    textSize(20);
    text("(press \"s\" to start!)", 320, 190);
    pop();

    //rules display and points system
    push();
    textAlign(CENTER, BASELINE);
    textSize(20);
    text("\nUse arrow key to move arrow\nUse spacebar to shoot arrow\nLose 1 arrow for every missed shot!\n\nPink flower: 1 point\n Golden Disk: 2 point", 320, 220);
    pop();
}

/**
 * Displays the game over message and final score
 */
function end() {
    textAlign(CENTER, BASELINE);
    textSize(30);
    background("pink");
    fill("black");
    textStyle(BOLD);
    text("Game Over\n Your final score is: " + score + " !", 320, 215);
}

/**
 * Displays the game open, over message and main game 
 */
function draw() {

    if (state === "title")//display start game 
        title();
    else if (state === "game" && arrowNumber != 0)// keep displaying game until player runs out of arrows
        game();
    else if (state = "end")//display end game message after user loses
        end();
}

/**
 * Displays the game 
 */
function game() {
    background("#87ceeb");

    moveTargets();
    moveArrow();
    keyPressed();

    checkArrowFlowerOverlap();
    checkArrowDiskOverlap();

    drawArrow();
    drawFlower();
    drawGoldDisk();

    drawScore();
    drawArrowScore();

}

/**
 * Handles moving the Arrow based on its state
 */
function moveArrow() {

    // If the arrow is idle, it doesn't do anything
    if (arrow.state === "idle") {
        // Do nothing
    }
    // move arrow up
    else if (arrow.state === "outbound") {
        arrow.y += - arrow.speed;
        // The arrow bounces hits the top display new arrow at the bottom
        if (arrow.y <= 0) {
            arrow.state = "inbound";
            arrowNumber--;// missed shots, player loses an arrow
            //set to end card when player runs out of arrows
            if (arrowNumber === 0) {
                state = "end";
            }
        }
    }
    // If the arrow is inbound, reset arrow at the bottom
    else if (arrow.state === "inbound") {
        resetArrow();
        arrow.state = "idle";
    }
}

/**
 * Handles the arrow overlapping the flower
 */
function checkArrowFlowerOverlap() {
    // Get distance from arrow to Flower
    const d = dist(arrow.x, arrow.y, flower.x, flower.y);
    // Check if it's an overlap
    const hitFlower = (d < arrow.size / 2 + flower.size / 2);

    if (hitFlower) {
        //increase score by 1
        score++;
        // Reset the Flower
        resetFlower();
        // Bring back the arrow
        arrow.state = "inbound";
    }
}

/**
 * Handles the arrow overlapping the disk
 */
function checkArrowDiskOverlap() {
    // Get distance from arrow to gold disk
    const dg = dist(arrow.x, arrow.y, goldDisk.x, goldDisk.y);

    // Check if it's an overlap
    const hitGoldDisk = (dg < arrow.size / 2 + goldDisk.size / 2);

    if (hitGoldDisk) {
        //increase score by 2
        score += 2;
        // Reset the disk
        resetGoldDisk();
        // Bring back the arrow
        arrow.state = "inbound";
    }
}

/**
 * Moves the Flower/disk according to its speed
 * Resets the Flower/disk if it gets all the way to the right
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
 * Reset the arrow to bottom
 */
function resetArrow() {
    arrow.x = arrow.x;
    arrow.y = 460;
}

/**
 * Moves the arrow with left, right arrow and space bar
 */
function keyPressed() {
    if (state === "title" && key == "s" && keyIsPressed) {//press space bar to start the game
        state = "game";
    }
    else if (key == "ArrowLeft" && keyIsPressed)//make arrow move left when left arrow key is pressed
        arrow.x -= 3;
    else if (key == "ArrowRight" && keyIsPressed)//make arrow move right when right arrow key is pressed
        arrow.x += 3;
    else if (key == " " && keyIsPressed && arrow.state === "idle") {//make arrow shoot up when space bar key is pressed
        arrow.state = "outbound";
    }
}

/**
 * Displays the score
 */
function drawScore() {
    push();
    textAlign(RIGHT, TOP);
    textSize(30);
    fill("black");
    textStyle(BOLD);
    text("Score: " + score, width - 20, 20);
    pop();
}

/**
 * Displays the number of arrows left
 */
function drawArrowScore() {
    push();
    textAlign(LEFT, TOP);
    textSize(30);
    fill("black");
    textStyle(BOLD);
    text("Number of arrows left: " + arrowNumber, 20, 20);
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
    //draw petal
    push();
    noStroke();
    fill("pink");
    ellipse(flower.x + 6, flower.y + 6, flower.size);
    ellipse(flower.x + 1, flower.y + 8, flower.size);
    ellipse(flower.x - 1, flower.y - 6, flower.size);
    ellipse(flower.x + 6, flower.y - 1, flower.size);
    ellipse(flower.x - 6, flower.y + 2, flower.size);
    pop();

    //draw flower center
    push();
    noStroke();
    fill("yellow");
    ellipse(flower.x, flower.y, flower.size);
    pop();


}

/**
 * Displays the arrow 
 */
function drawArrow() {

    // Draw the arrow
    push();
    stroke("brown");
    strokeWeight(arrow.size);
    line(arrow.x, arrow.y, arrow.x, arrow.y + 100);//arrow size of 100
    pop();

    //draw the arrow tip
    push();
    stroke("grey");
    strokeWeight(arrow.size);
    triangle(arrow.x - 5, arrow.y, arrow.x, arrow.y - 10, arrow.x + 5, arrow.y,);//arrow size of 100
    pop();

}