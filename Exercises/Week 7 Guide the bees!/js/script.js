/**
 * Title of Project
 * Author Name
 * 
 * This is a template. You must fill in the title, author, 
 * and this description to match your project!
 */

"use strict";

// Our garden
let garden = {
    // An array to store the individual flowers
    flowers: [],
    // How many flowers are in the garden
    numFlowers: 20,
    // An array for the bees
    bees: [],
    // An array for the Queen bee
    queenBee: [],
    // An array for the wasp
    wasps: [],
    // How many bees in the garden
    numBees: 3,
    // How many wasps in the garden
    numWasp: 1,
    // How many Queen bees in the garden
    numQueenBee: 1,
    // The color of the grass (background)
    grassColor: {
        r: 120,
        g: 180,
        b: 120
    }
};

// Sets up the time variable
let time = 720

// Sets up the initial game state
let state = `titlescreen`

// Sets up the nectarCount variable
let nectarCount = 0


function setup() {
    // Creates the canvas and sets up the initial position of the flowers in the garden
    createCanvas(600, 600);

    // Create our flowers by counting up to the number of the flowers
    for (let i = 0; i < garden.numFlowers; i++) {
        // Create variables for our arguments for clarity
        let x = random(0, width);
        let y = random(0, height);
        let size = random(50, 80);
        let stemLength = random(50, 100);
        let petalColor = {
            r: random(100, 255),
            g: random(100, 255),
            b: random(100, 255)
        }
        // Create a new flower using the arguments
        let flower = new Flower(x, y, size, stemLength, petalColor);
        // Add the flower to the array of flowers
        garden.flowers.push(flower);
    }

    // Create our bees by counting up to the number of bees
    for (let i = 0; i < garden.numBees; i++) {
        // Create variables for our arguments for clarity
        let x = random(0, width);
        let y = random(0, height);
        // Create a new bee using the arguments
        let bee = new Bee(x, y);
        // Add the bee to the array of bees
        garden.bees.push(bee);
    }

    // Create our wasp
    for (let i = 0; i < garden.numWasp; i++) {
        // Create variables for our arguments for clarity
        let x = random(0, width);
        let y = random(0, height);
        // Create a new bee using the arguments
        let wasp = new Wasp(x, y);
        // Add the bee to the array of bees
        garden.wasps.push(wasp);
    }

    // Create our Queen bee
    for (let i = 0; i < garden.numQueenBee; i++) {
        // Create variables for our arguments for clarity
        let x = random(0, width);
        let y = random(0, height);
        // Create a new bee using the arguments
        let queenBee = new QueenBee(x, y);
        // Add the bee to the array of bees
        garden.queenBee.push(queenBee);
    }

}

// draw()
// Displays our flowers
function draw() {
    // Display the grass
    background(garden.grassColor.r, garden.grassColor.g, garden.grassColor.b);

    // Loop through all the flowers in the array and display them
    for (let i = 0; i < garden.flowers.length; i++) {
        let flower = garden.flowers[i];
        // Check if this flower still has nectar and color it appropriately
        if (!flower.nectarDry) {
            flower.display();
        }

    }

    // Loop through all the bees in the array and display them
    for (let i = 0; i < garden.bees.length; i++) {
        let bee = garden.bees[i];
        // Check if this flower is alive
        if (bee.alive) {
            // Moves the bee
            bee.move();

            // NEW! Go through the entire flower array and try to pollinate the flowers!
            // Note that we use j in our for-loop here because we're already inside
            // a for-loop using i!
            for (let j = 0; j < garden.flowers.length; j++) {
                let flower = garden.flowers[j];
                bee.CollectNectar(flower)
            }

            // Display the bee
            bee.display();

            // Allows the wasp to catch the bees
            // bee.WaspCatch();
        }
    }

    for (let i = 0; i < garden.wasps.length; i++) {
        let wasp = garden.wasps[i];
        // Draws and moves the wasp
        wasp.display();
        wasp.move();
        // wasp.WaspChase(bee)
    }

    for (let i = 0; i < garden.queenBee.length; i++) {
        let queenBee = garden.queenBee[i];
        // Draws and moves the Queen bee
        queenBee.display();
        queenBee.QueenBeeMovement();
        // Allows the wasp to catch the Queen bee
        // queenBee.WaspCatch();
    }

    // Draws the end screens
    if (state === `endScreen`) {
        gameOver();
    }

    else if (state === `timeoutScreen`) {
        outOfTime();
    }

    else if (state === `winScreen`) {
        gameComplete();
    }
};




function nectarCollect() {
    if (this.nectarDry === false) {

    }
}

function timeLimit() {
    // Counts down the time
    time = time - 1;
}

function gameInfo() {
    // Writes the baitCount, fishCount and time on the screen
    // textAlign(CENTER)
    // textSize(62);
    // fill(0, 0, 0);
    // text(baitCount, windowWidth / 8 * 7, windowHeight / 8);

    // textAlign(CENTER)
    // textSize(62);
    // fill(100, 200, 50);
    // text(fishCount, windowWidth / 10, windowHeight / 10);

    textAlign(CENTER)
    textSize(62);
    fill(0, 0, 0);
    text(time, windowWidth / 2, windowHeight / 10);
}

function gameEndConditions() {
    // Checks if the any game end condition has been met and changes the game state accordingly
    if (nectarCount >= garden.numFlowers) {
        state = `endScreen`;
    }

    else if (garden.bees <= 0) {
        state = `winScreen`;
    }

    else if (time <= 0) {
        state = `timeoutScreen`;
    }
}

function gameOver() {
    // Draws the end screen
    textAlign(CENTER);
    textSize(65);
    fill(0, 0, 0);
    text(`You didn't collect all of the nectar`, windowWidth / 2, windowHeight / 2);
    gameLoseSFX.play();
    noLoop();
}

function outOfTime() {
    // Draws the end screen
    textAlign(CENTER);
    textSize(65);
    fill(0, 0, 0);
    text(`You ran out of time`, windowWidth / 2, windowHeight / 2);
    gameLoseSFX.play();
    noLoop();
}

function gameComplete() {
    // Draws victory screen
    background(0, 200, 225);
    textAlign(CENTER);
    textSize(65);
    fill(0, 0, 0);
    text(`You caught all of the fish!`, windowWidth / 2, windowHeight / 2);
    gameWinSFX.play();
    noLoop();
}