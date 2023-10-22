/**
 * Fisherman's job
 * Malcolm Siné Tadonki
 * 
 * The code here draws and animates the fisherman's boat, the fish and counts the amount of fish that are captured
 */

"use strict";

// Sets up the playerBoat variable
let playerBoat = {
    x: 0,
    y: 0,
    size: 150

}

// Sets up the boatImage variable
let boatImage;

// Sets up the fishImage variable
let fishImage;

// Sets up the fishImage2 variable
let fishImage2;

// Sets up the fishCount variable
let fishCount = 0

// Sets up the baitCount variable
let baitCount = 400

// Sets up the proximityRange variable
let proximityRange = 90

// Sets up the detectionRange variable
let detectionRange = 370


// Sets up the various fish variables
let fish1 = {
    x: 0,
    y: 0,
    size: 200,
    fished: false,
    maxSpeed: 2,
    vX: 0,
    vY: 0,
    aX: 0,
    aY: 0,
    acceleration: 0.2
}

let fish2 = {
    x: 0,
    y: 0,
    size: 200,
    fished: false,
    maxSpeed: 2,
    vX: 0,
    vY: 0,
    aX: 0,
    aY: 0,
    acceleration: 0.2
}

let fish3 = {
    x: 0,
    y: 0,
    size: 200,
    fished: false,
    maxSpeed: 2,
    vX: 0,
    vY: 0,
    aX: 0,
    aY: 0,
    acceleration: 0.2
}

let fish4 = {
    x: 0,
    y: 0,
    size: 200,
    fished: false,
    maxSpeed: 2,
    vX: 0,
    vY: 0,
    aX: 0,
    aY: 0,
    acceleration: 0.2
}
let fish5 = {
    x: 0,
    y: 0,
    size: 200,
    fished: false,
    maxSpeed: 2,
    vX: 0,
    vY: 0,
    aX: 0,
    aY: 0,
    acceleration: 0.2
}

let fish6 = {
    x: 0,
    y: 0,
    size: 200,
    fished: false,
    maxSpeed: 2,
    vX: 0,
    vY: 0,
    aX: 0,
    aY: 0,
    acceleration: 0.2
}

let fish7 = {
    x: 0,
    y: 0,
    size: 200,
    fished: false,
    maxSpeed: 2,
    vX: 0,
    vY: 0,
    aX: 0,
    aY: 0,
    acceleration: 0.2
}

let fish8 = {
    x: 0,
    y: 0,
    size: 200,
    fished: false,
    maxSpeed: 2,
    vX: 0,
    vY: 0,
    aX: 0,
    aY: 0,
    acceleration: 0.2
}

// Sets up the distance javascript variable
let distance = {
    range1: 0,
    range2: 0,
    range3: 0,
    range4: 0,
    range5: 0,
    range6: 0,
    range7: 0,
    range8: 0
}

// Sets up the initial state
let state = `title`;

/**
 * Description of preload
 * 
 * Preloads the images
*/
function preload() {
    fishImage = loadImage('assets/images/clipart-fish-vector-4.png')
    fishImage2 = loadImage('assets/images/R.png')
    boatImage = loadImage('assets/images/boat-clipart-transparent-background-18.png')
}

/**
 * Description of setup
*/
function setup() {

}


/**
 * Description of draw()
*/
function draw() {

}




function fishSetup() {
    // Sets up the initial position of the fish
    fish1.x = random(0, windowWidth);
    fish1.y = windowHeight;

    fish2.x = random(0, windowWidth);
    fish2.y = windowHeight;

    fish3.x = random(0, windowWidth);
    fish3.y = windowHeight;
}

// function baitSetup() {
//     // Sets up the initial position of the extra bait
//     bait01.x = random(windowWidth / 4, windowWidth / 4 * 3);
//     bait01.y = random(windowHeight / 4, windowHeight / 4 * 3);

//     bait02.x = random(windowWidth / 4, windowWidth / 4 * 3);
//     bait02.y = random(windowHeight / 4, windowHeight / 4 * 3);

//     bait03.x = random(windowWidth / 4, windowWidth / 4 * 3);
//     bait03.y = random(windowHeight / 4, windowHeight / 4 * 3);
// }

