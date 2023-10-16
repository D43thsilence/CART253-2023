/**
 * Needy love
 * Malcolm Siné Tadonki
 * 
 * This program animates through the usage of states and variables with a focus on distance. 
 * 
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
let player = {
  x: 0,
  y: 0,
  size: 120
}

// Sets up the bgColor javascript variable
let bgColor = {
  R: 255,
  G: 190,
  B: 190
}

// Sets up the range variable
let range = {
  distance: 0
}

// Sets up the proximityRange variable
let proximityRange = 90

// Sets up the attentionRange variable
let attentionRange = 370

// Sets up the needyGirlfriend javascript variable
let needyGirlfriend = {
  x: 0,
  y: 0,
  size: 120,
  speed: 3,
  vX: 1,
  vY: 1,
  aX: 0,
  aY: 0,
  acceleration: 0.2,
  maxSpeed: 3,
  fillR: 180,
  fillG: 0,
  fillB: 0,
  alpha: 255
}


/**
 * Description of setup
 * Sets up the canvas
*/
function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);

  // Sets up the initial position of the needy girlfriend
  needyGirlfriend.x = random(windowWidth / 4, windowWidth / 4 * 3)
  needyGirlfriend.y = windowHeight / 2

}


/**
 * Description of draw()
*/
function draw() {

  // Colors the background
  background(bgColor.R, bgColor.G, bgColor.B);
  backgroundColorVariation()
  console.log(bgColor.R)

  // Draws the title screen
  if (state === `title`) {
    titleScreen()
  }

  // Switches to the game's code
  else if (state === `attraction`) {
    attraction();
  }

  else if (state === `close`) {
    close();
  }
  else if (state === `requiring attention`) {
    requiringAttention();
  }

  // Draws the end screen
  else if (state === `endScreen`) {
    gameOver()
  }
}

function titleScreen() {
  textFont(`Elsie`)
  textSize(62);
  fill(255);
  text(`Attention seeking needy girlfriend.`, windowWidth / 2, windowHeight / 2);
}


function mouseClicked() {
  if (state === `title`) {
    state = `attraction`;
  }

}

function attraction() {
  backgroundColorVariation();
  needyGirlfriendCharacter();
  playerCharacter();
  mouseDragged();
  needyGirlfriendMovement();
  needyGirlfriendChase();
  distance();
  stateSwitch();
  gameEndConditions();
}

function close() {
  backgroundColorVariation();
  mouseDragged();
  needyGirlfriendSlowdown();
  needyGirlfriendMovement();
  needyGirlfriendCharacter();
  playerCharacter();
  distance();
  stateSwitch();
  gameEndConditions();
}

function requiringAttention() {
  backgroundColorVariation();
  needyGirlfriendCharacter();
  playerCharacter();
  mouseDragged();
  needyGirlfriendMovement();
  needyGrilfriendWalkAway();
  distance();
  stateSwitch();
  gameEndConditions();
}


function playerCharacter() {
  noStroke();
  fill(255, 0, 100)
  ellipse(player.x, player.y, player.size)

}

// Moves the player character
function mouseDragged() {
  player.x = mouseX;
  player.y = mouseY;
}

function distance() {
  // Determines the distance between the player and the girlfriend
  range.distance = dist(player.x, player.y, needyGirlfriend.x, needyGirlfriend.y);
}

function stateSwitch() {
  console.log(range.distance)
  //Determines whether to change state based on the distance
  if (range.distance < player.size / 2 + needyGirlfriend.size / 2 + proximityRange) {
    state = `close`
  }

  else if (range.distance <= player.size / 2 + needyGirlfriend.size / 2 + attentionRange) {
    state = `attraction`
  }

  else {
    state = `requiring attention`;
  }
}

function needyGirlfriendCharacter() {
  // Draws the needy Girlfriend
  noStroke();
  fill(255, 0, 100, needyGirlfriend.alpha)
  ellipse(needyGirlfriend.x, needyGirlfriend.y, needyGirlfriend.size, needyGirlfriend.size)
}

