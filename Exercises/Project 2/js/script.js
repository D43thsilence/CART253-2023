/**
 * Project 2
 * Malcolm Siné Tadonki
 * 
 * This project is a battle simulator, use your skills appropriately in order to defeat a powerful foe!
 */

"use strict";


// Creates an array for the player character
let playerCharacterTeam = {
    characters: [],
    numPlayers: 1
}

// Creates an array for the enemy character
let enemyTeam = {
    enemies: [],
    numEnemies: 1
}

// Sets up the chargeCount variable
let chargeCount = 0

// Sets up the playerLifeCount variable
let playerLifeCount = 100

// Sets up the enemyLifeCount variable
let enemyLifeCount = 100

// Sets up the initial game state
let state = `title`

/**
 * Description of preload
*/
function preload() {

}


/**
 * Description of setup
*/
function setup() {
    // Creates the canvas
    createCanvas(windowWidth, windowHeight);

    // Sets the variables for the player character's creation
    for (let i = 0; i < playerCharacterTeam.numPlayers; i++) {
        // Assign variables for the arguments
        let x = windowWidth / 4;
        let y = windowHeight / 4 * 3;

        // Create the player character 
        let playercharacter = new PlayerCharacter(x, y);
        // Add the player's character to the array of player characters
        playerCharacterTeam.characters.push(playercharacter);
    }

    // Sets the variables for the enemy character's creation
    for (let i = 0; i < enemyTeam.numEnemies; i++) {
        // Assign variables for the arguments
        let x = windowWidth / 4 * 3;
        let y = windowHeight / 4 * 3;

        // Create the player character 
        let enemyCharacter = new Enemy(x, y);
        // Add the player's character to the array of player characters
        enemyTeam.enemies.push(enemyCharacter);
    }


}


/**
 * Description of draw()
*/
function draw() {

    // Draws the title screen
    titleScreen();

    console.log(state)

    if (state === `playerTurn`) {

        background(225, 225, 225)

        // Draws the player's character
        for (let i = 0; i < playerCharacterTeam.characters.length; i++) {
            let playerCharacter = playerCharacterTeam.characters[i];

            if (playerCharacter.alive) {
                playerCharacter.display();
                playerCharacter.attackSelection();
                playerCharacter.neutralPosition();
            }

            else if (playerCharacter.simpleSwing()) {
                state === `enemyTurn`
            }
        }

        // Draws the enemy character
        for (let i = 0; i < enemyTeam.enemies.length; i++) {
            let enemyCharacter = enemyTeam.enemies[i];

            if (enemyCharacter.alive) {
                enemyCharacter.display()
                enemyCharacter.neutralPosition();
                enemyCharacter.defeated();
            }

            console.log(enemyCharacter.alive)
        }

        chargeIncrease()
        gameInfo()
        gameEndConditions()

    }



    else if (state === `enemyTurn`) {

        background(225, 225, 225)

        // Draws the player's character
        for (let i = 0; i < playerCharacterTeam.characters.length; i++) {
            let playerCharacter = playerCharacterTeam.characters[i];

            if (playerCharacter.alive) {
                playerCharacter.display();
                playerCharacter.neutralPosition();
            }
        }

        // Draws the enemy character
        for (let i = 0; i < enemyTeam.enemies.length; i++) {
            let enemyCharacter = enemyTeam.enemies[i];
            if (enemyCharacter.alive) {
                enemyCharacter.display();
                enemyCharacter.attackSelection()
                enemyCharacter.neutralPosition();
            }
        }


        chargeIncrease()
        gameInfo()
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
    background(0, 200, 225)
    // textFont(`Playpen Sans`);
    textAlign(CENTER);
    textSize(62);
    fill(0);
    text(`Defeat your enemy`, windowWidth / 2, windowHeight / 2);
    fill(0, 0, 0);
    textAlign(CENTER);
    textSize(20);
    text(`Use (insert buttons) to execute attacks  `, windowWidth / 2, windowHeight / 2 + 100);
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
        state = `playerTurn`;
        // gameStartSFX.play();
    }
}

function chargeIncrease() {
    for (let i = 0; i < playerCharacterTeam.characters.length; i++) {
        let playerCharacter = playerCharacterTeam.characters[i];
        if (playerCharacter.alive === true) {
            chargeCount = chargeCount + random(5, 50)
            chargeCount = constrain(chargeCount, 0, 200)
            console.log(chargeCount);
        }
    }
}


function gameInfo() {
    // Writes the nectarCount, fishCount and time on the screen
    textAlign(CENTER)
    textSize(62);
    fill(240, 240, 150);
    text(chargeCount, windowWidth / 8 * 3, windowHeight / 8);

    for (let i = 0; i < enemyTeam.enemies.length; i++) {
        let enemyCharacter = enemyTeam.enemies[i];
        textAlign(CENTER)
        textSize(62);
        fill(225, 0, 0);
        text(enemyCharacter.lifeCount, windowWidth / 8 * 7, windowHeight / 8);
    }

    // textAlign(CENTER)
    // textSize(62);
    // fill(225, 0, 0);
    // text(enemyLifeCount, windowWidth / 8 * 7, windowHeight / 8);

    textAlign(CENTER)
    textSize(62);
    fill(100, 200, 50);
    text(playerLifeCount, windowWidth / 8, windowHeight / 8);
}

function gameEndConditions() {
    // Checks if the any game end condition has been met and changes the game state accordingly
    for (let i = 0; i < enemyTeam.enemies.length; i++) {
        let enemyCharacter = enemyTeam.enemies[i];

        if (enemyCharacter.alive === false) {
            state = `winScreen`;
        }
        if (enemyCharacter.lifeCount <= 0) {
            state = `winScreen`;
        }
    }


    // else if (playerCharacterTeam.playerCharacter.alive === false) {
    //     state = `endScreen`;
    // }
}

function gameOver() {
    // Draws the end screen
    textAlign(CENTER);
    textSize(65);
    fill(0, 0, 0);
    text(`You are defeated.`, windowWidth / 2, windowHeight / 2);
    // gameLoseSFX.play();
    noLoop();
}

function gameComplete() {
    // Draws victory screen
    background(0, 200, 225);
    textAlign(CENTER);
    textSize(65);
    fill(0, 0, 0);
    text(`You are the victor!`, windowWidth / 2, windowHeight / 2);
    // gameWinSFX.play();
    noLoop();
}