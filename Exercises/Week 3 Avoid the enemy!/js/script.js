/**
 * Avoid the Enemy
 * Malcolm Siné Tadonki
 * 
 * The code here draws the player character, the enemy character and animates the background's color and both characters.
 */

"use strict";

let spyImage

/**
 * Description of preload
 * Preloads an image
*/
function preload() {
    spyImage = loadImage('assets/images/Incognito_Mode_Current.svg')
}

// Sets up the BgColor javascript variable
let BgColor = {
    R: 0,
    G: 0,
    B: 0
} 

// Sets up the playerCharacter javascript variable
let playerCharacter ={
    x:0,
    y:0,
    size:100
}

// Sets up the enemyAgent javascript variable
let enemyAgent = {
    x:0,
    y:30,
    size:150,
    speed:3,
    vX: 0,
    vY:0,
    aX:0,
    aY:0,
    acceleration:0.2,
    maxSpeed:10,
    fillR:180,
    fillG:0,
    fillB:0
}

// Sets up the distance javascript variable
let distance = {
 range: 0 
}

/**
 * Description of setup
 * Draws the canvas and sets up the initial position of the enemy agent
*/
function setup() {
    createCanvas (windowWidth,windowHeight);

    // let enemyAgent.y = enemyAgent.y = random (0,height)
    enemyAgent.x = random (0,windowWidth)
    enemyAgent.y = windowHeight


    
    }
    
    
/**
 * Description of draw()
 * Animates the enemy agent and adjusts the color of the background
*/
function draw() {
    noStroke()
    imageMode = CENTER

// Colors the background
    background (BgColor.R,BgColor.G,BgColor.B);
    
    BgColor.R = constrain (BgColor.R, 0, 180)
    BgColor.G = constrain (BgColor.G, 0, 180)
    BgColor.B = constrain (BgColor.B, 0, 180)
    
// Contains all conditions related to the mouseIsPressed variable coloring the background
    if (mouseIsPressed === true) {
        BgColor.R = BgColor.R + 5;
        // BgColor.G = BgColor.G + 5;
        // BgColor.B = BgColor.B + 5;
    }
    else {
        BgColor.R = BgColor.R - 1;
        // BgColor.G = BgColor.G - 1;
        // BgColor.B = BgColor.B - 1;
    }
    
// Adjusts the constraints of the player character
    playerCharacter.size = constrain (playerCharacter.size, 50, 100);
    

// Adjusts the constraints and size of the enemy agent
    enemyAgent.size = constrain (enemyAgent.size, 150, 800);
    enemyAgent.size = enemyAgent.size + 0.5;
    

// Calculates movement with the added acceleration
    enemyAgent.vX = enemyAgent.vX + enemyAgent.aX;
    enemyAgent.vY = enemyAgent.vY + enemyAgent.aY;

// Moves the enemy agent
    enemyAgent.x = enemyAgent.x + enemyAgent.vX;
    enemyAgent.y = enemyAgent.y + enemyAgent.vY;
    enemyAgent.vX = constrain (enemyAgent.vX, -enemyAgent.maxSpeed, enemyAgent.maxSpeed);
    enemyAgent.vY = constrain (enemyAgent.vY, -enemyAgent.maxSpeed, enemyAgent.maxSpeed);
    enemyAgent.x = constrain (enemyAgent.x, 0,windowWidth);
    enemyAgent.y = constrain (enemyAgent.y, 0,windowHeight);

// Adjusts the acceleration value
    if (mouseX < enemyAgent.x){
        enemyAgent.aX= -enemyAgent.acceleration;
    }

    else{
        enemyAgent.aX=enemyAgent.acceleration;
    }
    
    if (mouseY < enemyAgent.y){
        enemyAgent.aY=-enemyAgent.acceleration;
    }

    else{
        enemyAgent.aY=enemyAgent.acceleration;
    }

// Draws the player character
fill (180,180,180)   
ellipse (playerCharacter.x,playerCharacter.y,playerCharacter.size);

// Draws the enemy agent
fill (enemyAgent.fillR,enemyAgent.fillG,enemyAgent.fillB);
ellipse(enemyAgent.x,enemyAgent.y,enemyAgent.size);

// Determines wether the agent has reached the player or not and when to stop the program

    distance.range = dist (playerCharacter.x, playerCharacter.y, enemyAgent.x, enemyAgent.y);
    console.log (distance.range)

    if (distance.range  < playerCharacter.size/2 + enemyAgent.size/2) {
        noLoop()
    }

    else{
        loop()
    }

    image(spyImage, windowWidth/2, windowHeight/2,200,200);
}

// Moves the player character
function mouseDragged() {
    playerCharacter.x = mouseX;
    playerCharacter.y = mouseY;
    playerCharacter.size = playerCharacter.size +5;
    
}

function mouseWheel() {
    playerCharacter.size = playerCharacter.size - 5;
    enemyAgent.size = enemyAgent.size - 5;
}

// Transparency ver.A
// let sinValue = (sin (square.AlphaAngle)
// square.fill.a = map (sinValue, -1,1, 0,255)
// square.alphaAngle +=1
// fill (R,G,B,square.fill.a)
// rect(x,y,size)

// Transparence ver.B
// square.fill.a += square.alphaChange
// if (square.fill.a =>255) {
// square.alphaChange = square.alphaChange -1
// }
// else if (square.fill.a <= 0) {
    // square.alphaChange *=-1
// }