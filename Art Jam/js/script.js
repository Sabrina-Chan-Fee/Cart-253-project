/**
 * Mixing Cake batter
 * By Sabrina Chan Fee
 * 
 * mix the cake batter in the bowl till it's ready to be baked!
 */

"use strict";

//canvas size
const canvas = {
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

        //min value for color of batter
        // minR: 0,
        // minG: 0,
        // minB: 0,

        //Max value for color of batter  61, 43, 31
        maxR: 61,
        maxG: 43,
        maxB: 31,
    },

    cakeBatterIsReady: false,

};

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

    visible: true,
    dragging: false,
};

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

    visible: true,
    dragging: false,
};

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

    visible: true,
    dragging: false,

};




//create the canvas
function setup() {
    createCanvas(canvas.weight, canvas.height);
    // createCanvas(weight, height);

}

/**
 * Fills the background, displays the bowl 
 */
function draw() {
    background(255, 200, 127);

    checkMixingMouse();
    changeBatterColorWhenAddIngredientsToCakeBatter();
    drawMixingBowl();



    drawCakeBatter();

    //ingredients

    if (Strawberry.dragging) {// if strawberry is being dragged change it's location to mouse's location
        Strawberry.x = mouseX;
        Strawberry.y = mouseY;
    }
    if (Strawberry.visible) {//if strawberry is not in the bowl stay visible
        drawStrawberry();
    }

    if (Chocolate.dragging) {// if Chocolate is being dragged change it's location to mouse's location
        Chocolate.x = mouseX;
        Chocolate.y = mouseY;
    }
    if (Chocolate.visible) {//if Chocolate is not in the bowl stay visible
        drawChocolate();
    }


    if (Flour.dragging) {// if Flour is being dragged change it's location to mouse's location
        Flour.x = mouseX;
        Flour.y = mouseY;
    }
    if (Flour.visible) {//if Flour is not in the bowl stay visible
        drawFlour();
    }
}

function checkMixingMouse() {

    //if the cake batter is the right shade of brown stop
    if (cakeBatter.cakeBatterIsReady) {
        return;
    }
    //distance between the mouse and the center of the cake batter
    const distanceMouseToCake = dist(mouseX, mouseY, cakeBatter.x, cakeBatter.y);
    //size of creature is in diameter so we divide by 2
    const mouseOverlapsCakeBatter = (distanceMouseToCake < cakeBatter.size / 2);
    //check if teh mouse is movign continuously 
    const mouseIsMoving = (movedX !== 0 || movedY !== 0);

    //if the mouse is "mixing" the batter change color
    if (mouseOverlapsCakeBatter && mouseIsMoving && !Strawberry.visible && !Chocolate.visible && !Flour.visible) {


        //change color of batter when mixed
        cakeBatter.color.r = map(mouseX, 0, canvas.weight, 0, 250);
        cakeBatter.color.g = map(mouseY, 0, canvas.height, 0, 250);
        cakeBatter.color.b = map(mouseY, 0, canvas.weight, 0, 25);

        // cakeBatter.color.r = constrain(cakeBatter.color.r, cakeBatter.color.maxR);

        //contraint the RGB color of cake batter so it stays at brown
        // if (cakeBatter.color.r == cakeBatter.color.maxR || cakeBatter.color.g == cakeBatter.color.maxG || cakeBatter.color.b == cakeBatter.color.maxB) {
        //     cakeBatter.cakeBatterIsReady = true;
        // }
    }

}

function mousePressed() {

    const distanceStrawberry = dist(mouseX, mouseY, Strawberry.x, Strawberry.y);
    const mouseOverlapStrawberry = (distanceStrawberry < Strawberry.size / 2);
    if (mouseOverlapStrawberry) {
        console.log("strawbery");//not going in
        Strawberry.dragging = true;
    }

    const distanceChocolate = dist(mouseX, mouseY, Chocolate.x, Chocolate.y);
    const mouseOverlapChocolate = (distanceChocolate < Chocolate.size / 2);
    if (mouseOverlapChocolate) {
        Chocolate.dragging = true;
    }

    const distanceFlour = dist(mouseX, mouseY, Flour.x, Flour.y);
    const mouseOverlapFlour = (distanceFlour < Flour.size / 2);
    if (mouseOverlapFlour) {
        Flour.dragging = true;
    }

}

