/**
 * I like to move it!
 * Malcolm Siné Tadonki
 * 
 * This is my project for the I like to move it! exercise where I make shapes and animations move
 */

"use strict";

/**
 * Description of preload
 * does nothing
*/
function preload() {

}

// Sets up each variable
let ellipseXPosition = 100;
let ellipseYPosition = 150;
let ellipseSize = 50;
let altEllipseSize = 25;
let ellipseXMove = 2;

let rectXPosition = 100;
let rectYPosition = 300;

let hexXPosition;
let hexYPosition;

let circleSize = 50;

// Sets up the javascript object

    // let ellipseData = {
    x: 100
    y: 150
    size: 50
    speed: 2
    // };


/**
 * Description of setup
 * Creates the canvas
*/
function setup() {
createCanvas(900,900);

}


/**
 * Description of draw()
 * Draws, fills and animates the shapes
*/
function draw() {
    background(255,205,100)
    fill(100, 204, 0)
    // ellipseSize += 1
    // ellipseXPosition += ellipseXMove
    ellipse(ellipseXPosition, ellipseYPosition ,ellipseSize);

    fill(255,205,100)
    // altEllipseSize = altEllipseSize + 1.40
    ellipse(ellipseXPosition, ellipseYPosition ,altEllipseSize);

    fill(255, 204, 0)   
    rect(rectXPosition,rectYPosition,150,150);

    fill(255, 100, 0)
    // circleSize = circleSize + 3
    circle (mouseX, mouseY, circleSize)
   


}