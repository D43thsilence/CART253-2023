/**
 * Avoid the Enemy
 * Malcolm Siné Tadonki
 * 
 * The code here draws the player character, the intelligence, the enemy characters and counts the freeze time and intelligence gathered.
 */

"use strict";

// Sets up the spyImage javascript variable
let spyImage;

// Sets up the enemyAgentImage javascript variable
let enemyAgentImage;

/**
 * Description of preload
 * Preloads an image
*/
function preload() {
    spyImage = loadImage('assets/images/Incognito_Mode_Current.png')
    enemyAgentImage = loadImage('assets/images/Incognito_Mode_Current_Enemy.png')
}

// Sets up the initial state
let state = `title`;

// Sets up the BgColor javascript variable
let BgColor = {
    R: 120,
    G: 120,
    B: 80
}

// Sets up the playerCharacter javascript variable
let playerCharacter = {
    x: 30,
    y: 30,
    size: 150
}

// Sets up the intelligence count variable
let intelligenceCount = 0;

// Sets up the freeze related variables
let freezeCount = 0;
let roundOffFreezeCount;

// Sets up the enemyAgent1 javascript variable
let enemyAgent1 = {
    x: 0,
    y: 30,
    size: 120,
    maxSpeed: 2,
    vX: 0,
    vY: 0,
    aX: 0,
    aY: 0,
    acceleration: 0.2,
    fillR: 180,
    fillG: 0,
    fillB: 0
}

// Sets up the enemyAgent2 javascript variable
let enemyAgent2 = {
    x: 0,
    y: 30,
    size: 120,
    maxSpeed: 4,
    vX: 0,
    vY: 0,
    aX: 0,
    aY: 0,
    acceleration: 0.2,
    fillR: 180,
    fillG: 0,
    fillB: 0
}

// Sets up the enemyAgent3 javascript variable
let enemyAgent3 = {
    x: 0,
    y: 30,
    size: 120,
    maxSpeed: 3,
    vX: 0,
    vY: 0,
    aX: 0,
    aY: 0,
    acceleration: 0.2,
    fillR: 180,
    fillG: 0,
    fillB: 0
}

// Sets up the intelligence01 javascript variable
let intelligence01 = {
    x: 0,
    y: 0,
    size: 100
}

// Sets up the intelligence02 javascript variable
let intelligence02 = {
    x: 0,
    y: 0,
    size: 100
}

// Sets up the intelligence03 javascript variable
let intelligence03 = {
    x: 0,
    y: 0,
    size: 100
}

// Sets up the distance javascript variable
let distance = {
    range1: 0,
    range2: 0,
    range3: 0,
    range4: 0,
    range5: 0,
    range6: 0,
}

/**
 * Description of setup
 * Draws the canvas and sets up the initial position of the enemy agents and traps
*/
function setup() {
    // Creates the canvas
    createCanvas(windowWidth, windowHeight);

    // Sets up the initial position of the enemies and intelligence
    enemySetup()
    intelligenceSetup()
}

/**
 * Description of draw()
 * Draws the player character, intelligence and animates the enemy agents.
*/
function draw() {

    // Eliminates strokes
    noStroke()

    // Draws the title screen
    if (state === `title`) {
        titleScreen()
    }
    // Runs the game state
    else if (state === `game`) {
        backgroundColor()
        gameInfo()
        dangerDistance()
        intelligencePickup()
        holdUp()
        freezeLimit()
        intelligence()
        playerMovement()
        playerAgent()
        enemies()
        enemyMovement()
        gameEndConditions()
    }
    // Runs the freeze state
    else if (state === `freeze`) {
        backgroundColor()
        gameInfo()
        dangerDistance()
        gameEndConditions()
        holdUp()
        freezeLimit()
        intelligenceSetup()
        playerAgent()
        enemies()
        playerMovement()
        gameEndConditions()
    }

    // Draws the end screens
    else if (state === `endScreen`) {
        gameOver();
    }

    else if (state === `winScreen`) {
        gameComplete();
    }
}


function titleScreen() {

    // Draws the title screen
    textFont(`Black Ops One`);
    backgroundColor();
    textAlign(CENTER);
    textSize(62);
    fill(0);
    text(`Gather the intelligence!`, windowWidth / 2, windowHeight / 2);
    fill(150, 150, 255);
    textAlign(CENTER);
    textSize(25);
    text(`Move with the arrow keys and use the F key to freeze the enemy and relocate yourself. But don't let the freeze count reach 100!`, windowWidth / 2, windowHeight / 2 + 100);
    fill(0, 0, 0)
    textSize(30)
    text(`Click to start!`, windowWidth / 2, windowHeight / 2 + 180);

    fill(100, 200, 50);
    ellipse(windowWidth / 8, windowHeight / 2 - 90, 100);
    textAlign(CENTER);
    textSize(20);
    fill(100, 200, 50);
    text(`This is intelligence`, windowWidth / 8, windowHeight / 2);

    image(enemyAgentImage, windowWidth / 4 * 3.2, windowHeight / 2 - 150, 120, 120);
    textAlign(CENTER);
    textSize(20);
    fill(150, 0, 0);
    text(`This is the enemy`, windowWidth / 4 * 3.33, windowHeight / 2);
}