function mouseReleased() {
    Strawberry.dragging = false;
    //distance between the mouse and the center of the cake batter
    const distanceStrawberryToCake = dist(Strawberry.x, Strawberry.y, cakeBatter.x, cakeBatter.y);
    //size of creature is in diameter so we divide by 2
    const strawberryOverlapsCakeBatter = (distanceStrawberryToCake < cakeBatter.size / 2);
    //check if teh mouse is movign continuously 
    if (strawberryOverlapsCakeBatter)
        Strawberry.visible = false;
    else
        Strawberry.visible = true;

    Chocolate.dragging = false;
    //distance between the mouse and the center of the cake batter
    const distanceChocolateToCake = dist(Chocolate.x, Chocolate.y, cakeBatter.x, cakeBatter.y);
    //size of creature is in diameter so we divide by 2
    const chocolateOverlapsCakeBatter = (distanceChocolateToCake < cakeBatter.size / 2);
    //check if teh mouse is movign continuously 
    if (chocolateOverlapsCakeBatter)
        Chocolate.visible = false;
    else
        Chocolate.visible = true;


    Flour.dragging = false;
    //distance between the mouse and the center of the cake batter
    const distanceFlourToCake = dist(Flour.x, Flour.y, cakeBatter.x, cakeBatter.y);
    //size of creature is in diameter so we divide by 2
    const flourOverlapsCakeBatter = (distanceFlourToCake < cakeBatter.size / 2);
    //check if teh mouse is movign continuously 
    if (flourOverlapsCakeBatter)
        Flour.visible = false;
    else
        Flour.visible = true;
}

function changeBatterColorWhenAddIngredientsToCakeBatter() {
    if (Strawberry.visible == false) {
        cakeBatter.color.r = (cakeBatter.color.r + Strawberry.color.r) / 2;
        cakeBatter.color.g = (cakeBatter.color.g + Strawberry.color.g) / 2;
        cakeBatter.color.b = (cakeBatter.color.b + Strawberry.color.b) / 2;
    }

    if (Chocolate.visible == false) {
        cakeBatter.color.r = (cakeBatter.color.r + Chocolate.color.r) / 2;
        cakeBatter.color.g = (cakeBatter.color.g + Chocolate.color.g) / 2;
        cakeBatter.color.b = (cakeBatter.color.b + Chocolate.color.b) / 2;
    }

    if (Flour.visible == false) {
        cakeBatter.color.r = (cakeBatter.color.r + Flour.color.r) / 2;
        cakeBatter.color.g = (cakeBatter.color.g + Flour.color.g) / 2;
        cakeBatter.color.b = (cakeBatter.color.b + Flour.color.b) / 2;
    }
}

function drawMixingBowl() {
    push();
    noStroke();
    fill(mixingBowl.color);
    ellipse(mixingBowl.x, mixingBowl.y, mixingBowl.size);
    pop();

}

function drawCakeBatter() {
    push();
    noStroke();
    fill(cakeBatter.color.r, cakeBatter.color.g, cakeBatter.color.b);
    ellipse(cakeBatter.x, cakeBatter.y, cakeBatter.size);
    pop();
}


function drawStrawberry() {
    push();
    noStroke();
    fill(Strawberry.color.r, Strawberry.color.g, Strawberry.color.b);
    ellipse(Strawberry.x, Strawberry.y, Strawberry.size);
    pop();
}

function drawChocolate() {
    push();
    noStroke();
    fill(Chocolate.color.r, Chocolate.color.g, Chocolate.color.b);
    ellipse(Chocolate.x, Chocolate.y, Chocolate.size);
    pop();
}

function drawFlour() {
    push();
    noStroke();
    fill(Flour.color.r, Flour.color.g, Flour.color.b);
    ellipse(Flour.x, Flour.y, Flour.size);
    pop();
}