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
let ellipseXPosition = 450;
let ellipseYPosition = 450;
let ellipseSize = 200;
let altEllipseSize = 100;
let ellipseFill = 0;
let mouthMouvement = 30;

let rectXPosition = 450;
let rectYPosition = 450;
let rectXMove = 0

let hexXPosition;
let hexYPosition;

let circleSize = 50;
let circleFill = 0

// Sets up the javascript object

    // let ellipseData = {
    // x: 100,
    // y: 150,
    // size: 50,
    // speed: 2
    // };


/**
 * Description of setup
 * Creates the canvas
*/
function setup() {
createCanvas(900,900);
noStroke();


}


/**
 * Description of draw()
 * Draws, fills, sets random numbers and animates the shapes
*/
function draw() {
    background(255,205,100);

    // Calculates the randomNumber value
    let randomNumber = random (-5,5);

    // Draws the rectangle in the background
    fill(175, 100, 0);
    rectMode(CENTER);
    // rectXPosition = rectXPosition + 2;
    rectXPosition = constrain(rectXPosition,0,850);
    rect(rectXPosition,rectYPosition,height,width);

    fill(255,205,100);
    rect(rectXPosition,rectYPosition,800,600);
    
    // Draws the character
    fill(80, 100, 0);
    ellipse(450, 900 ,800,500);
    ellipse(450, 450 ,500,500);
    mouthMouvement = mouthMouvement + randomNumber
    mouthMouvement = constrain (mouthMouvement,10,50)
    fill(0, 0, 0);
    ellipse(450, 620 ,100, mouthMouvement);

    // Draws the moving Eye
    ellipseMode(CENTER)
    ellipseFill = random (0,255);
    fill(ellipseFill);
    ellipse(ellipseXPosition, ellipseYPosition ,ellipseSize);

    
    fill(255,205,100);
    altEllipseSize = altEllipseSize + randomNumber;
    altEllipseSize = constrain(altEllipseSize,80,120);
    ellipseXPosition = ellipseXPosition + randomNumber;
    ellipseXPosition = constrain (ellipseXPosition, 380,510)
    ellipse(ellipseXPosition, ellipseYPosition ,altEllipseSize,200);

    // Draws the circle that follows your mouse
    fill(255, 100, 0)
    circleSize = map(mouseX,width,0,100,300);
    circle (mouseX, mouseY, circleSize);
   


}