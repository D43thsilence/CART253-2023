/**
 * Avoid the Enemy
 * Malcolm Siné Tadonki
 * 
 * The code here draws the player character, the enemy character and animates the background's color and both characters.
 */

"use strict";

/**
 * Description of preload
 * Does nothing
*/
function preload() {

}

let BgColor = {
    R: 0,
    G: 0,
    B: 0
} 

let playerCharacter ={
    x:0,
    y:0,
    size:100
}

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
    fillR:225,
    fillG:0,
    fillB:0
}

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

// Colors the background
    background (BgColor.R,BgColor.G,BgColor.B);
    
    BgColor.R = constrain (BgColor.R, 0, 225)
    BgColor.G = constrain (BgColor.G, 0, 225)
    BgColor.B = constrain (BgColor.B, 0, 225)
    
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
    
// Draws the initial position of the player character
fill (180,180,180)   
playerCharacter.size = constrain (playerCharacter.size, 50, 100);
ellipse (playerCharacter.x,playerCharacter.y,playerCharacter.size);

// Draws and animates the enemy agent
    enemyAgent.size = constrain (enemyAgent.size, 150, 200);
    fill (enemyAgent.fillR,enemyAgent.fillG,enemyAgent.fillB);
    ellipse(enemyAgent.x,enemyAgent.y,enemyAgent.size);

    // Calculates movement with the added acceleration
    enemyAgent.vX = enemyAgent.vX + enemyAgent.aX;
    enemyAgent.vY = enemyAgent.vY + enemyAgent.aY;

    // Moves the enemy agent
    enemyAgent.x = enemyAgent.x + enemyAgent.vX;
    enemyAgent.y = enemyAgent.y + enemyAgent.vY;
    enemyAgent.vX = constrain (enemyAgent.vX, -enemyAgent.maxSpeed, enemyAgent.maxSpeed);
    enemyAgent.vY = constrain (enemyAgent.vY, -enemyAgent.maxSpeed, enemyAgent.maxSpeed);

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

// Determines wether the agent has reached the player or not and when to stop the program

distance.range = dist (playerCharacter.x, playerCharacter.y, enemyAgent.x, enemyAgent.y)
// console.log (distance.range)

if (distance.range < enemyAgent.size/2) {
    noLoop()
}

else{
    loop()
}


}

// Moves the player character
function mouseDragged() {
    playerCharacter.x = mouseX;
    playerCharacter.y = mouseY;
    playerCharacter.size = playerCharacter.size +5;
    enemyAgent.size = enemyAgent.size + 5;
}

function mouseWheel() {
    playerCharacter.size = playerCharacter.size - 5;
    enemyAgent.size = enemyAgent.size - 5;
}