/**
 * Fateful Encounter
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

// Sets up the chargeCount and roundOffChargeCount variable used to mesure the player's charge level
let chargeCount = 0
let roundOffChargeCount = 0

// Sets up the playerLifeCount variable used to display the player's life points
let playerLifeCount = 100

// Sets up the enemyLifeCount and roundOffEnemyLifeCount variable used to display the enemy's life points
let enemyLifeCount = 100
let roundOffEnemyLifeCount = 0

let playerAttackCheck = false
let enemyAttackCheck = false

// Sets up the initial game state
let state = `title`

/**
 * Description of preload
*/
function preload() {

}


/**
 * Description of setup
 * Creates the canvas, creates the player character and the enemy character.
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

    if (state === `playerTurn`) {

        // Draws the background
        background(225, 225, 225);

        // Resets the enemyAttackCheck value to allow the enemy to attack agan once it will be their turn
        enemyAttackCheck = false;



        // Draws the enemy character
        for (let i = 0; i < enemyTeam.enemies.length; i++) {
            let enemyCharacter = enemyTeam.enemies[i];

            if (enemyCharacter.alive) {
                enemyCharacter.display();
                enemyCharacter.neutralPosition();
                enemyCharacter.defeated();
            }
        }

        // Draws the player's character and allows them to attack
        for (let i = 0; i < playerCharacterTeam.characters.length; i++) {
            let playerCharacter = playerCharacterTeam.characters[i];

            if (playerCharacter.alive) {
                playerCharacter.display();

                if (playerAttackCheck === false) {
                    let attacked = playerCharacter.attackSelection();

                    if (attacked) {
                        setTimeout(enemyTurnSwitch, 2000);
                        setTimeout(playerCharacter.neutralPosition, 2000);
                        playerAttackCheck = true;
                    }
                }

            }
        }
        // Displays the information relevant to the game such as health on both sides and the player's charge count and switches stat if one of the game's end conditions are met
        gameInfo()
        gameEndConditions()

    }



    else if (state === `enemyTurn`) {

        // Draws the background
        background(150, 225, 225);

        // Resets the playerAttackCheck value to allow the player to attack once it will be their turn
        playerAttackCheck = false;

        // Draws the player's character
        for (let i = 0; i < playerCharacterTeam.characters.length; i++) {
            let playerCharacter = playerCharacterTeam.characters[i];

            if (playerCharacter.alive) {
                playerCharacter.display();
                playerCharacter.neutralPosition();
                playerCharacter.defeated();
            }
        }

        // Draws the enemy character and allows them to attack
        for (let i = 0; i < enemyTeam.enemies.length; i++) {
            let enemyCharacter = enemyTeam.enemies[i];
            if (enemyCharacter.alive) {
                if (enemyAttackCheck === false) {
                    let attacked = enemyCharacter.attackSelection();

                    if (attacked) {
                        setTimeout(playerTurnSwitch, 2000);
                        enemyAttackCheck = true;
                        // Increases the player's charge count
                        chargeIncrease();
                    }
                }
                enemyCharacter.display();
            }
        }

        // Displays the information relevant to the game such as health on both sides and the player's charge count and switches stat if one of the game's end conditions are met
        gameInfo();
        gameEndConditions();
    }



    // Draws the end screens
    if (state === `endScreen`) {
        gameOver();
    }

    if (state === `winScreen`) {
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
    text(`Use the arrow keys to execute attacks: left for a simple swing, right for a powerful swing, up for an ultimate attack and down for a skill that consumes the yellow charge count. `, windowWidth / 2, windowHeight / 2 + 100);
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
            roundOffChargeCount = chargeCount.toFixed();
            roundOffChargeCount = constrain(roundOffChargeCount, 0, 200)
        }
    }
}

function enemyTurnSwitch() {
    state = `enemyTurn`
}

function playerTurnSwitch() {
    state = `playerTurn`
}


function gameInfo() {
    // Writes the lifeCount of the player, the enemy and the player's chargeCount
    textAlign(CENTER)
    textSize(62);
    fill(240, 240, 150);
    text(roundOffChargeCount, windowWidth / 8 * 3, windowHeight / 8);

    for (let i = 0; i < enemyTeam.enemies.length; i++) {
        let enemyCharacter = enemyTeam.enemies[i];
        roundOffEnemyLifeCount = enemyCharacter.lifeCount.toFixed();
        roundOffEnemyLifeCount = constrain(roundOffEnemyLifeCount, 0, 100)
        textAlign(CENTER);
        textSize(62);
        fill(225, 0, 0);
        text(roundOffEnemyLifeCount, windowWidth / 8 * 7, windowHeight / 8);
    }

    for (let i = 0; i < playerCharacterTeam.characters.length; i++) {
        let playerCharacter = playerCharacterTeam.characters[i];
        textAlign(CENTER)
        textSize(62);
        fill(100, 200, 50);
        text(playerCharacter.lifeCount, windowWidth / 8, windowHeight / 8);
    }
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

    for (let i = 0; i < playerCharacterTeam.characters.length; i++) {
        let playerCharacter = playerCharacterTeam.characters[i];
        if (playerCharacter.alive === false) {
            state = `endScreen`;
        }

        if (playerCharacter.lifeCount <= 0) {
            state = `endScreen`;
        }
    }
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
    textAlign(CENTER);
    textSize(65);
    fill(0, 0, 0);
    text(`You are the victor!`, windowWidth / 2, windowHeight / 2);
    // gameWinSFX.play();
    noLoop();
}