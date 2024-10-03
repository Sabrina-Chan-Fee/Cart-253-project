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

