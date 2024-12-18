/**
 * Apple cake making 
 * By Sabrina Chan Fee
 * 
 * A game where the player picks apples, make a cake batter and bakes a cake
 * 
 * Controls: 
 * - slide mouse left to right to move basket and cath the falling apple
 * - click and drag apple into the cake batter 
 * - click and drag with the mouse to move the toggle and set the oven to the right temperature
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
    y: 250,
    x: 400,

    //size
    size: 60,

    // color
    color: "red",

    isRotten: false,
    inBasket: false,
    inMixingBowl: false,
    dragging: false,

    speed: 3,
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

//Temperature slide
const ovenTemperature = {
    // position
    x: canvas.width / 6,
    y: canvas.height / 1.3,

    //size
    size: {
        height: 40,
        width: 400,
    },
    // color
    color: "#2b0900",

    //oven temp goal
    temperatureGoal: {
        x: canvas.width / 6 + 300,
        y: canvas.height / 1.3,
        height: 40,
        width: 40,
    },

};

//Temperature slide toggle
const toggle = {
    // position
    x: canvas.width / 6,
    y: canvas.height / 1.3,

    //size
    size: {
        height: 40,
        width: 40,
    },
    // color
    color: "#ff0000",
    dragging: false,
    isAtRightTemp: false,

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

let appleSeed = undefined;

//create the canvas
function setup() {
    createCanvas(canvas.width, canvas.height);
    //give value to apple seed to draw the apple pieces in the cake batter game
    appleSeed = random(1, 100);
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

// let apple fall and let user catch fallen apple using basket
function applePicking() {
    drawTree();
    setTimeout(moveApple, 1000);

    //move basket on the x axis
    tree.basket.x = mouseX;
    catchApple();
}

//click and drag apple into the cake batter
function makeBatter() {
    drawKitchen();

    // drag apple into the bowl
    if (apple.dragging) {
        apple.x = mouseX;
        apple.y = mouseY;
    }
}

//click and drag the toggle to the right oven temp and watch the cake bake
function ovenCake() {
    drawOven();

    //drag toggle left to right 
    if (toggle.dragging) {
        toggle.x = mouseX;
    }
    // distance between the mouse and the center of the apple
    const distanceFromToggleAndTempGoal = ovenTemperature.temperatureGoal.x - toggle.x;
    //once the correct temp is set start baking the cake
    if (distanceFromToggleAndTempGoal < 10 && distanceFromToggleAndTempGoal > -10) {
        setTimeout(() => { toggle.isAtRightTemp = true }, 500);
        setTimeout(bakeCake, 1000);
    }

}

//change color of bake as it bakes
function bakeCake() {

    cake.bakedness += 0.01;

    //change color
    cake.colorRaw.r = map(cake.bakedness, 0, 1, cake.colorRaw.r, cake.colorCook.r);
    cake.colorRaw.g = map(cake.bakedness, 0, 1, cake.colorRaw.g, cake.colorCook.g);
    cake.colorRaw.b = map(cake.bakedness, 0, 1, cake.colorRaw.b, cake.colorCook.b);

    //once at the right color display game over message
    if (cake.bakedness >= 1) {
        toggle.dragging = false;
        setTimeout(() => { state = "gameOver" }, 500);
    }
}
/**
 * Be able to click and drag apple into the cake batter or click and drag toggle to set oven at right temp
 */
function mousePressed() {

    //distance between the mouse and the center of the apple
    const distanceFromMouseAndApple = dist(mouseX, mouseY, apple.x, apple.y);
    //see when mouse is considered overlapping
    const mouseOverlapApple = (distanceFromMouseAndApple < apple.size / 2);
    //drag apple into the cake batter
    if (mouseOverlapApple && state === "makeBatter") {
        apple.dragging = true;
    }

    //distance between the mouse and the center of the apple
    const distanceFromMouseAndToggle = dist(mouseX, mouseY, toggle.x + toggle.size.width / 2, toggle.y + toggle.size.height / 2);
    //see when mouse is considered overlapping
    const mouseOverlapToggle = (distanceFromMouseAndToggle < toggle.size.width / 2 || distanceFromMouseAndToggle < toggle.size.height / 2);
    //drag toggle
    if (mouseOverlapToggle && state === "ovenTime") {
        toggle.dragging = true;
    }
}

