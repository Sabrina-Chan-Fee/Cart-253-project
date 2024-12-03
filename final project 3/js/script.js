/**
 * Apple cake making 
 * By Sabrina Chan Fee
 * 
 * A game where the player picks apples, make a cake batter and bakes a cake
 * 
 * Controls: 
 * - slid emouse left to right to move basket and cath the falling apple
 * - click and drag apple into the cake batter nad move mouse around to mix
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
    size: {
        ripe: 60,
        unripe: 20,
    },

    // color Ripe red
    colorRipe: {
        r: 255,
        g: 0,
        b: 0,
    },

    //color apple unripe green
    colorUnripe: {
        r: 141,
        g: 182,
        b: 0,
    },

    ripeness: 0,
    growth: 0,
    speed: 3,

    isRotten: false,
    inBasket: false,
    inMixingBowl: false,
    dragging: false,

    stateOfApple: "growing" //growing/ripenning/falling

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

//cake batter
const cakeBatter = {
    // position
    x: canvas.width / 3,
    y: canvas.height / 3,

    //size
    size: 260,

    // color
    color: {
        r: 180,
        g: 150,
        b: 120,
    },

    mixingCompletion: 0,
    state: "no_mixing", //either mixing, no_mixing, keep_mixing

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

//cake in the oven
const cake = {
    // position
    x: canvas.width / 3,
    y: canvas.height / 2.5,

    //size
    size: {
        width: 200,
        height: 150,
    },

    // color
    colorRaw: {
        r: 222,
        g: 184,
        b: 135,
    },

    colorCook: {
        r: 154,
        g: 88,
        b: 23,
    },
    bakedness: 0,
    state: "raw" //either be raw, baking
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
        //display ending message
        gameOverScreen();
    }

}

/**
 * use keys to start the game
 */
function keyPressed() {
    if (state === "applePickingInstruction" && key == "s" && keyIsPressed) {//press space bar to start the game
        state = "applePick";
    }
}

// let apple grown then ripen to red color then fall and let use catch fallen apple using basket
function applePicking() {
    //draw the tree and apple
    drawTree();

    //make apple grow to the right size
    setTimeout(growApple, 1000);

    //when the apple is at the right size wait for apple to ripen and turn red
    if (apple.size.unripe >= apple.size.ripe) {
        apple.stateOfApple = "ripening";
        ripenApple();
    }
    //when apple is half way ripen displain falling message
    if (apple.ripeness >= 0.5) {
        (apple.stateOfApple = "falling");
    }
    //once apple is red wait for it to fall of the tree so user can catch it
    if (apple.ripeness >= 1) {
        moveApple();
        catchApple();
    }

    //move basket on the x axis
    tree.basket.x = mouseX - tree.basket.sizeWidth / 2;
}

//click and drag apple into the cake batter then mix the cake batter
function makeBatter() {
    drawKitchen();

    // drag apple into the bowl
    if (apple.dragging) {
        apple.x = mouseX;
        apple.y = mouseY;
    }

    //mix apple and cake batter into the bowl
    if (apple.inMixingBowl) {
        cakeBatter.state = "mixing";
        mixingCakeBatterWithMouse()
    }

    //once cake batter has been mixed enought start the oven baking game
    if (cakeBatter.mixingCompletion >= 1) {
        setTimeout(() => { state = "ovenTime" }, 100);
    }
}

//click and drag the toggle to the right oven temp and watch the cake bake
function ovenCake() {
    //draw the oven 
    drawOven();

    //drag toggle left to right to set oven to the right temp
    if (toggle.dragging) {
        toggle.x = mouseX;
    }
    // distance between the toggle and the right oven temp
    const distanceFromToggleAndTempGoal = ovenTemperature.temperatureGoal.x - toggle.x;

    //once the correct temp is set start baking the cake
    if (distanceFromToggleAndTempGoal < 10 && distanceFromToggleAndTempGoal > -10) {
        setTimeout(() => { toggle.isAtRightTemp = true }, 500);
        setTimeout(bakeCake, 1000);
    }

}

