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

    //mixing cake batter with the mouse to change color
    mixingCakeBatterWithMouse();
    //when player adds a new ingredient the cake batter will change color
    changeBatterColorWhenAddIngredientsToCakeBatter();


    //draw the bowl with the cake batter inside
    drawMixingBowl();
    drawCakeBatter();

    //ingredients (strawberry, chocolat, flour)
    // Strawberry
    if (Strawberry.dragging) {// if strawberry is being clicked change it's location to mouse's location, so user can drag it to the bowl
        Strawberry.x = mouseX;
        Strawberry.y = mouseY;
    }
    if (Strawberry.visible) {//if strawberry is not in the bowl stay visible
        drawStrawberry();
    }

    // Chocolate
    if (Chocolate.dragging) {// if Chocolate is being clicked change it's location to mouse's location, so user can drag it to the bowl
        Chocolate.x = mouseX;
        Chocolate.y = mouseY;
    }
    if (Chocolate.visible) {//if Chocolate is not in the bowl stay visible
        drawChocolate();
    }

    // Flour
    if (Flour.dragging) {// if Flour is being clicked change it's location to mouse's location, so user can drag it to the bowl
        Flour.x = mouseX;
        Flour.y = mouseY;
    }
    if (Flour.visible) {//if Flour is not in the bowl stay visible
        drawFlour();
    }

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
 * Change to various cake batter color while user has added all the ingredients and is mixing the bowl
 */
function mixingCakeBatterWithMouse() {

    //distance between the mouse and the center of the cake batter
    const distanceMouseToCake = dist(mouseX, mouseY, cakeBatter.x, cakeBatter.y);
    //see when mouse is considered overlapping
    const mouseOverlapsCakeBatter = (distanceMouseToCake < cakeBatter.size / 2);
    //check if teh mouse is movign continuously 
    const mouseIsMoving = (movedX !== 0 || movedY !== 0);

    //if the mouse is moving in the bowl and all the ingredients have been added then change color
    if (mouseOverlapsCakeBatter && mouseIsMoving && !Strawberry.visible && !Chocolate.visible && !Flour.visible) {

        //change color of batter when mixed
        cakeBatter.color.r = map(mouseX, 0, canvas.weight, 0, 250);
        cakeBatter.color.g = map(mouseY, 0, canvas.height, 0, 250);
        cakeBatter.color.b = map(mouseY, 0, canvas.weight, 0, 25);

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
 * Change color of the cake batter depending on what ingredient was added
 */
function changeBatterColorWhenAddIngredientsToCakeBatter() {
    //When strawberry is added combine RGB color average of both batter and ingredient
    if (Strawberry.visible == false) {
        cakeBatter.color.r = (cakeBatter.color.r + Strawberry.color.r) / 2;
        cakeBatter.color.g = (cakeBatter.color.g + Strawberry.color.g) / 2;
        cakeBatter.color.b = (cakeBatter.color.b + Strawberry.color.b) / 2;
    }
    //When Chocolate is added combine RGB color average of both batter and ingredient
    if (Chocolate.visible == false) {
        cakeBatter.color.r = (cakeBatter.color.r + Chocolate.color.r) / 2;
        cakeBatter.color.g = (cakeBatter.color.g + Chocolate.color.g) / 2;
        cakeBatter.color.b = (cakeBatter.color.b + Chocolate.color.b) / 2;
    }
    //When Flour is added combine RGB color average of both batter and ingredient
    if (Flour.visible == false) {
        cakeBatter.color.r = (cakeBatter.color.r + Flour.color.r) / 2;
        cakeBatter.color.g = (cakeBatter.color.g + Flour.color.g) / 2;
        cakeBatter.color.b = (cakeBatter.color.b + Flour.color.b) / 2;
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