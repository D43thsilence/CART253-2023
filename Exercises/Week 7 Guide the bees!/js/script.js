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
let state = `title`

// Sets up the nectarCount variable
let nectarCount = 0


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
            // Check if this flower still has nectar and color it appropriately
            if (!flower.nectarDry) {
                flower.display();
            }
            else {
                flower.display();
                flower.nectarTaken()
            }

        }

        // Loop through all the bees in the array and display them
        for (let i = 0; i < garden.bees.length; i++) {
            let bee = garden.bees[i];
            // Check if this flower is alive
            if (bee.alive) {
                // Moves the bees
                bee.move();

                // for (let q = 0; i < garden.queenBee.length; q++) {
                //     let queenBee = garden.queenBee[q];
                //     bee.followTheQueen(queenBee);
                // }

                //Go through the entire flower array and allows the bees to collect the nectar of the flowers
                // Note that we use j in our for-loop here because we're already inside a for-loop using i!
                for (let j = 0; j < garden.flowers.length; j++) {
                    let flower = garden.flowers[j];
                    bee.CollectNectar(flower)
                }

                // Display the bee
                bee.display();
            }
        }

        for (let i = 0; i < garden.wasps.length; i++) {
            let wasp = garden.wasps[i];
            // Draws and moves the wasp
            wasp.display();
            wasp.move();
            for (let b = 0; b < garden.bees.length; b++) {
                let bee = garden.bees[b];
                wasp.WaspChase(bee)
                wasp.WaspCatch(bee)
            }
            for (let q = 0; i < garden.queenBee.length; q++) {
                let queenBee = garden.queenBee[q];
                wasp.WaspCatch(queenBee)
            }

        }


        for (let i = 0; i < garden.queenBee.length; i++) {
            let queenBee = garden.queenBee[i];
            if (queenBee.alive) {
                // Draws and moves the Queen bee
                queenBee.display();
                queenBee.QueenBeeMovement();
                // Allows the wasp to catch the Queen bee
                // queenBee.WaspCatch();
            }
        }

        // Call all of the extra functions that do not rely on for loops
        nectarCollect()
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

    // image(fishImage, windowWidth / 13, windowHeight / 3.5, 120, 120);
    // textAlign(CENTER);
    // textSize(20);
    // fill(0, 0, 0);
    // text(`This is a fish.`, windowWidth / 8, windowHeight / 2);

    // image(fishImage2, windowWidth / 4 * 3.2, windowHeight / 2 - 150, 120, 120);
    // textAlign(CENTER);
    // textSize(20);
    // fill(0, 0, 0);
    // text(`This is another fish.`, windowWidth / 4 * 3.33, windowHeight / 2);
}

function mouseClicked() {
    // Initiates the game
    if (state === `title`) {
        state = `game`;
        // gameStartSFX.play();
    }
}

function nectarCollect() {
    for (let i = 0; i < garden.flowers.length; i++) {
        let flower = garden.flowers[i];
        if (flower.nectarDry === true) {
            nectarCount = nectarCount + 1
            console.log(nectarCount)
        }
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
    fill(0, 0, 0);
    text(nectarCount, windowWidth / 8 * 7, windowHeight / 8);

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
        state = `winScreen`;
    }

    else if (garden.bees <= 0) {
        state = `endScreen`;
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
    text(`You ran out of bees.`, windowWidth / 2, windowHeight / 2);
    // gameLoseSFX.play();
    // noLoop();
}

function outOfTime() {
    // Draws the end screen
    textAlign(CENTER);
    textSize(65);
    fill(0, 0, 0);
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