//change color of bake as it bakes
function bakeCake() {

    cake.bakedness += 0.0005;

    //change color
    cake.colorRaw.r = map(cake.bakedness, 0, 100, cake.colorRaw.r, cake.colorCook.r);
    cake.colorRaw.g = map(cake.bakedness, 0, 100, cake.colorRaw.g, cake.colorCook.g);
    cake.colorRaw.b = map(cake.bakedness, 0, 100, cake.colorRaw.b, cake.colorCook.b);

    //once at the right color display game over message
    if (cake.bakedness >= 1) {
        toggle.dragging = false;
        setTimeout(() => { state = "gameOver" }, 500);
    }
    //when half way baked display a baking message
    else if (cake.bakedness > 0.5) {
        cake.state = "baking";
    }
}
/**
 * Be able to click and drag apple into the cake batter or click and drag toggle to set oven at right temp
 */
function mousePressed() {

    //distance between the mouse and the center of the apple
    const distanceFromMouseAndApple = dist(mouseX, mouseY, apple.x, apple.y);
    //see when mouse is considered overlapping
    const mouseOverlapApple = (distanceFromMouseAndApple < apple.size.ripe / 2);
    //drag apple into the cake batter
    if (mouseOverlapApple && state === "makeBatter") {
        apple.dragging = true;
    }

    //distance between the mouse and the temperature toggle
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
    const distance = dist(cakeBatter.x, cakeBatter.y, apple.x, apple.y);
    //see when mouse is considered overlapping
    const appleOverlapCakeBatter = (distance <= cakeBatter.size / 2);
    //stop dragging when mouse is released and apple is in the bowl
    if (appleOverlapCakeBatter) {
        apple.inMixingBowl = true;
    }

    //stop dragging when mouse is release
    toggle.dragging = false;

}

/**
 * Change to various cake batter color while user is mixing the bowl
 */
function mixingCakeBatterWithMouse() {

    //distance between the mouse and the center of the cake batter
    const distanceMouseToCake = dist(mouseX, mouseY, cakeBatter.x, cakeBatter.y);
    //see when mouse is considered overlapping
    const mouseOverlapsCakeBatter = (distanceMouseToCake < cakeBatter.size / 2);
    //check if teh mouse is movign continuously 
    const mouseIsMoving = (movedX !== 0 || movedY !== 0);

    //if the mouse is moving in the bowl and all the ingredients have been added then change color
    if (mouseOverlapsCakeBatter && mouseIsMoving) {
        cakeBatter.mixingCompletion += 0.001;
        //change color of batter when mixed
        cakeBatter.color.r = map(mouseX, 0, canvas.width, 0, 240);
        cakeBatter.color.g = map(mouseX, 0, canvas.height, 0, 100);
        cakeBatter.color.b = map(mouseY, 0, canvas.width, 0, 50);
    }
    //display keep_mixing message once user is half way into the mixing
    if (cakeBatter.mixingCompletion >= 0.5) {
        cakeBatter.state = "keep_mixing";
    }

}

//catch apple with basket
function catchApple() {
    //distance between the apple and the center of the basket
    const distance = dist(tree.basket.x + tree.basket.sizeWidth / 2, tree.basket.y, apple.x, apple.y);
    //see when basket and apple is considered overlapping
    const mouseOverlap = (distance <= apple.size.ripe / 2);

    // check if the apple is in the basket
    if (mouseOverlap && state === "applePick") {
        apple.inBasket = true;
        setTimeout(() => { state = "makeBatter" }, 1000); //when apple was caught start the cake batter game
    }
}

//make apple fall from the tree
function moveApple() {
    //make apple fall
    apple.y += apple.speed;

    //when the apple touches the ground reset back up to the tree
    if (apple.y >= tree.grass.y - apple.size.ripe / 2) {
        apple.y = 100;
    }
}

//change apple size from small unripe to ripe
function growApple() {
    apple.growth += 0.001
    apple.size.unripe = map(apple.growth, 0, 1, apple.size.unripe, apple.size.ripe);
}

