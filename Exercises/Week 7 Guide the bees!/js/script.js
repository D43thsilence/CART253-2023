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
let time = 1800

// Sets up the initial game state
let state = `title`

// Sets up the nectarCount variable
let nectarCount = 0
let beeCaptureCount = 0


function setup() {
    // Creates the canvas and sets up the initial position of the flowers in the garden
    createCanvas(windowWidth, windowHeight);

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
        let x = random(0, width / 2);
        let y = random(0, height / 2);
        // Create a new bee using the arguments
        let bee = new Bee(x, y);
        // Add the bee to the array of bees
        garden.bees.push(bee);
    }

    // Create our wasp
    for (let i = 0; i < garden.numWasp; i++) {
        // Create variables for our arguments for clarity
        let x = random(width / 10 * 9, width);
        let y = random(height / 10 * 9, height);
        // Create a new bee using the arguments
        let wasp = new Wasp(x, y);
        // Add the bee to the array of bees
        garden.wasps.push(wasp);
    }

    // Create our Queen bee
    for (let i = 0; i < garden.numQueenBee; i++) {
        // Create variables for our arguments for clarity
        let x = random(0, width / 2);
        let y = random(0, height) / 2;
        // Create a new bee using the arguments
        let queenBee = new QueenBee(x, y);
        // Add the bee to the array of bees
        garden.queenBee.push(queenBee);
    }

}

// draw()
// Displays our flowers
function draw() {
    // Draws the title screen
    if (state === `title`) {
        titleScreen()
    }

    if (state === `game`) {
        // Display the grass
        background(garden.grassColor.r, garden.grassColor.g, garden.grassColor.b);

        // Loop through all the flowers in the array and display them
        for (let i = 0; i < garden.flowers.length; i++) {
            let flower = garden.flowers[i];
            // Check if this flower still has nectar and colors it appropriately
            if (!flower.nectarDry) {
                flower.display();

            }
            else {
                flower.display();
            }
        }

        // Loop through all the bees in the array and display them
        for (let i = 0; i < garden.bees.length; i++) {
            let bee = garden.bees[i];
            // Check if the bee is still alive
            if (bee.alive) {
                // Moves the bees
                for (let q = 0; q < garden.queenBee.length; q++) {
                    let queenBee = garden.queenBee[q];
                    bee.followTheQueen(queenBee);
                    bee.move();
                }

                //Go through the entire flower array and allows the bees to collect the nectar of the flowers
                // Note that we use j in our for-loop here because we're already inside a for-loop using i!
                for (let j = 0; j < garden.flowers.length; j++) {
                    let flower = garden.flowers[j];
                    if (flower.nectarDry === false) {
                        bee.CollectNectar(flower);
                        let d = dist(bee.x, bee.y, flower.x, flower.y);
                        if (d < bee.size / 2 + flower.size / 2 + flower.petalThickness) {
                            nectarCount = nectarCount + 1
                        }

                    }

                }
                // Display the bee
                bee.display();
            }
        }

        for (let i = 0; i < garden.wasps.length; i++) {
            let wasp = garden.wasps[i];
            // Draws and moves the wasp
            wasp.display();

            for (let b = 0; b < garden.bees.length; b++) {
                let bee = garden.bees[b];
                wasp.WaspChase(bee)
                wasp.WaspCatch(bee)
                wasp.move();
                console.log(beeCaptureCount)
                for (let b = 0; b < garden.bees.length; b++) {
                    let bee = garden.bees[b];
                    if (bee.alive) {
                        let d = dist(wasp.x, wasp.y, bee.x, bee.y);
                        // If the wasp and the bee overlap, the bee gets caught.
                        if (d < wasp.size / 2 + bee.size / 2) {
                            beeCaptureCount = beeCaptureCount + 1
                        };
                    }
                }
            }
        }


        for (let i = 0; i < garden.queenBee.length; i++) {
            let queenBee = garden.queenBee[i];
            if (queenBee.alive) {
                // Draws and allows the Queen bee to move
                queenBee.display();
                queenBee.QueenBeeMovement();
            }
        }

        // Call all of the extra functions that do not rely on for loops
        timeLimit()
        gameEndConditions()
        gameInfo()

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


function titleScreen() {
    // Draws the title screen
    background(0, 200, 225)
    // textFont(`Playpen Sans`);
    textAlign(CENTER);
    textSize(62);
    fill(0);
    text(`Collect the nectar of all 20 flowers`, windowWidth / 2, windowHeight / 2);
    fill(0, 0, 0);
    textAlign(CENTER);
    textSize(20);
    text(`Move with the arrow keys and guide your fellow bees to collect the nectar without losing them all to the evil wasp. `, windowWidth / 2, windowHeight / 2 + 100);
    fill(0, 0, 0);
    textSize(30);
    text(`Click to start!`, windowWidth / 2, windowHeight / 2 + 180);
}

function mouseClicked() {
    // Initiates the game
    if (state === `title`) {
        state = `game`;
        // gameStartSFX.play();
    }
}

function timeLimit() {
    // Counts down the time
    time = time - 1;
}

function gameInfo() {
    // Writes the nectarCount, fishCount and time on the screen
    textAlign(CENTER)
    textSize(62);
    fill(225, 225, 0);
    text(nectarCount, windowWidth / 8, windowHeight / 8);

    textAlign(CENTER)
    textSize(62);
    fill(255, 255, 255);
    text(time, windowWidth / 2, windowHeight / 10);
}

function gameEndConditions() {
    // Checks if the any game end condition has been met and changes the game state accordingly
    if (nectarCount >= garden.numFlowers) {
        state = `winScreen`;
    }

    if (beeCaptureCount >= garden.numBees) {
        state = `endScreen`;
    }

    if (time <= 0) {
        state = `timeoutScreen`;
    }
}

function gameOver() {
    // Draws the end screen
    textAlign(CENTER);
    textSize(65);
    fill(255, 255, 255);
    text(`You ran out of bees.`, windowWidth / 2, windowHeight / 2);
    // gameLoseSFX.play();
    // noLoop();
}

function outOfTime() {
    // Draws the end screen
    textAlign(CENTER);
    textSize(65);
    fill(255, 255, 255);
    text(`You ran out of time.`, windowWidth / 2, windowHeight / 2);
    // gameLoseSFX.play();
    // noLoop();
}

function gameComplete() {
    // Draws victory screen
    background(0, 200, 225);
    textAlign(CENTER);
    textSize(65);
    fill(0, 0, 0);
    text(`You collected all of the nectar!`, windowWidth / 2, windowHeight / 2);
    // gameWinSFX.play();
    // noLoop();
}