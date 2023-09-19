/**
 * Conversation with a foreign entity
 * Malcolm Siné Tadonki
 * 
 * This is my project for the I like to move it! exercise where I animate shapes and colors.
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

let circleSize = 50;
let circleFill = 0

// Sets up the javascript object lineData
let lineData ={

    x1:0,
    y1:0,
    x2:0,
    y2:900,
    x3:900,
    x4:900,
    lineMove: 5,
    lineFill: 255
};

/**
 * Description of setup
 * Creates the canvas
*/
function setup() {
    // Creates the canvas
    createCanvas(900,900);
    

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
    rect(rectXPosition,rectYPosition,height,width);

    fill(255,205,100);
    rect(rectXPosition,rectYPosition,700,700);

    // draws lines moving in the background and change their color
    lineData.lineFill =map(mouseX,width, 0,10,255);
    stroke(lineData.lineFill);
    strokeWeight(30);
    lineData.x1 = lineData.x1 + lineData.lineMove;
    lineData.x2 = lineData.x2 + lineData.lineMove;
    lineData.x1 = constrain(lineData.x1,0,900);
    lineData.x2 = constrain(lineData.x2,0,900);
    line(lineData.x1, lineData.y1, lineData.x2, lineData.y2);
    
    stroke(lineData.lineFill);
    strokeWeight(30);
    lineData.x3 = lineData.x3 - lineData.lineMove;
    lineData.x4 = lineData.x4 - lineData.lineMove;
    lineData.x3 = constrain(lineData.x3,0,900);
    lineData.x4 = constrain(lineData.x4,0,900);
    line(lineData.x3, lineData.y2, lineData.x4, lineData.y1);
    
    
    // Draws the character and animates his mouth
    noStroke();
    fill(80, 100, 0);
    ellipse(450, 900 ,800,500);
    ellipse(450, 450 ,500,500);
    mouthMouvement = mouthMouvement + randomNumber
    mouthMouvement = constrain (mouthMouvement,10,50)
    fill(0, 0, 0);
    ellipse(450, 620 ,100, mouthMouvement);

    // Draws the moving Eye of the character
    ellipseMode(CENTER)
    ellipseFill = random (200,255);
    fill(ellipseFill);
    ellipse(ellipseXPosition, ellipseYPosition ,ellipseSize);

    fill(255,205,100);
    altEllipseSize = altEllipseSize + randomNumber;
    altEllipseSize = constrain(altEllipseSize,80,120);
    ellipseXPosition = ellipseXPosition + randomNumber;
    ellipseXPosition = constrain (ellipseXPosition, 380,510)
    ellipse(ellipseXPosition, ellipseYPosition ,altEllipseSize,200);

    // Draws the circle that follows your mouse and changes it<s color
    circleFill =map(mouseX,width, 0,50,255)
    fill(lineData.lineFill)
    circleSize = map(mouseX,width,0,100,300);
    circle (mouseX, mouseY, circleSize);
   


}