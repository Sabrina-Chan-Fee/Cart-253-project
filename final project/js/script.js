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

};


//cake batter
const apple = {
    // position
    x: tree.leaf.x,
    y: tree.leaf.y,

    //size
    size: 60,

    // color
    color: {
        r: 180,
        g: 150,
        b: 120,
    },

    isRotten: false,

};

//empty apple array to store 8 apples
let apples = []

//create the canvas
function setup() {
    createCanvas(canvas.weight, canvas.height);
}

/**
 * Fills the background, displays the bowl, cake batter, ingredient ( strawberry, chocolat, flour)
 */
function draw() {
    //color the background
    background(255, 200, 127);
    drawTree();

}


/**
 * Check to see if mouse is overlaping with ingredient
 */
function mousePressed() {
    // Strawberry

    //distance between the mouse and the center of the Strawberry
    const distanceStrawberry = dist(mouseX, mouseY, Strawberry.x, Strawberry.y);
    //see when mouse is considered overlapping
    const mouseOverlapStrawberry = (distanceStrawberry < Strawberry.size / 2);
    if (mouseOverlapStrawberry) {
        // if mouse is overlaping with ingredient change dragging to true so that user can move it to the bowl
        Strawberry.dragging = true;
    }

    // Chocolate

    //distance between the mouse and the center of the Chocolate
    const distanceChocolate = dist(mouseX, mouseY, Chocolate.x, Chocolate.y);
    //see when mouse is considered overlapping
    const mouseOverlapChocolate = (distanceChocolate < Chocolate.size / 2);
    if (mouseOverlapChocolate) {
        // if mouse is overlaping with ingredient change dragging to true so that user can move it to the bowl
        Chocolate.dragging = true;
    }

    // Flour

    //distance between the mouse and the center of the Flour
    const distanceFlour = dist(mouseX, mouseY, Flour.x, Flour.y);
    //see when mouse is considered overlapping
    const mouseOverlapFlour = (distanceFlour < Flour.size / 2);
    if (mouseOverlapFlour) {
        // if mouse is overlaping with ingredient change dragging to true so that user can move it to the bowl
        Flour.dragging = true;
    }

}

/**
 * Check to see if ingredient is overlaping with the bowl. once it is and dropped inside the bowl make ingredient invisble
 * create illussion that the ingredient was added to the bowl
 */
function mouseReleased() {

    // Strawberry
    Strawberry.dragging = false;//stop use from dragging once they release the mouse

    //Check to see if user is dropping the ingredient inside the bowl
    //distance between the Strawberry and the center of the cake batter
    const distanceStrawberryToCake = dist(Strawberry.x, Strawberry.y, cakeBatter.x, cakeBatter.y);
    //see when ingredient is considered overlapping with the bowl
    const strawberryOverlapsCakeBatter = (distanceStrawberryToCake < cakeBatter.size / 2);
    //If ingredient is inside bowl make ingredient invisible
    if (strawberryOverlapsCakeBatter)
        Strawberry.visible = false;
    else
        Strawberry.visible = true;



    // Chocolate
    Chocolate.dragging = false;//stop use from dragging once they release the mouse

    //Check to see if user is dropping the ingredient inside the bowl
    //distance between the Chocolate and the center of the cake batter
    const distanceChocolateToCake = dist(Chocolate.x, Chocolate.y, cakeBatter.x, cakeBatter.y);
    //see when ingredient is considered overlapping with the bowl
    const chocolateOverlapsCakeBatter = (distanceChocolateToCake < cakeBatter.size / 2);
    //If ingredient is inside bowl make ingredient invisible
    if (chocolateOverlapsCakeBatter)
        Chocolate.visible = false;
    else
        Chocolate.visible = true;

    // Flour
    Flour.dragging = false;//stop use from dragging once they release the mouse

    //Check to see if user is dropping the ingredient inside the bowl
    //distance between the Flour and the center of the cake batter
    const distanceFlourToCake = dist(Flour.x, Flour.y, cakeBatter.x, cakeBatter.y);
    //see when ingredient is considered overlapping with the bowl
    const flourOverlapsCakeBatter = (distanceFlourToCake < cakeBatter.size / 2);
    //If ingredient is inside bowl make ingredient invisible
    if (flourOverlapsCakeBatter)
        Flour.visible = false;
    else
        Flour.visible = true;
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

    // apple in tree
    push();
    noStroke();
    fill("red");
    ellipse(apple.x - 140, apple.y + 150, apple.size);
    pop();

}