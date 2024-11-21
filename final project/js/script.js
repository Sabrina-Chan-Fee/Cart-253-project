/**
 * Apple cake making 
 * By Sabrina Chan Fee
 * 
 * A game where the player picks apples, make a cake batter and bakes a cake
 * 
 * Controls: 
 * - 
 * 
 * Uses:
 * p5.js
 * https://p5js.org
 */

"use strict";

//canvas 
const canvas = {
    //size
    width: 600,
    height: 600,
};

//tree
const tree = {

    leaf: {
        //position
        x: canvas.width / 2,
        y: canvas.height / 5,
        //size
        sizeWidth: 500,
        sizeHeight: 300,
    },

    trunk: {
        //position
        x: canvas.width / 2 - 50,
        y: canvas.height / 5,
        //size
        sizeWidth: 100,
        sizeHeight: 600,
    },

    basket: {
        //position
        x: 450,
        y: 500,
        //size
        sizeWidth: 100,
        sizeHeight: 50,
    },

    grass: {
        //position
        x: 0,
        y: 550,
        //size
        sizeWidth: 600,
        sizeHeight: 50,
    },

};


//apple
const apple = {
    // position
    x: tree.leaf.x - 140,
    y: tree.leaf.y + 150,
    // ellipse(apple.x - 140, apple.y + 150, apple.size);
    //size
    size: 60,

    // color
    color: "red",

    isRotten: false,
    inBasket: false,

};
let state = "applePickingInstruction";

//create the canvas
function setup() {
    createCanvas(canvas.width, canvas.height);
}

/**
 * Fills the background, displays the tree
 */
function draw() {

    if (state === "applePickingInstruction") {
        //display apple piccking instruction 
        applePickingInstruction();
    }
    else if (state === "applePick") {

        //player picks apple from the tree
        applePicking();

    }
    else if (state === "makeBatterInstructions") {
        cakeBatterInstruction();
    }
    else if (state === "makeBatter") {
        makeBatter();
    }
    else if (state === "overTime") {
        //over game
    }
    else {
        //display score
    }


}

/**
 * Moves the arrow with left, right arrow and space bar
 */
function keyPressed() {
    if (state === "applePickingInstruction" && key == "s" && keyIsPressed) {//press space bar to start the game
        state = "applePick";
    } else if (state === "makeBatterInstructions" && key == "s" && keyIsPressed) {
        state = "makeBatter";
    }


}

function applePicking() {
    drawTree();
}

function makeBatter() {
    drawKitchen();
}

/**
 * Check to see if mouse is overlaping with apple
 */
function mousePressed() {

    //distance between the mouse and the center of the apple
    const distance = dist(mouseX, mouseY, apple.x, apple.y);
    //see when mouse is considered overlapping
    const mouseOverlap = (distance < apple.size / 2);

    // check if the mouse is clicking on the apple
    if (mouseOverlap) {
        apple.inBasket = true;
        setTimeout(() => { state = "makeBatterInstructions" }, 1000); // after 1000 state gets changes to makeBatter instruction
    }

}

/**
 * Displays the applePickingInstruction page
 */
function applePickingInstruction() {
    //game applePickingInstruction
    push();
    textAlign(CENTER, CENTER);
    textSize(30);
    background("pink");
    fill("black");
    textStyle(BOLD);
    text("Bake your own apple cake!", canvas.width / 2, canvas.height / 3);
    pop();

    //instruction on how to start
    push();
    textAlign(CENTER, CENTER);
    textSize(20);
    text("(press \"s\" to start!)", canvas.width / 2, canvas.height / 2);
    pop();

    //instruction on how to play
    push();
    textAlign(CENTER, CENTER);
    textSize(20);
    text("Click on the apple to put it in your basket", canvas.width / 2, canvas.height - 150);
    pop();

}

/**
 * Displays the game cake batter instructions page
 */
function cakeBatterInstruction() {
    //game applePickingInstruction
    push();
    textAlign(CENTER, CENTER);
    textSize(30);
    background("pink");
    fill("black");
    textStyle(BOLD);
    text("Time to make the batter!", canvas.width / 2, canvas.height / 3);
    pop();

    //instruction on how to start
    push();
    textAlign(CENTER, CENTER);
    textSize(20);
    text("(press \"s\" to start!)", canvas.width / 2, canvas.height / 2);
    pop();

    //instruction on how to play
    push();
    textAlign(CENTER, CENTER);
    textSize(20);
    text("BLABLABALBALBALBA", canvas.width / 2, canvas.height - 150);
    pop();

}

/**
 * Draw a apple tree
 */
function drawTree() {

    background("#AFEEEE");

    // tree trunk
    push();
    noStroke();
    fill("brown");
    rect(tree.trunk.x, tree.trunk.y, tree.trunk.sizeWidth, tree.trunk.sizeHeight)
    pop();

    // Tree leafs
    push();
    noStroke();
    fill("green");
    ellipse(tree.leaf.x, tree.leaf.y, tree.leaf.sizeWidth, tree.leaf.sizeHeight);
    pop();


    //grass
    push();
    noStroke();
    fill("green");
    rect(tree.grass.x, tree.grass.y, tree.grass.sizeWidth, tree.grass.sizeHeight);
    pop();

    // apple in tree
    if (!apple.inBasket) {
        push();
        noStroke();
        fill(apple.color);
        // ellipse(apple.x - 140, apple.y + 150, apple.size);
        ellipse(apple.x, apple.y, apple.size);
        pop();
    } else {
        push();
        noStroke();
        fill(apple.color);
        ellipse(tree.basket.x + 50, tree.basket.y, apple.size);
        pop();
    }

    //basket
    push();
    noStroke();
    fill("orange");
    rect(tree.basket.x, tree.basket.y, tree.basket.sizeWidth, tree.basket.sizeHeight)
    pop();

}

function drawKitchen() {

    background("grey");

    push();

    pop();
}
