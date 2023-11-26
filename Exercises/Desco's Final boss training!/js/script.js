/**
 * Desco's final boss training
 * Malcolm Siné Tadonki
 * 
 * This project is a battle simulator, use your skills appropriately in order to defeat many enemies.
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
    numEnemies: 5
}

// Sets up the chargeCount and roundOffChargeCount variable used to mesure the player's charge level
let chargeCount = 0;
let roundOffChargeCount = 0;

// Sets up the playerLifeCount variable used to display the player's life points
let playerLifeCount = 100;

// Sets up the enemyLifeCount and roundOffEnemyLifeCount variable used to display the enemy's life points
let enemyLifeCount = 100;
let roundOffEnemyLifeCount = 0;

// Sets up the playerAttackCheck and enemyAttackCheck variables used to limit the actions of both sides when it is their turn
let playerAttackCheck = `none`;
let descoSimpleSwingCheck = false;
let enemyAttackCheck = false;

// Sets up the variables required for Desco's animations
let DescoIdle;
let DescoSwing;
let descoSwingFrames;
let DescoBladeSwing;
let descoBladeSwingFrames;
let DescoBeamCast;
let descoBeamCastFrames;
let DescoTrueDarkRelease;
let descoTrueDarkReleaseFrames;
let DescoHurt;
let descoHurtFrames;


// Sets up the variables required for Valvatorez's animations
let ValvatorezIdle;
let ValvatorezStrike;
let valvatorezStrikeFrames;
let ValvatorezDamaged;
let valvatorezDamagedFrames;

// Sets up the variables required for Artina's animations
let ArtinaIdle;
let ArtinaAngelicRay;
let artinaAngelicRayFrames;

// Sets up the variables required for Fenrich's animations
let FenrichIdle;
let FenrichBow;
let fenrichBowFrames;

// Sets up the variables required for Emizel's animations
let EmizelIdle;

// Sets up the variables required for Fuka's animations
let FukaIdle;

// Sets up the variable required for the background
let backgroundImage;

// Sets up the variables used to assign the images and the appropriate sizes for the enemies
let enemyImages = [];
let enemyImagesX = [];
let enemyImagesY = [];
let enemyAttackImages = [];
let enemyDamagedImages = [];

// Sets up the initial game state
let state = `title`;



/**
 * Preloads all images required for the program
*/
function preload() {
    // Desco's images
    DescoIdle = loadImage('assets/images/Desco/Desco Idle.gif');
    DescoSwing = loadImage('assets/images/Desco/Desco Swing.gif');
    DescoBladeSwing = loadImage('assets/images/Desco/Desco Blade Strike.gif');
    DescoBeamCast = loadImage('assets/images/Desco/Desco Beam Cast.gif')
    DescoTrueDarkRelease = loadImage('assets/images/Desco/Desco True Dark Release.gif')
    DescoHurt = loadImage('assets/images/Desco/Desco Hurt.gif');
    // Valvatorez's images
    ValvatorezIdle = loadImage('assets/images/Valvatorez/Valvatorez Idle.gif');
    ValvatorezStrike = loadImage('assets/images/Valvatorez/Valvatorez Strike.gif');
    ValvatorezDamaged = loadImage('assets/images/Valvatorez/Valvatorez Damaged.png');
    // Artina's images
    ArtinaIdle = loadImage('assets/images/Artina/Artina Idle.gif');
    ArtinaAngelicRay = loadImage('assets/images/Artina/Artina Angelic Ray.gif')
    // Fenrich's images
    FenrichIdle = loadImage('assets/images/Fenrich/Fenrich Idle.gif');
    FenrichBow = loadImage('assets/images/Fenrich/Fenrich Bow.gif');
    // Emizel's images
    EmizelIdle = loadImage('assets/images/Emizel/Emizel Idle.gif');
    // Fuka's images
    FukaIdle = loadImage('assets/images/Fuka/Fuka Idle.gif')
    // background image
    backgroundImage = loadImage('assets/images/Forest Path.png');

    // Enemy Images and their size values
    enemyImages = [ValvatorezIdle, ArtinaIdle, EmizelIdle, FenrichIdle, FukaIdle];
    enemyImagesX = [550, 550, 550, 550, 550];
    enemyImagesY = [550, 550, 550, 550, 550];
    enemyAttackImages = [ValvatorezStrike, ArtinaAngelicRay, ValvatorezStrike, FenrichBow, ValvatorezStrike]
    enemyDamagedImages = [ValvatorezDamaged, ValvatorezDamaged, ValvatorezDamaged, ValvatorezDamaged, ValvatorezDamaged]

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
        let x = windowWidth / 4 * 2.5 + i * 120;
        let y = windowHeight / 4 * 3 - i * 20;

        // Create the player character 
        let enemyCharacter = new Enemy(x, y, enemyImagesX[i], enemyImagesY[i], enemyImages[i], enemyAttackImages[i], enemyDamagedImages[i]);
        // Add the enemy's character to the array of player characters
        enemyTeam.enemies.push(enemyCharacter);
    }

    // Frame count for Desco's animations
    descoSwingFrames = DescoSwing.numFrames();
    descoHurtFrames = DescoHurt.numFrames();
    descoBladeSwingFrames = DescoBladeSwing.numFrames();
    descoBeamCastFrames = DescoBeamCast.numFrames();
    descoTrueDarkReleaseFrames = DescoTrueDarkRelease.numFrames();

    // Frame count for Valvatorez's animations
    valvatorezStrikeFrames = ValvatorezStrike.numFrames();
    valvatorezDamagedFrames = ValvatorezDamaged.numFrames();

    // Frame count for Artina's animations
    artinaAngelicRayFrames = ArtinaAngelicRay.numFrames();

    // fenrichBowFrames = FenrichBow.numframes();
    // fenrichDamagedFrames = FenrichDamaged.numframes()



}


