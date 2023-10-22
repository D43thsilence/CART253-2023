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

// Sets up the waterImage variable
let waterImage;

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
    size: 120,
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
    size: 120,
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
    size: 120,
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
    size: 120,
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
    size: 120,
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
    size: 120,
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
    size: 120,
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
    size: 120,
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
    waterImage = loadImage('assets/images/water.png')
}

/**
 * Description of setup
 * Createsthe canvas and sets up the fish
*/
function setup() {
    createCanvas(windowWidth, windowHeight)
    fishSetup()

}


/**
 * Description of draw()
*/
function draw() {
    background(0, 210, 200)
    // background(waterImage)
    console.log(state)
    // Draws the title screen
    if (state === 'title') {
        titleScreen()
    }

    // Runs the different game states
    else if (state === 'ignore') {
        distanceCalculate()
        stateSwitch()
        gameInfo()
        fishPickup()
        bait()
        fishDraw(fish1)
        fishDraw(fish2)
        fishDraw(fish3)
        fishMovement()
        fishermanBoat()
        boatMovement()
    }

    else if (state === 'detected') {
        distanceCalculate()
        stateSwitch()
        gameInfo()
        fishPickup()
        bait()
        fishDraw()
        fishMovement()
        fishermanBoat()
        boatMovement()
    }

    else if (state === 'close') {
        distanceCalculate()
        stateSwitch()
        gameInfo()
        fishPickup()
        bait()
        fishDraw()
        fishMovement()
        fishermanBoat()
        boatMovement()
    }

    else if (state === 'baited') {
        distanceCalculate()
        stateSwitch()
        gameInfo()
        fishPickup()
        bait()
        fishDraw()
        fishMovement()
        fishermanBoat()
        boatMovement()
    }


    // // Draws the end screens
    // else if (state === `endScreen`) {
    //     gameOver();
    // }

    // else if (state === `winScreen`) {
    //     gameComplete();
    // }
}


function titleScreen() {

    // Draws the title screen
    // textFont(`Black Ops One`);
    textAlign(CENTER);
    textSize(62);
    fill(0);
    text(`Capture all 8 fish!`, windowWidth / 2, windowHeight / 2);
    fill(0, 0, 0);
    textAlign(CENTER);
    textSize(25);
    text(`Move with the arrow keys and use the B key to use your bait and attract the fish. Try to capture all fish before you run out of bait.`, windowWidth / 2, windowHeight / 2 + 100);
    fill(0, 0, 0)
    textSize(30)
    text(`Click to start!`, windowWidth / 2, windowHeight / 2 + 180);


    image(fishImage, windowWidth / 13, windowHeight / 3.5, 120, 120);
    textAlign(CENTER);
    textSize(20);
    fill(0, 0, 0);
    text(`This is a fish.`, windowWidth / 8, windowHeight / 2);

    image(fishImage2, windowWidth / 4 * 3.2, windowHeight / 2 - 150, 120, 120);
    textAlign(CENTER);
    textSize(20);
    fill(0, 0, 0);
    text(`This is another fish.`, windowWidth / 4 * 3.33, windowHeight / 2);
}

function mouseClicked() {
    // Initiates the game
    if (state === `title`) {
        state = `ignore`;
    }
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

function fishDraw(fish) {
    // Draws the various fish. If the fish is caught, it no longer is drawn
    if (!fish.fished) {
        push();
        image(fishImage, fish1.x, fish1.y, fish1.size, fish1.size);
        pop();
    }

    // image(fishImage2, fish2.x, fish2.y, fish2.size, fish2.size);

    // image(fishImage, fish3.x, fish3.y, fish3.size, fish3.size);

}


function fishMovement() {
    // Moves the fish
    fish1.x = fish1.x + fish1.vX;
    fish1.y = fish1.y + fish1.vY;
    fish1.vX = fish1.vX + fish1.aX;
    fish1.vY = fish1.vY + fish1.aY;
    fish1.vX = constrain(fish1.vX, -fish1.maxSpeed, fish1.maxSpeed);
    fish1.vY = constrain(fish1.vY, -fish1.maxSpeed, fish1.maxSpeed);

    if (fish1.x >= windowWidth / 10 * 9) {
        fish1.acceleration = -fish1.acceleration;
    }

    else if (fish1.x <= windowWidth / 10) {
        fish1.acceleration = -fish1.acceleration;
    }

    if (fish1.y >= windowHeight / 10 * 9) {
        fish1.acceleration = -fish1.acceleration;
    }

    if (fish1.y <= windowHeight / 10) {
        fish1.acceleration = -fish1.acceleration;
    }
}


function fishermanBoat() {
    // Draws the player character and constrains their position
    imageMode(CENTER)
    image(boatImage, playerBoat.x, playerBoat.y, playerBoat.size, playerBoat.size);
    playerBoat.x = constrain(playerBoat.x, 0, windowWidth);
    playerBoat.y = constrain(playerBoat.y, 0, windowHeight);
}

function boatMovement() {
    // Moves the player<s boat
    if (keyIsDown(LEFT_ARROW)) {
        playerBoat.x = playerBoat.x - 5;
    }

    else if (keyIsDown(RIGHT_ARROW)) {
        playerBoat.x = playerBoat.x + 5;
    }

    else if (keyIsDown(38)) {
        playerBoat.y = playerBoat.y - 5
    }

    else if (keyIsDown(40)) {
        playerBoat.y = playerBoat.y + 5
    }

}


function distanceCalculate() {
    // Determines the distance between the player and the fish
    distance.range1 = dist(playerBoat.x, playerBoat.y, fish1.x, fish1.y);
    distance.range2 = dist(playerBoat.x, playerBoat.y, fish2.x, fish2.y);
    distance.range3 = dist(playerBoat.x, playerBoat.y, fish3.x, fish3.y);
    distance.range4 = dist(playerBoat.x, playerBoat.y, fish4.x, fish4.y);
    distance.range5 = dist(playerBoat.x, playerBoat.y, fish5.x, fish5.y);
    distance.range6 = dist(playerBoat.x, playerBoat.y, fish6.x, fish6.y);

}

function stateSwitch(range) {
    console.log(distance.range1)
    //Determines whether to change state based on the distance
    if (distance.range < playerBoat.size / 2 + fish.size / 2 + proximityRange) {
        state = `close`
    }

    else if (distance.range <= playerBoat.size / 2 + fish.size / 2 + detectionRange) {
        state = `detected`
    }

    else {
        state = `ignore`;
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
    text(fishCount, windowWidth / 10, windowHeight / 10);
}

function fishPickup(fish) {
    // Increases the fish count when fishing every single fish
    if (!fish.eaten) {
        if (distance.range1 <= playerBoat.size / 2 + fish.size / 2) {
            fish.eaten = true;
            fishCount = fishCount + 1;
        }
    }
}

function bait() {
    // Allows the player use bait to attract fish
    if (keyIsDown(70)) {
        state = `baited`;
    }

    else {
        state = `ignore`;
    }
}