function needyGirlfriendMovement() {
  // Moves the needy Girlfriend
  needyGirlfriend.vX = needyGirlfriend.vX + needyGirlfriend.aX;
  needyGirlfriend.vY = needyGirlfriend.vY + needyGirlfriend.aY;
  needyGirlfriend.x = needyGirlfriend.x + needyGirlfriend.vX;
  needyGirlfriend.y = needyGirlfriend.y + needyGirlfriend.vY;
  needyGirlfriend.vX = constrain(needyGirlfriend.vX, -needyGirlfriend.maxSpeed, needyGirlfriend.maxSpeed);
  needyGirlfriend.vY = constrain(needyGirlfriend.vY, -needyGirlfriend.maxSpeed, needyGirlfriend.maxSpeed);
  needyGirlfriend.x = constrain(needyGirlfriend.x, 0, windowWidth);
  needyGirlfriend.y = constrain(needyGirlfriend.y, 0, windowHeight);
}

function needyGirlfriendChase() {
  // Adjusts the alpha of the girlfriend
  needyGirlfriend.alpha = needyGirlfriend.alpha + 1
  needyGirlfriend.alpha = constrain(needyGirlfriend.alpha, 0, 255)

  // Adjusts the acceleration to chase the player
  if (mouseX < needyGirlfriend.x) {
    needyGirlfriend.aX = -needyGirlfriend.acceleration;
  }

  else {
    needyGirlfriend.aX = needyGirlfriend.acceleration;
  }

  if (mouseY < needyGirlfriend.y) {
    needyGirlfriend.aY = -needyGirlfriend.acceleration;
  }

  else {
    needyGirlfriend.aY = needyGirlfriend.acceleration;
  }

}

function needyGirlfriendSlowdown() {
  // Adjusts the acceleration value differently
  needyGirlfriend.vX = needyGirlfriend.vX * 0.95;
  needyGirlfriend.vY = needyGirlfriend.vY * 0.95;
  needyGirlfriend.vX = constrain(needyGirlfriend.vX, -needyGirlfriend.maxSpeed, needyGirlfriend.maxSpeed);
  needyGirlfriend.vY = constrain(needyGirlfriend.vY, -needyGirlfriend.maxSpeed, needyGirlfriend.maxSpeed);
  needyGirlfriend.aX = 0;
  needyGirlfriend.aY = 0;
}

function needyGrilfriendWalkAway() {
  // Adjusts the acceleration to walk away from the player
  if (mouseX < needyGirlfriend.x) {
    needyGirlfriend.aX = needyGirlfriend.acceleration;
  }
  else {
    needyGirlfriend.aX = -needyGirlfriend.acceleration;
  }

  if (mouseY < needyGirlfriend.y) {
    needyGirlfriend.aY = needyGirlfriend.acceleration;
  }
  else {
    needyGirlfriend.aY = -needyGirlfriend.acceleration;
  };

  // Constrains the speed value of the girlfriend walking away
  needyGirlfriend.vX = constrain(needyGirlfriend.vX, -2, 2);
  needyGirlfriend.vY = constrain(needyGirlfriend.vY, -2, 2)

  // Progressively reduces the girlfriend's alpha
  needyGirlfriend.alpha = needyGirlfriend.alpha - 1
  needyGirlfriend.alpha = constrain(needyGirlfriend.alpha, 0, 180)

}

function backgroundColorVariation() {
  // Colors the background
  bgColor.R = constrain(bgColor.R, 190, 255)
  bgColor.B = constrain(bgColor.B, 190, 255)

  if (state === `attraction`) {
    bgColor.R = bgColor.R + 0.1
    bgColor.B = bgColor.B - 0.1
  }

  else if (state === `close`) {
    bgColor.R = bgColor.R + 0.1
    bgColor.B = bgColor.B - 0.1
  }
  else if (state === `requiring attention`) {
    bgColor.R = bgColor.R - 0.2
    bgColor.B = bgColor.B + 0.1
  }
}

function gameEndConditions() {
  // Determines and checks the game end conditions
  if (needyGirlfriend.x >= windowWidth) {
    state = `endScreen`
  }
  else if (needyGirlfriend.x <= 0) {
    state = `endScreen`
  }
  else if (needyGirlfriend.y >= windowHeight) {
    state = `endScreen`
  }
  else if (needyGirlfriend.y <= 0) {
    state = `endScreen`
  }
  else if (needyGirlfriend.alpha <= 0) {
    state = `endScreen`
  }
}

function gameOver() {
  // Draws the end screen
  textFont(`Elsie`)
  textSize(62);
  fill(225, 255.255);
  text(`She left... Forever...`, windowWidth / 2, windowHeight / 2);
}