/**
 * Description of draw()
*/
function draw() {

    // Draws the title screen
    titleScreen();

    if (state === `playerTurn`) {

        // Draws the background
        imageMode(CENTER);
        image(backgroundImage, width / 2, height / 2, width, height);

        // Resets the enemyAttackCheck value to allow the enemy to attack agan once it will be their turn
        enemyAttackCheck = `none`;



        // Draws the enemy character
        for (let i = 0; i < enemyTeam.enemies.length; i++) {
            let enemyCharacter = enemyTeam.enemies[i];

            if (enemyCharacter.alive) {
                enemyCharacter.display();
                // enemyCharacter.neutralPosition();
                enemyCharacter.defeated();
            }
        }

        // Draws the player's character and allows them to attack
        for (let i = 0; i < playerCharacterTeam.characters.length; i++) {
            let playerCharacter = playerCharacterTeam.characters[i];

            if (playerCharacter.alive) {
                // playerCharacter.neutralPosition()
                playerCharacter.display();

                if (playerAttackCheck === `none`) {
                    let attackType = playerCharacter.attackSelection();

                    // The following "if" statements time the turn switch in order to let the player's attack animation play out completely
                    if (attackType == `simpleSwing`) {
                        setTimeout(enemyTurnSwitch, 2000);
                        setTimeout(() => {
                            playerCharacter.neutralPosition()
                        }, 2000);
                        playerAttackCheck = `attackType`;
                    }

                    if (attackType == `finalBossArises`) {
                        setTimeout(enemyTurnSwitch, 2000);
                        setTimeout(() => {
                            playerCharacter.neutralPosition()
                        }, 2000);
                        playerAttackCheck = `attackType`;
                    }

                    if (attackType == `trueGodlyWeapon`) {
                        setTimeout(enemyTurnSwitch, 2000);
                        setTimeout(() => {
                            playerCharacter.neutralPosition()
                        }, 2000);
                        playerAttackCheck = `attackType`;
                    }

                    if (attackType == `trueDarkRelease`) {
                        console.log(`hello`)
                        setTimeout(enemyTurnSwitch, 6500);
                        setTimeout(() => {
                            playerCharacter.neutralPosition()
                        }, 5280);
                        playerAttackCheck = `attackType`;
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
        imageMode(CENTER);
        image(backgroundImage, width / 2, height / 2, width, height);

        // Resets the playerAttackCheck value to allow the player to attack once it will be their turn
        playerAttackCheck = `none`;

        // Draws the player's character
        for (let i = 0; i < playerCharacterTeam.characters.length; i++) {
            let playerCharacter = playerCharacterTeam.characters[i];

            if (playerCharacter.alive) {
                playerCharacter.display();
                // playerCharacter.neutralPosition();
                playerCharacter.defeated();
            }
        }

        // Draws the enemy character and allows them to attack
        for (let i = 0; i < enemyTeam.enemies.length; i++) {
            let enemyCharacter = enemyTeam.enemies[i];
            if (enemyCharacter.alive) {
                if (enemyAttackCheck === `none`) {
                    let attackType = enemyCharacter.attackSelection();

                    if (attackType !== `none`) {
                        setTimeout(playerTurnSwitch, 2000);
                        setTimeout(() => {
                            enemyCharacter.neutralPosition()
                        }, 2000);
                        enemyAttackCheck = true;
                        // Increases the player's charge count
                        chargeIncrease();
                        enemyAttackCheck = `attackType`
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
    text(`Desco's Final Boss Training!`, windowWidth / 2, windowHeight / 2);
    fill(0, 0, 0);
    textAlign(CENTER);
    textSize(20);
    text(`Use the arrow keys to execute attacks.`, windowWidth / 2, windowHeight / 2 + 100);
    text(` Left for a simple strike, right for a beam attack, up for a crushing blade strike and down for a powerful skill that consumes the yellow charge count.`, windowWidth / 2, windowHeight / 2 + 130)
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