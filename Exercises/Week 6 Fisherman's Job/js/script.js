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

// Sets up the baitCount variable
let baitCount = 400

// Sets up the proximityRange variable
let proximityRange = 90

// Sets up the detectionRange variable
let detectionRange = 370

// Sets up the x and y variable
let x;
let y;


// Sets up the various fish variables
let fish1;
let fish2;
let fish3;
let fish4;
let fish5;
let fish6;
let fish7;
let fish8;

// Sets up the distance javascript variable
let distance;
let distance2;
let distance3;
let distance4;
let distance5;
let distance6;
let distance7;
let distance8;


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

    fish1 = createFish(random(windowWidth / 2, windowWidth / 10 * 9), random(windowHeight / 9, windowHeight / 9 * 8))
    fish2 = createFish(random(windowWidth / 2, windowWidth / 10 * 9), random(windowHeight / 9, windowHeight / 9 * 8))
    fish3 = createFish(random(windowWidth / 2, windowWidth / 10 * 9), random(windowHeight / 9, windowHeight / 9 * 8))
    fish4 = createFish(random(windowWidth / 2, windowWidth / 10 * 9), random(windowHeight / 9, windowHeight / 9 * 8))
    fish5 = createFish(random(windowWidth / 2, windowWidth / 10 * 9), random(windowHeight / 9, windowHeight / 9 * 8))
    fish6 = createFish(random(windowWidth / 2, windowWidth / 10 * 9), random(windowHeight / 9, windowHeight / 9 * 8))
    fish7 = createFish(random(windowWidth / 2, windowWidth / 10 * 9), random(windowHeight / 9, windowHeight / 9 * 8))
    fish8 = createFish(random(windowWidth / 2, windowWidth / 10 * 9), random(windowHeight / 9, windowHeight / 9 * 8))

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
        distanceCalculate(distance, fish1)
        stateSwitch(distance, fish1)
        gameInfo()
        fishPickup(distance, fish1)
        fishPickup(distance2, fish2)
        fishPickup(distance3, fish3)
        fishPickup(distance4, fish4)
        fishPickup(distance5, fish5)
        fishPickup(distance6, fish6)
        fishPickup(distance7, fish7)
        fishPickup(distance8, fish8)
        bait()
        fishDraw(fish1)
        fishDraw(fish2)
        fishDraw(fish3)
        fishDraw(fish4)
        fishDrawAlternative(fish5)
        fishDrawAlternative(fish6)
        fishDrawAlternative(fish7)
        fishDrawAlternative(fish8)
        fishMovement(fish1)
        fishermanBoat()
        boatMovement()
    }

    else if (state === 'detected') {
        distanceCalculate(distance, fish1)
        stateSwitch(distance, fish1)
        gameInfo()
        fishPickup(distance, fish1)
        fishPickup(distance2, fish2)
        fishPickup(distance3, fish3)
        fishPickup(distance4, fish4)
        fishPickup(distance5, fish5)
        fishPickup(distance6, fish6)
        fishPickup(distance7, fish7)
        fishPickup(distance8, fish8)
        bait()
        fishDraw(fish1)
        fishDraw(fish2)
        fishDraw(fish3)
        fishDraw(fish4)
        fishDrawAlternative(fish5)
        fishDrawAlternative(fish6)
        fishDrawAlternative(fish7)
        fishDrawAlternative(fish8)
        fishMovement(fish1)
        fishermanBoat()
        boatMovement()
    }

    else if (state === 'close') {
        distanceCalculate(distance, fish1)
        stateSwitch(distance, fish1)
        gameInfo()
        fishPickup(distance, fish1)
        fishPickup(distance2, fish2)
        fishPickup(distance3, fish3)
        fishPickup(distance4, fish4)
        fishPickup(distance5, fish5)
        fishPickup(distance6, fish6)
        fishPickup(distance7, fish7)
        fishPickup(distance8, fish8)
        bait()
        fishDraw(fish1)
        fishDraw(fish2)
        fishDraw(fish3)
        fishDraw(fish4)
        fishDrawAlternative(fish5)
        fishDrawAlternative(fish6)
        fishDrawAlternative(fish7)
        fishDrawAlternative(fish8)
        fishMovement(fish1)
        fishermanBoat()
        boatMovement()
    }

    else if (state === 'baited') {
        distanceCalculate(distance, fish1)
        stateSwitch(distance, fish1)
        gameInfo()
        fishPickup(distance, fish1)
        fishPickup(distance2, fish2)
        fishPickup(distance3, fish3)
        fishPickup(distance4, fish4)
        fishPickup(distance5, fish5)
        fishPickup(distance6, fish6)
        fishPickup(distance7, fish7)
        fishPickup(distance8, fish8)
        bait()
        fishDraw(fish1)
        fishDraw(fish2)
        fishDraw(fish3)
        fishDraw(fish4)
        fishDrawAlternative(fish5)
        fishDrawAlternative(fish6)
        fishDrawAlternative(fish7)
        fishDrawAlternative(fish8)
        fishMovement(fish1)
        fishermanBoat()
        boatMovement()
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
    }
}

function createFish(x, y) {
    let fish = {
        x: x,
        y: y,
        size: 120,
        fished: false,
        maxSpeed: 2,
        vX: 0,
        vY: 0,
        aX: 0,
        aY: 0,
        acceleration: 0.2
    };
    return fish
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
        image(fishImage, fish.x, fish.y, fish.size, fish.size);
        pop();
    }
}

function fishDrawAlternative(fish) {
    // Draws a different type of fish fish. If the fish is caught, it no longer is drawn
    if (!fish.fished) {
        push();
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
    fish.vY = constrain(fish.vY, -fish1.maxSpeed, fish.maxSpeed);

    if (fish.x >= windowWidth / 10 * 9) {
        fish.acceleration = -fish.acceleration;
    }

    else if (fish.x <= windowWidth / 10) {
        fish.acceleration = -fish.acceleration;
    }

    if (fish.y >= windowHeight / 10 * 9) {
        fish.acceleration = -fish.acceleration;
    }

    if (fish.y <= windowHeight / 10) {
        fish.acceleration = -fish.acceleration;
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
    fill(150, 150, 255);
    text(baitCount, windowWidth / 8 * 7, windowHeight / 8);

    textAlign(CENTER)
    textSize(62);
    fill(100, 200, 50);
    text(fishCount, windowWidth / 10, windowHeight / 10);
}

function fishPickup(distance, fish) {
    // Increases the fish count when fishing every single fish
    if (!fish.fished) {
        distance = dist(playerBoat.x, playerBoat.y, fish.x, fish.y)
        if (distance <= playerBoat.size / 2 + fish.size / 2) {
            fish.fished = true;
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

function gameEndConditions() {
    // Checks if the any game end condition has been met and changes the state accordingly

    if (fishCount >= 8) {
        state = `winScreen`
    }

    else if (baitCount <= 0) {
        state = `endScreen`
    }
}

function gameOver() {
    // Draws the end screen
    textAlign(CENTER)
    textSize(100);
    fill(0, 0, 0);
    text(`You didn't catch all of the fish...`, windowWidth / 2, windowHeight / 2);
}

function gameComplete() {
    // Draws victory screen
    textAlign(CENTER)
    textSize(100);
    fill(0, 0, 0);
    text(`You caught all of the fish!`, windowWidth / 2, windowHeight / 2);
}
