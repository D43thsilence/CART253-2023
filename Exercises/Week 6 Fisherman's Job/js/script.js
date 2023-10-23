/**
 * Fisherman's job
 * Malcolm Siné Tadonki
 * 
 * The code here draws and animates the fisherman's boat, the fish and counts the amount of fish that are captured
 */

"use strict";

// Sets up the playerBoat variable
let playerBoat = {
    x: 80,
    y: 80,
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

// Sets up the baitCount and roundOffBaitCount variable
let baitCount = 400
let roundOffBaitCount

// Sets up the proximityRange variable
let proximityRange = 90

// Sets up the detectionRange variable
let detectionRange = 370

// Sets up the time variable
let time = 720

// Sets up the x and y variable
let x;
let y;

// Sets up various sound variables
let pickupSFX
let gameStartSFX
let gameWinSFX
let gameLoseSFX

// Sets up the distanceGroup array
let distanceGroup = []

// Sets up the fishGroup array
let fishGroup = [];
let fishGroupSize = 8


// Sets up the initial state
let state = `title`;

/**
 * Description of preload
 * 
 * Preloads the images and sounds
*/
function preload() {
    fishImage = loadImage('assets/images/clipart-fish-vector-4.png');
    fishImage2 = loadImage('assets/images/R.png');
    boatImage = loadImage('assets/images/boat-clipart-transparent-background-18.png');
    waterImage = loadImage('assets/images/water.png');
    pickupSFX = loadSound(`assets/sounds/SE_SYS_Lobby_Fishing_FishHit1.ogg`);
    gameStartSFX = loadSound(`assets/sounds/SE_MENU_SYS_GameStart.ogg`);
    gameWinSFX = loadSound(`assets/sounds/SE_SYS_Lobby_Fishing_Guaranteed.ogg`);
    gameLoseSFX = loadSound(`assets/sounds/SE_SYS_Misson_Falled.ogg`);

}

/**
 * Description of setup
 * Createsthe canvas and sets up the fish
*/
function setup() {
    // Creates the canvas
    createCanvas(windowWidth, windowHeight);

    for (let i = 0; i < fishGroupSize; i++) {
        fishGroup[i] = createFish(random(windowWidth / 2, windowWidth / 10 * 9), random(windowHeight / 9, windowHeight / 9 * 8))
    };
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

        for (let i = 0; i < fishGroup.length; i++) {
            distanceCalculate(distanceGroup[i], fishGroup[i])
            stateSwitch(distanceGroup[i], fishGroup[i])
            fishPickup(distanceGroup[i], fishGroup[i])
            fishMovement(fishGroup[i])
        };

        for (let i = 0; i < fishGroup.length / 2; i++) {
            fishDraw(fishGroup[i])
        };

        for (let i = 4; i < fishGroup.length; i++) {
            fishDrawAlternative(fishGroup[i])
        };

        timeLimit()
        baitCountdown()
        gameInfo()
        fishermanBoat()
        boatMovement()
        gameEndConditions()
    }

    else if (state === 'detected') {

        for (let i = 0; i < fishGroup.length; i++) {
            distanceCalculate(distanceGroup[i], fishGroup[i])
            stateSwitch(distanceGroup[i], fishGroup[i])
            fishPickup(distanceGroup[i], fishGroup[i])
            fishMovement(fishGroup[i])
        };

        for (let i = 0; i < 4; i++) {
            fishDraw(fishGroup[i])
        };

        for (let i = 4; i < fishGroup.length; i++) {
            fishDrawAlternative(fishGroup[i])
        };

        timeLimit()
        baitCountdown()
        gameInfo()
        fishermanBoat()
        boatMovement()
        gameEndConditions()
    }


    else if (state === 'baited') {

        for (let i = 0; i < fishGroup.length; i++) {
            distanceCalculate(distanceGroup[i], fishGroup[i])
            stateSwitch(distanceGroup[i], fishGroup[i])
            fishPickup(distanceGroup[i], fishGroup[i])
            fishMovement(fishGroup[i])
        };

        for (let i = 0; i < fishGroup.length / 2; i++) {
            fishDraw(fishGroup[i])
        };

        for (let i = 4; i < fishGroup.length; i++) {
            fishDrawAlternative(fishGroup[i])
        };

        timeLimit()
        baitCountdown()
        gameInfo()
        fishermanBoat()
        boatMovement()
        gameEndConditions()
    }


    // Draws the end screens
    if (state === `endScreen`) {
        gameOver();
    }

    else if (state === `winScreen`) {
        gameComplete();
    }
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
        gameStartSFX.play()
    }
}

function musicLoopStop() {
    // Plays the game end sounds only once
    if (!gameWinSFX.isPlaying()) {
        noLoop();
    }

    else if (!gameLoseSFX.isPlaying()) {
        noLoop();
    }
}


function createFish(x, y) {
    let fish = {
        x: x,
        y: y,
        size: 120,
        fished: false,
        maxSpeed: 5,
        vX: 0,
        vY: 0,
        aX: 0,
        aY: 0,
        acceleration: 0.2
    };
    return fish
}