// function baitDraw() {
//     // Draws the bait
//     fill(100, 200, 50);
//     ellipse(intelligence01.x, intelligence01.y, intelligence01.size);

//     fill(100, 200, 50);
//     ellipse(intelligence02.x, intelligence02.y, intelligence02.size);

//     fill(100, 200, 50);
//     ellipse(intelligence03.x, intelligence03.y, intelligence03.size);

// }

function fishesDraw() {
    // Draws the various fish
    image(fishImage, fish1.x, fish1.y, fish1.size, fish1.size);

    image(fishImage2, fish2.x, fish2.y, fish2.size, fish2.size);

    image(fishImage, fish3.x, fish3.y, fish3.size, fish3.size);
}


function fishMovement() {
    // Moves the fish
    fish1.x = fish1.x + fish1.vX
    fish1.y = fish1.y + fish1.vY
    fish1.vX = fish1.vX + fish1.aX
    fish1.vY = fish1.vY + fish1.aY
    fish1.vX = constrain(fish1.vX, -fish1.maxSpeed, fish1.maxSpeed);
    enemyAgent1.vY = constrain(fish1.vY, -fish1.maxSpeed, fish1.maxSpeed);

    if (fish1.x >= windowwidth / 10 * 9) {
        fish1.acceleration = -fish1.acceleration
    }

    else if (fish1.x <= windowwidth / 10) {
        fish1.acceleration = -fish1.acceleration
    }

    if (fish1.y >= windowHeight / 10 * 9) {
        fish1.acceleration = -fish1.acceleration
    }

    if (fish1.y <= windowHeight / 10) {
        fish1.acceleration = -fish1.acceleration
    }
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


function distance() {
    // Determines the distance between the player and the fish
    range.distance = dist(player.x, player.y, needyGirlfriend.x, needyGirlfriend.y);
}

function dangerDistance() {
    // Determines the distance between the player and the fish
    distance.range1 = dist(playerCharacter.x, playerCharacter.y, fish1.x, fish1.y);
    distance.range2 = dist(playerCharacter.x, playerCharacter.y, enemyAgent2.x, enemyAgent2.y);
    distance.range3 = dist(playerCharacter.x, playerCharacter.y, enemyAgent3.x, enemyAgent3.y);
    distance.range4 = dist(playerCharacter.x, playerCharacter.y, intelligence01.x, intelligence01.y);
    distance.range5 = dist(playerCharacter.x, playerCharacter.y, intelligence02.x, intelligence02.y);
    distance.range6 = dist(playerCharacter.x, playerCharacter.y, intelligence03.x, intelligence03.y);

}

function stateSwitch() {
    console.log(range.distance)
    //Determines whether to change state based on the distance
    if (range.distance < player.size / 2 + fish1.size / 2 + proximityRange) {
        state = `close`
    }

    else if (range.distance <= player.size / 2 + needyGirlfriend.size / 2 + attentionRange) {
        state = `attraction`
    }

    else {
        state = `requiring attention`;
    }
}

function gameInfo() {
    // Writes the baitCount and fishCount on the screen
    textAlign(CENTER)
    textSize(62);
    fill(150, 150, 255);
    text(baitCount, windowWidth / 8 * 7, windowHeight / 8);

    textAlign(CENTER)
    textSize(62);
    fill(100, 200, 50);
    text(fishcountCount, windowWidth / 10, windowHeight / 10);
}

function fishPickup() {
    // Increases the fish count when fishing every single fish
    if (!fish1.eaten) {
        if (distance.range1 <= playerCharacter.size / 2 + fish1.size / 2) {
            fish1.eaten = true;
            fishCount = fishCount + 1;
        }
    }

    else if (distance.range2 <= playerCharacter.size / 2 + fish2.size / 2) {
        fishCount = fishCount + 1
    }

    else if (distance.range3 <= playerCharacter.size / 2 + fish3.size / 2) {
        intelligenceCount = intelligenceCount + 1
    }
}

function bait() {
    // Allows the player use bait to attract fish
    if (keyIsDown(70)) {
        state = `baited`;
    }

    else {
        state = `game`;
    }
}
