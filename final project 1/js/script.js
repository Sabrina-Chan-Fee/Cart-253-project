/**
 * Apple cake making 
 * By Sabrina Chan Fee
 * 
 * A game where the player picks apples, make a cake batter and bakes a cake
 * 
 * Controls: 
 * - click apple to put it in basket
 * - click apple into the cake batter 
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

//tree : leaf, tree trunk, grass, basket
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

    //size
    size: 60,

    // color
    color: "red",

    isRotten: false,
    inBasket: false,
    inMixingBowl: false,

};

//Mixing Bowl
const mixingBowl = {
    // position
    x: canvas.width / 3,
    y: canvas.height / 3,

    //size
    size: 300,

    // color
    color: "#DEB887",
};

//Mixing Bowl
const cake = {
    // position
    x: canvas.width / 3,
    y: canvas.height / 2.5,

    bakedness: 0,

    //size
    size: {
        width: 200,
        height: 150,
    },

    // color of raw cake
    colorRaw: {
        r: 222,
        g: 184,
        b: 135,
    },

    //color if baked cake
    colorCook: {
        r: 154,
        g: 88,
        b: 23,
    },

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
    else if (state === "makeBatter") {
        //make cake batter game
        makeBatter();
    }
    else if (state === "ovenTime") {
        //oven game
        ovenCake();
    }
    else {
        //display score
        gameOverScreen();
    }

}

/**
 * Moves the arrow with left, right arrow and space bar
 */
function keyPressed() {
    if (state === "applePickingInstruction" && key == "s" && keyIsPressed) {//press space bar to start the game
        state = "applePick";
    }

}

// let user click apple to put in basket
function applePicking() {
    drawTree();
}

//click apple to put it into the cake batter
function makeBatter() {
    drawKitchen();
}

//watch bake turn golden brown when in the oven
function ovenCake() {
    drawOven();
    bakeCake();
}

//change color of bake as it bakes

function bakeCake() {
    cake.bakedness += 0.005;
    //change color
    cake.colorRaw.r = map(cake.bakedness, 0, 1, cake.colorRaw.r, cake.colorCook.r);
    cake.colorRaw.g = map(cake.bakedness, 0, 1, cake.colorRaw.g, cake.colorCook.g);
    cake.colorRaw.b = map(cake.bakedness, 0, 1, cake.colorRaw.b, cake.colorCook.b);

    //once at the right color display game over message
    if (cake.bakedness >= 1) {
        state = "gameOver";
    }
}
/**
 * Check to see if mouse is overlaping with apple
 */
function mousePressed() {

    //distance between the mouse and the center of the apple
    const distance = dist(mouseX, mouseY, apple.x, apple.y);
    //see when mouse is considered overlapping
    const mouseOverlap = (distance < apple.size / 2);

    // check if the mouse is clicking on the apple then put in the basket
    if (mouseOverlap && state === "applePick") {
        apple.inBasket = true;
        setTimeout(() => { state = "makeBatter" }, 1000); // after 1000 state gets changes to makeBatter game
    }
    // check if the mouse is clicking on the apple then put in the bowl
    else if (mouseOverlap && state === "makeBatter") {
        apple.inMixingBowl = true;
        setTimeout(() => { state = "ovenTime" }, 1000); // after 1000 state gets changes to oven baking game
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
 * Displays the game over screen
 */
function gameOverScreen() {

    push();
    textAlign(CENTER, CENTER);
    textSize(30);
    background("PaleTurquoise");
    fill("black");
    text("YOU MADE A CAKE YAY\n\n That was quite fast", canvas.width / 2, canvas.height / 2);
    pop();


}

/**
 * Draw a apple tree with bascket
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

/**
 * Draw a kitchen table with apple and a bowl of cake batter
 */
function drawKitchen() {
    apple.y = 440;
    apple.x = 400;

    background("bisque");

    //bowl
    push();
    noStroke();
    fill(mixingBowl.color);
    ellipse(mixingBowl.x, mixingBowl.y, mixingBowl.size);
    pop();

    //bowl
    push();
    noStroke();
    fill(mixingBowl.color);
    ellipse(mixingBowl.x, mixingBowl.y, mixingBowl.size);
    pop();

    //batter
    push();
    noStroke();
    fill("#8B4513");
    ellipse(mixingBowl.x, mixingBowl.y, mixingBowl.size - 50);
    pop();

    //game notes
    push();
    textAlign(CENTER, BASELINE);
    textSize(25);
    fill("black");
    textStyle(BOLD);
    text("Click on apple to add to the cake batter", canvas.width / 2, canvas.height - 75);
    pop();

    //display apples on table
    if (!apple.inMixingBowl) {
        //apple stem
        push();
        noStroke();
        fill("#800000");
        rect(apple.x - 5, apple.y - 50, 10, 30);
        pop();

        //apple
        push();
        noStroke();
        fill(apple.color);
        ellipse(apple.x, apple.y, apple.size);
        pop();
    } else {
        //change location of apple to be in the bowl
        apple.y = mixingBowl.y;
        apple.x = mixingBowl.x;

        //apple
        push();
        noStroke();
        fill(apple.color);
        ellipse(apple.x, apple.y, apple.size);
        pop();
    }
}

/**
 * Draw a oven with a cake inside
 */
function drawOven() {
    background("bisque");

    //oven
    push();
    noStroke();
    fill("#778899");
    rect(cake.x - 100, cake.y - 100, 400, 300);
    pop();

    //oven window
    push();
    noStroke();
    fill("#B0C4DE");
    rect(cake.x - 50, cake.y - 50, 300, 200);
    pop();

    //oven doornobs
    push();
    noStroke();
    fill("black");
    ellipse(cake.x, cake.y - 75, 30);
    pop();

    push();
    noStroke();
    fill("black");
    ellipse(cake.x + 50, cake.y - 75, 30);
    pop();

    //cake
    push();
    noStroke();
    fill(cake.colorRaw.r, cake.colorRaw.g, cake.colorRaw.b);
    rect(cake.x, cake.y, cake.size.width, cake.size.height);
    pop();

    //game notes
    push();
    textAlign(CENTER, BASELINE);
    textSize(25);
    fill("black");
    textStyle(BOLD);
    text("Patiently wait for the cake to bake...", canvas.width / 2, canvas.height - 75);
    pop();
}