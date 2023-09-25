/**
 * Title of Project
 * Author Name
 * 
 * This is a template. You must fill in the title, author, 
 * and this description to match your project!
 */

"use strict";

/**
 * Description of preload
*/
function preload() {

}

let circle = {
    x: 0,
    y: 450,
    size: 100,
    speed:3
}

let BgColor = {
    R: 0,
    G: 0,
    B: 0
} 
let originalPosition = true
let moveCharacter = false

let playerCharacter ={
    x1:0,
    y1:0,
    x:0,
    y:0,
    size:100
}

let enemyAgent = {
    x:0,
    y:30,
    size:150,
    speed:5,
    vX: 0,
    vY:0,
    fillR:255,
    fillG:0,
    fillB:0
}

/**
 * Description of setup
*/
function setup() {
    createCanvas (windowWidth,windowHeight);

    // let enemyAgent.y = enemyagent.y = random (0,height)
    enemyAgent.x = random (0,windowWidth)

    }
    
    
    
    /**
     * Description of draw()
    */
    function draw() {
    
    noStroke()

    // Colors the background
    background (BgColor.R,BgColor.G,BgColor.B);
    
    constrain (BgColor.R, 0, 255)
    constrain (BgColor.G, 0, 255)
    constrain (BgColor.B, 0, 255)
    
    if (mouseIsPressed === true) {
        BgColor.R = BgColor.R + 10;
        BgColor.G = BgColor.G + 10;
        BgColor.B = BgColor.B + 10;
    }
    else {
        BgColor.R = BgColor.R - 1;
        BgColor.G = BgColor.G - 1;
        BgColor.B = BgColor.B - 1;
    }
    
    // draws the enemy agent
    
    fill (enemyAgent.fillR,enemyAgent.fillG,enemyAgent.fillB)
    ellipse(enemyAgent.x,enemyAgent.y,enemyAgent.size)



    fill (255,255,255)
    // Draws and moves the player character
    
    

    if (mouseIsPressed === true) {
        originalPosition === false
        moveCharacter = true;
    }
    else{
        originalPosition === true
        moveCharacter = false;
        playerCharacter.x1 = windowWidth/2
        playerCharacter.y1 = windowHeight
        ellipse (playerCharacter.x1,playerCharacter.y1,playerCharacter.size)
    }

    if (moveCharacter === true) {
        playerCharacter.x = mouseX;
        playerCharacter.y = mouseY;
        ellipse (playerCharacter.x,playerCharacter.y,playerCharacter.size)
    }
    
}