// Change color of apple from green to red
function ripenApple() {
    apple.ripeness += 0.002;
    apple.colorUnripe.r = map(apple.ripeness, 0, 1, apple.colorUnripe.r, apple.colorRipe.r);
    apple.colorUnripe.g = map(apple.ripeness, 0, 1, apple.colorUnripe.g, apple.colorRipe.g);
    apple.colorUnripe.b = map(apple.ripeness, 0, 1, apple.colorUnripe.b, apple.colorRipe.b);
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
        fill(apple.colorUnripe.r, apple.colorUnripe.g, apple.colorUnripe.b);
        ellipse(apple.x, apple.y, apple.size.unripe);
        pop();
    } else {
        push();
        noStroke();
        fill(apple.colorRipe.r, apple.colorRipe.g, apple.colorRipe.b);
        ellipse(tree.basket.x + 50, tree.basket.y, apple.size.unripe);
        pop();
    }

    //basket
    push();
    noStroke();
    fill("orange");
    rect(tree.basket.x, tree.basket.y, tree.basket.sizeWidth, tree.basket.sizeHeight)
    pop();

    //game message depending on state
    if (apple.stateOfApple == "growing") {
        push();
        textAlign(CENTER, TOP);
        textSize(25);
        fill("white");
        text("hmm the apple doesn't see ripe yet", canvas.width / 2, canvas.height - 40);
        pop();
    }
    else if (apple.stateOfApple == "ripening") {
        push();
        textAlign(CENTER, TOP);
        textSize(25);
        fill("white");
        text("let's wait a little while longer", canvas.width / 2, canvas.height - 40);
        pop();
    } else {//apple.stateOfApple == "falling"
        push();
        textAlign(CENTER, TOP);
        textSize(25);
        fill("white");
        text("Who knows? One day the apple will fall...", canvas.width / 2, canvas.height - 40);
        pop();
    }
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

    //batter
    push();
    noStroke();
    fill(cakeBatter.color.r, cakeBatter.color.g, cakeBatter.color.b);
    ellipse(cakeBatter.x, cakeBatter.y, cakeBatter.size);
    pop();

    //game message
    if (cakeBatter.state == "mixing") {
        push();
        textAlign(CENTER, BASELINE);
        textSize(25);
        fill("black");
        text("Move mouse to mix the batter", canvas.width / 2, canvas.height - 75);
        pop();
    }
    else if (cakeBatter.state == "keep_mixing") {
        push();
        textAlign(CENTER, BASELINE);
        textSize(25);
        fill("black");
        text("keep mixing for a long long time..", canvas.width / 2, canvas.height - 75);
        pop();
    }
    else {
        push();
        textAlign(CENTER, BASELINE);
        textSize(25);
        fill("black");
        text("Click and drag the apple into the cake batter", canvas.width / 2, canvas.height - 75);
        pop();
    }

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
        fill(apple.colorRipe.r, apple.colorRipe.g, apple.colorRipe.b);
        ellipse(apple.x, apple.y, apple.size.ripe);
        pop();
    } else { //display apple piece in batter
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
            fill(apple.colorRipe.r, apple.colorRipe.g, apple.colorRipe.b);
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

    //game message depending on the state
    if (toggle.isAtRightTemp && cake.state == "raw") {
        //game notes
        push();
        textAlign(CENTER, TOP);
        textSize(25);
        fill("black");
        text("Now patiently wait for the cake to bake...", canvas.width / 2, canvas.height - 75);
        pop();
    }
    else if (toggle.isAtRightTemp && cake.state == "baking") {
        //game notes
        push();
        textAlign(CENTER, TOP);
        textSize(25);
        fill("black");
        text("I wonder.. will the cake burn ?...", canvas.width / 2, canvas.height - 75);
        pop();
    }
    else {
        //game notes
        push();
        textAlign(CENTER, TOP);
        textSize(25);
        fill("black");
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