function fishDraw(fish) {
    // Draws the various fish. If the fish is caught, it no longer is drawn
    if (!fish.fished) {
        push();
        image(fishImage, fish.x, fish.y, fish.size, fish.size);
        pop();
    }
}

function fishDrawAlternative(fish) {
    // Draws a different type of fish fish. If the fish is caught, it no longer is drawn
    if (!fish.fished) {
        push()
        image(fishImage2, fish.x, fish.y, fish.size, fish.size);
        pop();
    }

}


function fishMovement(fish) {
    // Moves the fish
    fish.x = fish.x + fish.vX;
    fish.y = fish.y + fish.vY;
    fish.vX = fish.vX + fish.aX;
    fish.vY = fish.vY + fish.aY;
    fish.vX = constrain(fish.vX, -fish.maxSpeed, fish.maxSpeed);
    fish.vY = constrain(fish.vY, -fish.maxSpeed, fish.maxSpeed);

    // Constrains the fish to the canvas
    fish.x = constrain(fish.x, windowWidth / 11, windowWidth / 11 * 10);
    fish.y = constrain(fish.y, windowHeight / 11, windowHeight / 11 * 10);

    // Randomly changes the movement direction of the fish
    let changeDirection = random(0, 1);
    if (changeDirection < 0.05) {
        fish.vX = random(-fish.maxSpeed, fish.maxSpeed);
        fish.vY = random(-fish.maxSpeed, fish.maxSpeed);
    }

}

function fishMovementDetected(fish) {


}

function fishMovementBaited(fish) {
    // Moves the fish
    fish.x = fish.x + fish.vX;
    fish.y = fish.y + fish.vY;
    fish.vX = fish.vX + fish.aX;
    fish.vY = fish.vY + fish.aY;
    fish.vX = constrain(fish.vX, -fish.maxSpeed, fish.maxSpeed);
    fish.vY = constrain(fish.vY, -fish.maxSpeed, fish.maxSpeed);

    // Constrains the fish to the canvas
    fish.x = constrain(fish.x, windowWidth / 11, windowWidth / 11 * 10);
    fish.y = constrain(fish.y, windowHeight / 11, windowHeight / 11 * 10);

    if (playerBoat.x < fish.x) {
        fish.aX = -fish.acceleration;
    }

    else {
        fish.aX = fish.acceleration;
    }

    if (playerBoat.y < fish.y) {
        fish.aY = -fish.acceleration;
    }

    else {
        fish.aY = fish.acceleration;
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


function distanceCalculate(distance, fish) {
    // Determines the distance between the player and the fish
    distance = dist(playerBoat.x, playerBoat.y, fish.x, fish.y)

}

function stateSwitch(distance, fish) {
    console.log(distance)
    //Determines whether to change state based on the distance
    if (distance < playerBoat.size / 2 + fish.size / 2 + proximityRange) {
        state = `close`
    }

    else if (distance <= playerBoat.size / 2 + fish.size / 2 + detectionRange) {
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
    fill(0, 0, 0);
    text(baitCount, windowWidth / 8 * 7, windowHeight / 8);

    textAlign(CENTER)
    textSize(62);
    fill(100, 200, 50);
    text(fishCount, windowWidth / 10, windowHeight / 10);

    textAlign(CENTER)
    textSize(62);
    fill(0, 0, 0);
    text(time, windowWidth / 2, windowHeight / 10);
}

function fishPickup(distance, fish) {
    // Increases the fish count when fishing every single fish
    if (!fish.fished) {
        distance = dist(playerBoat.x, playerBoat.y, fish.x, fish.y)
        if (distance <= playerBoat.size / 2 + fish.size / 2) {
            fish.fished = true;
            fishCount = fishCount + 1;
            pickupSFX.play();
        }
    }
}

function bait() {
    // Allows the player use bait to attract fish
    if (keyIsDown(66)) {
        state = `baited`;
    }

    else {
        state = `ignore`;
    }

}

function baitCountdown() {
    roundOffBaitCount = baitCount.toFixed();
    baitCount = constrain(baitCount, 0, 400)
    roundOffBaitCount = constrain(roundOffBaitCount, 0, 400)

    if (state === `baited`) {
        baitCount = baitCount - 1
    }

}

function timeLimit() {
    time = time - 1
}

function gameEndConditions() {
    // Checks if the any game end condition has been met and changes the state accordingly

    if (fishCount >= 8) {
        state = `winScreen`
    }

    else if (baitCount <= 0) {
        state = `endScreen`
    }

    else if (time <= 0) {
        state = `endScreen`
    }
}

function gameOver() {
    // Draws the end screen
    textAlign(CENTER)
    textSize(100);
    fill(0, 0, 0);
    text(`You didn't catch all of the fish...`, windowWidth / 2, windowHeight / 2);
    musicLoopStop()
    gameLoseSFX.play()
}

function gameComplete() {
    // Draws victory screen
    textAlign(CENTER)
    textSize(100);
    fill(0, 0, 0);
    text(`You caught all of the fish!`, windowWidth / 2, windowHeight / 2);
    musicLoopStop()
    gameWinSFX.play()
}