function mouseClicked() {
    // Initiates the game
    if (state === `title`) {
        state = `game`;
    }
}

function holdUp() {
    // Allows the player to freeze the enemies and relocate the intelligence using the F key
    if (keyIsDown(70)) {
        state = `freeze`;
    }

    else {
        state = `game`;
    }
}

function freezeLimit() {
    // Counts, limits, constrains and resets the freeze time
    if (state === `freeze`) {
        freezeCount = freezeCount + 0.3
    }
    else {
        freezeCount = freezeCount - 0.1
    }
    roundOffFreezeCount = freezeCount.toFixed();
    freezeCount = constrain(freezeCount, 0, 100);
    roundOffFreezeCount = constrain(roundOffFreezeCount, 0, 100);
}

function gameInfo() {
    // Writes the freezeCount and intelligenceCount on the screen
    textAlign(CENTER)
    textSize(62);
    fill(150, 150, 255);
    text(roundOffFreezeCount, windowWidth / 8 * 7, windowHeight / 8);

    textAlign(CENTER)
    textSize(62);
    fill(100, 200, 50);
    text(intelligenceCount, windowWidth / 10, windowHeight / 10);
}

function playerAgent() {
    // Draws the player character and constrains their position
    imageMode(CENTER)
    fill(180, 180, 180);
    ellipse(playerCharacter.x, playerCharacter.y, playerCharacter.size);
    image(spyImage, playerCharacter.x, playerCharacter.y, playerCharacter.size, playerCharacter.size);

    playerCharacter.x = constrain(playerCharacter.x, 0, windowWidth);
    playerCharacter.y = constrain(playerCharacter.y, 0, windowHeight);
}


function enemySetup() {
    // Sets up the initial position of the enemy agents
    enemyAgent1.x = random(0, windowWidth);
    enemyAgent1.y = windowHeight;

    enemyAgent2.x = random(0, windowWidth);
    enemyAgent2.y = windowHeight;

    enemyAgent3.x = random(0, windowWidth);
    enemyAgent3.y = windowHeight;
}

function intelligenceSetup() {
    // Sets up the initial position of the enemy agents
    intelligence01.x = random(windowWidth / 4, windowWidth / 4 * 3);
    intelligence01.y = random(windowHeight / 4, windowHeight / 4 * 3);

    intelligence02.x = random(windowWidth / 4, windowWidth / 4 * 3);
    intelligence02.y = random(windowHeight / 4, windowHeight / 4 * 3);

    intelligence03.x = random(windowWidth / 4, windowWidth / 4 * 3);
    intelligence03.y = random(windowHeight / 4, windowHeight / 4 * 3);
}

function intelligence() {
    // Draws the intelligence
    fill(100, 200, 50);
    ellipse(intelligence01.x, intelligence01.y, intelligence01.size);

    fill(100, 200, 50);
    ellipse(intelligence02.x, intelligence02.y, intelligence02.size);

    fill(100, 200, 50);
    ellipse(intelligence03.x, intelligence03.y, intelligence03.size);

}

function enemies() {
    // Draws the enemy agents
    image(enemyAgentImage, enemyAgent1.x, enemyAgent1.y, enemyAgent1.size, enemyAgent1.size);

    image(enemyAgentImage, enemyAgent2.x, enemyAgent2.y, enemyAgent2.size, enemyAgent2.size);

    image(enemyAgentImage, enemyAgent3.x, enemyAgent3.y, enemyAgent3.size, enemyAgent3.size);
}