//stop dragging object when mouse is released
function mouseReleased() {
    apple.dragging = false;

    //distance between the mouse and the center of the apple
    const distance = dist(mixingBowl.x, mixingBowl.y, apple.x, apple.y);
    //see when mouse is considered overlapping
    const appleOverlapMixingBowl = (distance <= mixingBowl.size / 2);

    //stop dragging when mouse is released and apple is in the bowl
    if (appleOverlapMixingBowl) {
        apple.inMixingBowl = true;
        setTimeout(() => { state = "ovenTime" }, 1000); // after 1000 state gets changes to oven baking game
    }
    //stop dragging when mouse is release
    toggle.dragging = false;

}

//catch apple with basket
function catchApple() {
    //distance between the apple and the center of the basket
    const distance = dist(tree.basket.x + tree.basket.sizeWidth / 2, tree.basket.y, apple.x, apple.y);
    //see when basket and apple is considered overlapping
    const mouseOverlap = (distance <= apple.size / 2);

    // check if the apple is in the basket
    if (mouseOverlap && state === "applePick") {
        apple.inBasket = true;
        setTimeout(() => { state = "makeBatter" }, 1000); // after 1000 state gets changes to makeBatter game
    }
}

//make apple fall from the tree
function moveApple() {
    //make apple fall
    apple.y += apple.speed;

    //when the apple touches the ground reset back up to the tree
    if (apple.y >= tree.grass.y - apple.size / 2) {
        apple.y = 100;
    }
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

    //game message
    push();
    textAlign(CENTER, TOP);
    textSize(25);
    fill("white");
    textStyle(BOLD);
    text("Catch the apple", canvas.width / 2, canvas.height - 40);
    pop();

}

/**
 * Draw a kitchen table with apple and a bowl of cake batter
 */
function drawKitchen() {

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
    text("Click and drag the apple into the cake batter", canvas.width / 2, canvas.height - 75);
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
    } else {//display apple piece in batter
        //change apples to mini apple pieces
        apple.y = mixingBowl.y;
        apple.x = mixingBowl.x;
        //apple pieces
        randomSeed(appleSeed);
        for (let i = 0; i < 7; i++) {
            let x = random(-60, 60);
            let y = random(-60, 60);
            push();
            noStroke();
            fill(apple.color);
            ellipse(apple.x + x, apple.y + y, 20);
            pop();
        }

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

    //temperature bar
    push();
    noStroke();
    fill(ovenTemperature.color);
    rect(ovenTemperature.x, ovenTemperature.y, ovenTemperature.size.width, ovenTemperature.size.height);
    pop();

    //temperature goal
    push();
    noStroke();
    fill("green");
    rect(ovenTemperature.temperatureGoal.x, ovenTemperature.temperatureGoal.y, ovenTemperature.temperatureGoal.width, ovenTemperature.temperatureGoal.height);
    pop();

    //temperature toggle
    push();
    noStroke();
    fill(toggle.color);
    rect(toggle.x, toggle.y, toggle.size.width, toggle.size.height);
    pop();

    if (toggle.isAtRightTemp) {
        //game notes
        push();
        textAlign(CENTER, TOP);
        textSize(25);
        fill("black");
        textStyle(BOLD);
        text("Now patiently wait for the cake to bake...", canvas.width / 2, canvas.height - 75);
        pop();
    }
    else {
        //game notes
        push();
        textAlign(CENTER, TOP);
        textSize(25);
        fill("black");
        textStyle(BOLD);
        text("Move red toggle to the right temperature", canvas.width / 2, canvas.height - 75);
        pop();
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
    text("Catch apple with basket by sliding mouse left and right", canvas.width / 2, canvas.height - 150);
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
    text("YOU MADE A CAKE YAY\n\n Hope it didn't take \n too much of your time", canvas.width / 2, canvas.height / 2);
    pop();


}