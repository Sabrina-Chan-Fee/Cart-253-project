/**
 * The plank page
 * Sabrina Chan Fee
 * 
 * an explorotion of the existential angst of a novelist
 * 
 * the program is non-interactive to convey inability to start a project
 */

"use strict";
/**
 * Create the canva for our master piece
 */
//set up happens ONCE at the beginning o fthe program
function setup() {
    //create canvas at a stardar resoltuion
    createCanvas(640,640);
}

/**
 * draws the writers piece of paper
 */
//this happend every frame
function draw() {
    //pink destop
    background( "red");
    //the blank piece of paper

    push();
    fill("blue") ;
    stroke(255);
    ellipse(320,320,480);
    pop();

    push();
    fill("white");
    noStroke();
    ellipse( 320,320,140,140);
    pop();

    push();
    fill("#000000");
    noStroke();
    ellipse(320,320,20);
    pop();
}