function enemyMovement() {
    // Moves the enemy agents
    enemyAgent1.x = enemyAgent1.x + enemyAgent1.vX
    enemyAgent1.y = enemyAgent1.y + enemyAgent1.vY
    enemyAgent1.vX = enemyAgent1.vX + enemyAgent1.aX
    enemyAgent1.vY = enemyAgent1.vY + enemyAgent1.aY
    enemyAgent1.vX = constrain(enemyAgent1.vX, -enemyAgent1.maxSpeed, enemyAgent1.maxSpeed);
    enemyAgent1.vY = constrain(enemyAgent1.vY, -enemyAgent1.maxSpeed, enemyAgent1.maxSpeed);


    enemyAgent2.x = enemyAgent2.x + enemyAgent2.vX
    enemyAgent2.y = enemyAgent2.y + enemyAgent2.vY
    enemyAgent2.vX = enemyAgent2.vX + enemyAgent2.aX
    enemyAgent2.vY = enemyAgent2.vY + enemyAgent2.aY
    enemyAgent2.vX = constrain(enemyAgent2.vX, -enemyAgent2.maxSpeed, enemyAgent2.maxSpeed);
    enemyAgent2.vY = constrain(enemyAgent2.vY, -enemyAgent2.maxSpeed, enemyAgent2.maxSpeed);

    enemyAgent3.x = enemyAgent3.x + enemyAgent3.vX
    enemyAgent3.y = enemyAgent3.y + enemyAgent3.vY
    enemyAgent3.vX = enemyAgent3.vX + enemyAgent3.aX
    enemyAgent3.vY = enemyAgent3.vY + enemyAgent3.aY
    enemyAgent3.vX = constrain(enemyAgent3.vX, -enemyAgent3.maxSpeed, enemyAgent3.maxSpeed);
    enemyAgent3.vY = constrain(enemyAgent3.vY, -enemyAgent3.maxSpeed, enemyAgent3.maxSpeed);


    // Adjusts the movement (acceleration) of the enemy agents
    if (playerCharacter.x < enemyAgent1.x) {
        enemyAgent1.aX = -enemyAgent1.acceleration;
    }

    else {
        enemyAgent1.aX = enemyAgent1.acceleration;
    }

    if (playerCharacter.y < enemyAgent1.y) {
        enemyAgent1.aY = -enemyAgent1.acceleration;
    }

    else {
        enemyAgent1.aY = enemyAgent1.acceleration;
    }


    if (playerCharacter.x < enemyAgent2.x) {
        enemyAgent2.aX = -enemyAgent2.acceleration;
    }

    else {
        enemyAgent2.aX = enemyAgent2.acceleration;
    }

    if (playerCharacter.y < enemyAgent2.y) {
        enemyAgent2.aY = -enemyAgent2.acceleration;
    }

    else {
        enemyAgent2.aY = enemyAgent2.acceleration;
    }


    if (playerCharacter.x < enemyAgent3.x) {
        enemyAgent3.aX = -enemyAgent3.acceleration;
    }

    else {
        enemyAgent3.aX = enemyAgent3.acceleration;
    }

    if (playerCharacter.y < enemyAgent3.y) {
        enemyAgent3.aY = -enemyAgent3.acceleration;
    }

    else {
        enemyAgent3.aY = enemyAgent3.acceleration;
    }

}

function dangerDistance() {
    // Determines the distance between the player and the enemy agents and traps
    distance.range1 = dist(playerCharacter.x, playerCharacter.y, enemyAgent1.x, enemyAgent1.y);
    distance.range2 = dist(playerCharacter.x, playerCharacter.y, enemyAgent2.x, enemyAgent2.y);
    distance.range3 = dist(playerCharacter.x, playerCharacter.y, enemyAgent3.x, enemyAgent3.y);
    distance.range4 = dist(playerCharacter.x, playerCharacter.y, intelligence01.x, intelligence01.y);
    distance.range5 = dist(playerCharacter.x, playerCharacter.y, intelligence02.x, intelligence02.y);
    distance.range6 = dist(playerCharacter.x, playerCharacter.y, intelligence03.x, intelligence03.y);

}

function playerMovement() {
    // Moves the player character
    if (keyIsDown(LEFT_ARROW)) {
        playerCharacter.x = playerCharacter.x - 5;
    }

    else if (keyIsDown(RIGHT_ARROW)) {
        playerCharacter.x = playerCharacter.x + 5;
    }

    else if (keyIsDown(38)) {
        playerCharacter.y = playerCharacter.y - 5
    }

    else if (keyIsDown(40)) {
        playerCharacter.y = playerCharacter.y + 5
    }

}


function backgroundColor() {
    // Colors the background
    background(BgColor.R, BgColor.G, BgColor.B);
}

function intelligencePickup() {
    // Increases the intelligence count when standing on intelligence 
    if (distance.range4 <= playerCharacter.size / 2 + intelligence01.size / 2) {
        intelligenceCount = intelligenceCount + 1
    }

    else if (distance.range5 <= playerCharacter.size / 2 + intelligence02.size / 2) {
        intelligenceCount = intelligenceCount + 1
    }

    else if (distance.range6 <= playerCharacter.size / 2 + intelligence03.size / 2) {
        intelligenceCount = intelligenceCount + 1
    }
}

function gameEndConditions() {
    // Checks if the any game end condition has been met and changes the state accordingly
    if (distance.range1 <= playerCharacter.size / 2 + enemyAgent1.size / 2) {
        state = `endScreen`
    }

    else if (distance.range2 <= playerCharacter.size / 2 + enemyAgent2.size / 2) {
        state = `endScreen`
    }

    else if (distance.range3 <= playerCharacter.size / 2 + enemyAgent3.size / 2) {
        state = `endScreen`
    }

    else if (intelligenceCount >= 400) {
        state = `winScreen`
    }

    else if (freezeCount >= 100) {
        state = `endScreen`
    }
}

function gameOver() {
    // Draws the end screen
    background(BgColor.R, BgColor.G, BgColor.B)
    textAlign(CENTER)
    textSize(100);
    fill(255, 0, 0);
    text(`Mission Failed`, windowWidth / 2, windowHeight / 2);
}

function gameComplete() {
    // Draws victory screen
    background(BgColor.R, BgColor.G, BgColor.B)
    textAlign(CENTER)
    textSize(100);
    fill(100, 200, 100);
    text(`Mission Complete!`, windowWidth / 2, windowHeight / 2);
}
