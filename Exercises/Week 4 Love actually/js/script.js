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

// Sets the initial title state
  let state = `title`;

  // Sets up the player javascript variable
  let player ={
    x:0,
    y:0,
    size:120
  }

// Sets up the BgColor javascript variable
  let BgColor = {
    R: 0,
    G: 0,
    B: 0
  }

  // Sets up the range variable
  let range = {
    distance: 0
  }

// Sets up the needyGirlfriend javascript variable
let needyGirlfriend = {
  x:0,
  y:0,
  size:120,
  speed:3,
  vX: 0,
  vY:0,
  aX:0,
  aY:0,
  acceleration:0.2,
  maxSpeed:10,
  fillR:180,
  fillG:0,
  fillB:0,
  alpha:255
}


/**
 * Description of setup
 * Sets up the canvas
*/
function setup() {
  createCanvas (windowWidth,windowHeight);
  background (255,255,255);
  textAlign(CENTER,CENTER);

  // Sets up the initial position of the needy girlfriend
  needyGirlfriend.x = random (0,windowWidth)
  needyGirlfriend.y = windowHeight/2

}


/**
 * Description of draw()
*/
function draw() {
  backgroundColorVariation()

// Draws the title screen
  if (state === `title`){
    titleScreen()
  }
  
// Switches to the game's code
  else if (state === `game`) {
    needyGirlfriendCharacter()
    playerCharacter()
    mouseDragged()
    distance()

    else if (state === `game`)
    state === `attraction`

    else if (state === `attraction`) {
      needyGirlfriendMovement()
    }

    else if (state === `close`) {}


    else if (state === `requiring attention`) {}

    else if

  }


  


if (needyGirlfriend.alpha <= 0){
  state = `endScreen`
}
  
// Draws the end screen
  else if (state === `endScreen`){
    gameOver()
    noloop()

}  

}


function titleScreen(){
  textSize(32);
  fill (255);
  text(`Attention seeking needy girlfirend`, windowWidth/2, windowHeight/2);
}


function mouseClicked(){
  if (state === `title`){
    state = `game`
  }
  
}

function playerCharacter(){
  noStroke();
  fill(255,0,100)
  ellipse (player.x, player.y, player.size)
  
}

// Moves the player character
function mouseDragged() {
  player.x = mouseX;
  player.y = mouseY;
}


function needyGirlfriendCharacter(){
  noStroke();
  fill(255,0,100)
  ellipse (needyGirlfriend.x, needyGirlfriend.y, needyGirlfriend.size, needyGirlfriend.size, needyGirlfriend.alpha)
}

function needyGirlfriendMovement(){

// Moves the needy Girlfriend
  needyGirlfriend.x = needyGirlfriend.x + needyGirlfriend.vX;
  needyGirlfriend.y = needyGirlfriend.y +needyGirlfriend.vY;
  needyGirlfriend.vX = constrain (needyGirlfriend.vX, -needyGirlfriend.maxSpeed, needyGirlfriend.maxSpeed);
  needyGirlfriend.vY = constrain (needyGirlfriend.vY, -needyGirlfriend.maxSpeed, needyGirlfriend.maxSpeed);
  needyGirlfriend.x = constrain (needyGirlfriend.x, 0,windowWidth);
  needyGirlfriend.y = constrain (needyGirlfriend.y, 0,windowHeight);

// Adjusts the acceleration value
  if (mouseX < needyGirlfriend.x){
  needyGirlfriend.aX= -needyGirlfriend.acceleration;
  }

  else{
    needyGirlfriend.aX=needyGirlfriend.acceleration;
  }

  if (mouseY < needyGirlfriend.y){
    needyGirlfriend.aY=-needyGirlfriend.acceleration;
  }

  else{
    needyGirlfriend.aY=needyGirlfriend.acceleration;
  }
}

function distance(){
  // Determines if the girlfriend is too far and switches states
    range.distance = dist (player.x, player.y, needyGirlfriend.x, needyGirlfriend.y);
    console.log (range.distance )

    if (range.distance > playerCharacter.size/2 + needyGirlfriend.size/2 + 10) {
        state = `attracted`
    }

    else if (range.distance > playerCharacter.size/2 + needyGirlfriend.size/2 + 100){
        state = `close`
    }

    else{ 
      state = `requiring attention`
    }

}

function backgroundColorVariation() {
  // Colors the background
    background (BgColor.R,BgColor.G,BgColor.B);
    BgColor.R = constrain (BgColor.R, 0, 180)
    BgColor.G = constrain (BgColor.G, 0, 180)
    BgColor.B = constrain (BgColor.B, 0, 180)

}


function gameOver(){
  // Draws the end screen
    textSize(32);
    fill (225);
    text(`She left... Forever...`, windowWidth/2, windowHeight/2);
}



/**
 * Description of parallels()
 * Draws parallel lines
*/
function parallels(x, y, numLines, lineThickness, lineHeight, lineSpacing) {
    for (let i = 0; i < numLines; i++) {
      noStroke();
      let lineFill = map(i, 0, numLines, 0, 255);
      fill(lineFill);
      rectMode(CENTER);
      rect(x, y, lineThickness, lineHeight);
      x = x + lineSpacing;
    }
  }