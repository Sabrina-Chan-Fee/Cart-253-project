/**
 * Mixing Cake batter
 * By Sabrina Chan Fee
 * 
 * A game where the player addes the ingredients and mixes the cake batter in the bowl!
 * 
 * Controls: 
 * - drag and drop ingredients into the bowl
 * - circulate mouse in bowl to mix everything togther
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
//Mixing Bowl
const mixingBowl = {
    // position
    x: canvas.weight / 3,
    y: canvas.height / 3,

    //size
    size: 300,

    // color
    color: "#ff0000",
};

//cake batter
const cakeBatter = {
    // position
    x: canvas.weight / 3,
    y: canvas.height / 3,

    //size
    size: 260,

    // color
    color: {
        r: 180,
        g: 150,
        b: 120,
    },

};

//Ingredient: Strawberry
const Strawberry = {
    //position
    x: 100,
    y: 500,

    //size
    size: 100,

    // color
    color: {
        r: 255,
        g: 192,
        b: 203,
    },

    //to make strawberry appear/disappear
    visible: true,
    //to check if object can be dragged
    dragging: false,
};

//Ingredient: Chocolate
const Chocolate = {
    //position
    x: 300,
    y: 500,

    //size
    size: 100,

    // color
    color: {
        r: 101,
        g: 67,
        b: 33,
    },

    //to make strawberry appear/disappear
    visible: true,
    //to check if object can be dragged
    dragging: false,
};

//Ingredient: Flour
const Flour = {
    //position
    x: 500,
    y: 500,

    //size
    size: 100,

    // color
    color: {
        r: 250,
        g: 235,
        b: 215,
    },

    //to make strawberry appear/disappear
    visible: true,
    //to check if object can be dragged
    dragging: false,

};




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



    drawStrawberry();

    drawChocolate();


    drawFlour();

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
 * Draw a mixing bowl
 */
function drawMixingBowl() {
    push();
    noStroke();
    fill(mixingBowl.color);
    ellipse(mixingBowl.x, mixingBowl.y, mixingBowl.size);
    pop();

}
/**
 * Draw a cake batter
 */
function drawCakeBatter() {
    push();
    noStroke();
    fill(cakeBatter.color.r, cakeBatter.color.g, cakeBatter.color.b);
    ellipse(cakeBatter.x, cakeBatter.y, cakeBatter.size);
    pop();
}

/**
 * Draw a Strawberryl
 */
function drawStrawberry() {
    push();
    noStroke();
    fill(Strawberry.color.r, Strawberry.color.g, Strawberry.color.b);
    ellipse(Strawberry.x, Strawberry.y, Strawberry.size);
    pop();
}
/**
 * Draw a Chocolate
 */
function drawChocolate() {
    push();
    noStroke();
    fill(Chocolate.color.r, Chocolate.color.g, Chocolate.color.b);
    ellipse(Chocolate.x, Chocolate.y, Chocolate.size);
    pop();
}
/**
 * Draw a Flour
 */
function drawFlour() {
    push();
    noStroke();
    fill(Flour.color.r, Flour.color.g, Flour.color.b);
    ellipse(Flour.x, Flour.y, Flour.size);
    pop();
}