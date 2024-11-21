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
    weight: 600,
    height: 600,
};

//tree
const tree = {

    leaf: {
        //position
        x: canvas.weight / 2,
        y: canvas.height / 5,
        //size
        sizeWeight: 500,
        sizeHeight: 300,
    },

    trunk: {
        //position
        x: canvas.weight / 2 - 50,
        y: canvas.height / 5,
        //size
        sizeWeight: 100,
        sizeHeight: 600,
    },

    basket: {
        //position
        x: 450,
        y: 500,
        //size
        sizeWeight: 100,
        sizeHeight: 50,
    },

    grass: {
        //position
        x: 0,
        y: 550,
        //size
        sizeWeight: 600,
        sizeHeight: 50,
    },

};


//apple
const apple = {
    // position
    x: tree.leaf.x,
    y: tree.leaf.y,

    //size
    size: 60,

    // color
    color: "red",

    isRotten: false,
    isVisible: true,

};

//create the canvas
function setup() {
    createCanvas(canvas.weight, canvas.height);
}

/**
 * Fills the background, displays the tree
 */
function draw() {
    //color the background
    background(255, 200, 127);
    drawTree();

    mousePressed(apple);


}


/**
 * Check to see if mouse is overlaping with ingredient
 */
function mousePressed(element) {
    // Strawberry

    //distance between the mouse and the center of the Strawberry
    const distance = dist(mouseX, mouseY, element.x, element.y);
    //see when mouse is considered overlapping
    const mouseOverlap = (distance < element.size / 2);
    console.log(mouseOverlap);
    if (mouseOverlap) {
        // if mouse is overlaping with ingredient change dragging to true so that user can move it to the bowl
        // element.dragging = true;
        console.log("helo");
        element.fill = "pink";
        element.isVisible = false;
    }


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
 * Draw a apple tree
 */
function drawTree() {

    background("#AFEEEE");

    // tree trunk
    push();
    noStroke();
    fill("brown");
    rect(tree.trunk.x, tree.trunk.y, tree.trunk.sizeWeight, tree.trunk.sizeHeight)
    pop();

    // Tree leafs
    push();
    noStroke();
    fill("green");
    ellipse(tree.leaf.x, tree.leaf.y, tree.leaf.sizeWeight, tree.leaf.sizeHeight);
    pop();

    //basket
    push();
    noStroke();
    fill("orange");
    rect(tree.basket.x, tree.basket.y, tree.basket.sizeWeight, tree.basket.sizeHeight)
    pop();

    //grass
    push();
    noStroke();
    fill("green");
    rect(tree.grass.x, tree.grass.y, tree.grass.sizeWeight, tree.grass.sizeHeight);
    // rect(0, canvas.y - tree.basket.sizeHeight, 700, 20);
    pop();

    // apple in tree
    if (apple.isVisible) {
        push();
        noStroke();
        fill(apple.color);
        ellipse(apple.x - 140, apple.y + 150, apple.size);
        pop();
    } else {

    }

}