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
    numEnemies: 5,
    attacker: undefined
}

// Sets up the chargeCount and roundOffChargeCount variable used to mesure the player's charge level
let chargeCount = 0;
let roundOffChargeCount = 0;

// Sets up the playerLifeCount variable used to display the player's life points
let playerLifeCount = 100;

// Sets up the roundOffEnemyLifeCount variable used to display the enemies life points
let roundOffEnemyLifeCount = 0;

// Sets up the playerAttackCheck and enemyAttackCheck variables used to limit the actions of both sides when it is their turn
let playerAttackCheck = `none`;
let enemyAttackCheck = `none`;

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
let DescoDamaged;
let descoDamagedFrames;


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
let ArtinaDamaged;
let artinaDamagedFrames;

// Sets up the variables required for Fenrich's animations
let FenrichIdle;
let FenrichAssasination;
let fenrichAssasinationFrames;
let FenrichDamaged;
let fenrichDamagedFrames;

// Sets up the variables required for Emizel's animations
let EmizelIdle;
let EmizelProofOfStrength;
let emizelProofOfStrengthFrames
let EmizelDamaged;
let emizelDamagedFrames;

// Sets up the variables required for Fuka's animations
let FukaIdle;
let FukaStrike;
let fukaStrikeFrames;
let FukaDamaged;
let fukaDamagedFrames;

// Sets up the variables required for the title screen image and the background
let titleScreenImage;
let backgroundImage;

// Sets up the variables used to assign the images and the appropriate sizes for the enemies
let enemyImages = [];
let enemyImagesSizeX = [];
let enemyImagesSizeY = [];
let enemyAttackImages = [];
let enemyDamagedImages = [];

// Sets up the variables used for the sounds
let beamSFX;
let slashSFX;
let strikeSFX;
let explodeSFX;
let gameLoseSFX;
let gameWinSFX;
let bgMusic;

// Sets up the initial game state
let state = `title`;

/**
 * Preloads all images and sounds required for the program
*/
function preload() {
    // Desco's images
    DescoIdle = loadImage('assets/images/Desco/Desco Idle.gif');
    DescoSwing = loadImage('assets/images/Desco/Desco Swing.gif');
    DescoBladeSwing = loadImage('assets/images/Desco/Desco Blade Strike.gif');
    DescoBeamCast = loadImage('assets/images/Desco/Desco Beam Cast.gif')
    DescoTrueDarkRelease = loadImage('assets/images/Desco/Desco True Dark Release.gif')
    DescoDamaged = loadImage('assets/images/Desco/Desco Damaged.gif');
    // Valvatorez's images
    ValvatorezIdle = loadImage('assets/images/Valvatorez/Valvatorez Idle.gif');
    ValvatorezStrike = loadImage('assets/images/Valvatorez/Valvatorez Strike.gif');
    ValvatorezDamaged = loadImage('assets/images/Valvatorez/Valvatorez Damaged.gif');
    // Artina's images
    ArtinaIdle = loadImage('assets/images/Artina/Artina Idle.gif');
    ArtinaAngelicRay = loadImage('assets/images/Artina/Artina Angelic Ray.gif')
    ArtinaDamaged = loadImage('assets/images/Artina/Artina Damaged.gif')
    // Fenrich's images
    FenrichIdle = loadImage('assets/images/Fenrich/Fenrich Idle.gif');
    FenrichAssasination = loadImage('assets/images/Fenrich/Fenrich How to kill a Netherworld President.gif');
    FenrichDamaged = loadImage('assets/images/Fenrich/Fenrich Damaged.gif');
    // Emizel's images
    EmizelIdle = loadImage('assets/images/Emizel/Emizel Idle.gif');
    EmizelProofOfStrength = loadImage('assets/images/Emizel/Emizel proof of strength.gif');
    EmizelDamaged = loadImage('assets/images/Emizel/Emizel Damaged.gif');
    // Fuka's images
    FukaIdle = loadImage('assets/images/Fuka/Fuka Idle.gif');
    FukaStrike = loadImage('assets/images/Fuka/Fuka Strike.gif');
    FukaDamaged = loadImage('assets/images/Fuka/Fuka Damaged.gif');
    // title screen image and background image
    titleScreenImage = loadImage('assets/images/Desco Training program intro text.png');
    backgroundImage = loadImage('assets/images/Forest Path.png');

    // Enemy Images and their size values
    enemyImages = [ValvatorezIdle, ArtinaIdle, EmizelIdle, FukaIdle, FenrichIdle];
    enemyImagesSizeX = [550, 550, 550, 550, 550];
    enemyImagesSizeY = [550, 550, 550, 550, 550];
    enemyAttackImages = [ValvatorezStrike, ArtinaAngelicRay, EmizelProofOfStrength, FukaStrike, FenrichAssasination,]
    enemyDamagedImages = [ValvatorezDamaged, ArtinaDamaged, EmizelDamaged, FukaDamaged, FenrichDamaged]

    // Loads all sounds
    beamSFX = loadSound('assets/sounds/BeamShot.wav')
    slashSFX = loadSound('assets/sounds/SlashHit.wav')
    strikeSFX = loadSound('assets/sounds/StrikeHit.wav')
    explodeSFX = loadSound('assets/sounds/ExplodeHit.wav')
    gameLoseSFX = loadSound('assets/sounds/GameLose.wav')
    gameWinSFX = loadSound('assets/sounds/GameWin.wav')
    bgMusic = loadSound('assets/sounds/Across The Darkness.wav')

}

/**
 * Description of setup
 * Creates the canvas, creates the player character and the enemy character.
*/
function setup() {
    // Creates the canvas
    createCanvas(1280, 650);

    // Sets the variables for the player character's creation
    for (let i = 0; i < playerCharacterTeam.numPlayers; i++) {
        // Assign variables for the arguments
        let x = windowWidth / 5;
        let y = windowHeight / 5 * 3;

        // Create the player character 
        let playercharacter = new PlayerCharacter(x, y);
        // Add the player's character to the array of player characters
        playerCharacterTeam.characters.push(playercharacter);
    }

    // Sets the variables for the enemy character's creation
    for (let i = 0; i < enemyTeam.numEnemies; i++) {
        // Assign variables for the arguments
        let x = windowWidth / 5 * 2.3 + i * 120;
        let y = windowHeight / 5 * 3 - i * 20;

        // Create the enemy characters 
        let enemyCharacter = new Enemy(x, y, enemyImagesSizeX[i], enemyImagesSizeY[i], enemyImages[i], enemyAttackImages[i], enemyDamagedImages[i], `enemy${i + 1}`);
        // Add the enemy's character to the array of enemy characters
        enemyTeam.enemies.push(enemyCharacter);
    }

    // Frame count for Desco's animations, used to reset the animations
    descoSwingFrames = DescoSwing.numFrames();
    descoDamagedFrames = DescoDamaged.numFrames();
    descoBladeSwingFrames = DescoBladeSwing.numFrames();
    descoBeamCastFrames = DescoBeamCast.numFrames();
    descoTrueDarkReleaseFrames = DescoTrueDarkRelease.numFrames();

    // Frame count for Valvatorez's animations, used to reset the animations
    valvatorezStrikeFrames = ValvatorezStrike.numFrames();
    valvatorezDamagedFrames = ValvatorezDamaged.numFrames();

    // Frame count for Artina's animations, used to reset the animations
    artinaAngelicRayFrames = ArtinaAngelicRay.numFrames();
    artinaDamagedFrames = ArtinaDamaged.numFrames();

    // Frame count for Fenrich's animations, used to reset the animations
    fenrichAssasinationFrames = FenrichAssasination.numFrames();
    fenrichDamagedFrames = FenrichDamaged.numFrames();

    // Frame count for Emizel's animations, used to reset the animations
    emizelProofOfStrengthFrames = EmizelProofOfStrength.numFrames();
    emizelDamagedFrames = EmizelDamaged.numFrames();

    // Frame count for Fuka's animations, used to reset the animations
    fukaStrikeFrames = FukaStrike.numFrames();
    fukaDamagedFrames = FukaDamaged.numFrames();
}


/**
 * Description of draw()
*/
function draw() {
    // Draws the title screen
    titleScreen();

    // Manages what happens during the player's turn
    if (state === `playerTurn`) {

        // Draws the background
        imageMode(CENTER);
        image(backgroundImage, width / 2, height / 2, width, height);

        // Resets the enemyAttackCheck value to allow the enemy to attack again once it will be their turn
        enemyAttackCheck = `none`;

        // Draws the enemy character
        for (let i = 0; i < enemyTeam.enemies.length; i++) {
            let enemyCharacter = enemyTeam.enemies[i];

            if (enemyCharacter.alive) {
                enemyCharacter.display();
                enemyCharacter.defeated();
            }
        }

        // Draws the player's character and allows them to attack
        for (let i = 0; i < playerCharacterTeam.characters.length; i++) {
            let playerCharacter = playerCharacterTeam.characters[i];

            if (playerCharacter.alive) {
                playerCharacter.display();

                if (playerAttackCheck === `none`) {
                    let attackType = playerCharacter.attackSelection();

                    // The following "if" statements time the turn switch in order to let the player's attack animation play out completely
                    if (attackType == `simpleSwing`) {

                        // Times the switch to the enemies' turn
                        setTimeout(enemyTurnSwitch, 2000);

                        // Returns the player to neutral
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
        // Displays the information relevant to the game such as health on both sides and the player's charge count and switches state if one of the game's end conditions are met
        gameInfo()
        gameEndConditions()
    }

    // Manages what happens during the enemies' turn
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
                playerCharacter.defeated();
            }
        }

        // Selects the enemy the enemy character that will attack during the enemies turn.
        let enemyCharacter = enemyTeam.attacker;
        if (enemyCharacter.alive) {

            // Selects the which attack the enemies will use
            if (enemyAttackCheck === `none`) {
                let attackType = enemyCharacter.attackSelection();

                // The following "if" statements play the attack animations and time the turn switch in order to let the enemies' attack animation play out completely
                if (attackType === `simpleStrike`) {
                    // Plays the enemy's attack animation
                    enemyCharacter.simpleStrike()

                    // Resets the enemy to neutral and switches turn
                    setTimeout(playerTurnSwitch, 2000);
                    setTimeout(() => {
                        enemyCharacter.neutralPosition()
                    }, 2000);

                    // Increases the player's charge count
                    chargeIncrease();
                    enemyAttackCheck = `attackType`
                }

                if (attackType === `angelicRay`) {
                    // Plays the enemy's attack animation
                    enemyCharacter.angelicRay()

                    // Resets the enemy to neutral and switches turn
                    setTimeout(playerTurnSwitch, 3700);
                    setTimeout(() => {
                        enemyCharacter.neutralPosition()
                    }, 3000);

                    // Increases the player's charge count
                    chargeIncrease();
                    enemyAttackCheck = `attackType`
                }

                if (attackType === `EmizelProofOfStrength`) {
                    // Plays the enemy's attack animation
                    enemyCharacter.EmizelProofOfStrength()

                    // Resets the enemy to neutral and switches turn
                    setTimeout(playerTurnSwitch, 3700);
                    setTimeout(() => {
                        enemyCharacter.neutralPosition()
                    }, 3000);

                    // Increases the player's charge count
                    chargeIncrease();
                    enemyAttackCheck = `attackType`
                }

                if (attackType === `howToKillANetherworldPresident`) {
                    // Plays the enemy's attack animation
                    enemyCharacter.howToKillANetherworldPresident()

                    // Resets the enemy to neutral and switches turn
                    setTimeout(playerTurnSwitch, 5200);
                    setTimeout(() => {
                        enemyCharacter.neutralPosition()
                    }, 4900);

                    // Increases the player's charge count
                    chargeIncrease();
                    enemyAttackCheck = `attackType`
                }

                if (attackType === `FukaStrike`) {
                    // Plays the enemy's attack animation
                    enemyCharacter.FukaStrike()

                    // Resets the enemy to neutral and switches turn
                    setTimeout(playerTurnSwitch, 2000);
                    setTimeout(() => {
                        enemyCharacter.neutralPosition()
                    }, 2000);

                    // Increases the player's charge count
                    chargeIncrease();
                    enemyAttackCheck = `attackType`
                }
            }
        }

        // Displays the enemies
        for (let i = 0; i < enemyTeam.enemies.length; i++) {
            let enemyCharacter = enemyTeam.enemies[i];
            if (enemyCharacter.alive) {
                enemyCharacter.display();
            }
        }

        // Displays the information relevant to the game such as health on both sides and the player's charge count and switches state if one of the game's end conditions are met
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
    background(250, 235, 215)
    image(titleScreenImage, width / 2, height / 3, 650, 650);
    fill(0, 0, 0);
    textAlign(CENTER);
    textSize(20);
    text(`Use the arrow keys to execute attacks.`, width / 2, height / 1.28);
    textSize(18);
    text(` Left for a simple strike, right for a beam attack, up for a crushing blade strike and down for a powerful skill that consumes the yellow charge count.`, width / 2, height / 1.2)
    fill(0, 0, 0);
    textSize(30);
    text(`Click to start!`, width / 2, height / 1.35);
    textSize(10);
    text(`All characters and sprites belong to NIS America/Japan (Disgaea 4). Sound effects belong to SNK. Animations done by me (Malcolm).`, width / 2, height / 1.1);

    // Displays Desco on the title screen
    imageMode(CENTER)
    image(DescoIdle, 200, windowHeight / 3.1, 500, 500);
    textAlign(CENTER);
    textSize(20);
    fill(0, 0, 0);
    text(`This is Desco!`, 210, windowHeight / 1.8);
    textSize(16);
    text(`She wants to become a final boss. 
    This training could help her reach that goal.`, 210, windowHeight / 1.7);

    // Displays Valvatorez on the title screen
    image(ValvatorezIdle, 1000, 100, 450, 450);
    textAlign(CENTER);
    textSize(20);
    fill(0, 0, 0);
    text(`These are your opponents!`, 1080, windowHeight / 1.6);
    textSize(16);
    text(`Valvatorez`, 990, 210);

    // Displays Artina on the title screen
    image(ArtinaIdle, 1100, 100, 450, 450);
    textAlign(CENTER);
    textSize(16);
    fill(0, 0, 0);
    text(`Artina`, 1100, 210);

    // Displays Emizel on the title screen
    image(EmizelIdle, 1230, 100, 450, 450);
    textAlign(CENTER);
    textSize(16);
    fill(0, 0, 0);
    text(`Emizel`, 1200, 210);

    // Displays Fuka on the title screen
    image(FukaIdle, 1000, 300, 450, 450);
    textAlign(CENTER);
    textSize(16);
    fill(0, 0, 0);
    text(`Fuka`, 1000, 400);

    // Displays Fenrich on the title screen
    image(FenrichIdle, 1150, 320, 450, 450);
    textAlign(CENTER);
    textSize(16);
    fill(0, 0, 0);
    text(`Fenrich`, 1150, 400);


}

function mouseClicked() {
    // Initiates the game
    if (state === `title`) {
        state = `playerTurn`;
        playBgMusic()
    }
}

function playBgMusic() {
    if (!bgMusic.isPlaying()) {
        bgMusic.loop();
    }
}

function chargeIncrease() {
    // Increases the player's charge count by a random value when it is called
    for (let i = 0; i < playerCharacterTeam.characters.length; i++) {
        let playerCharacter = playerCharacterTeam.characters[i];
        if (playerCharacter.alive === true) {
            chargeCount = chargeCount + random(5, 50);
            chargeCount = constrain(chargeCount, 0, 200);
            roundOffChargeCount = chargeCount.toFixed();
            roundOffChargeCount = constrain(roundOffChargeCount, 0, 200);
        }
    }
}

function enemyTurnSwitch() {
    // Switches the turn to the enemies turn and selects a random enemy that will attack
    state = `enemyTurn`
    enemyTeam.attacker = random(enemyTeam.enemies)
    // Resets the enemies position
    for (let i = 0; i < enemyTeam.enemies.length; i++) {
        let enemyCharacter = enemyTeam.enemies[i];
        enemyCharacter.neutralPosition();
    };
}

function playerTurnSwitch() {
    // Switches the turn to the player's turn
    state = `playerTurn`
    // Resets the player's position
    for (let i = 0; i < playerCharacterTeam.characters.length; i++) {
        let playerCharacter = playerCharacterTeam.characters[i];
        playerCharacter.neutralPosition()
    }
    // Resets the enemies position
    for (let i = 0; i < enemyTeam.enemies.length; i++) {
        let enemyCharacter = enemyTeam.enemies[i];
        enemyCharacter.neutralPosition();
    };
}


function gameInfo() {
    // Writes the lifeCount of the player's charge count
    textAlign(CENTER)
    textSize(62);
    fill(240, 240, 150);
    text(roundOffChargeCount, windowWidth / 8 * 1.8, windowHeight / 8);

    // Writes the enemies life count
    for (let i = 0; i < enemyTeam.enemies.length; i++) {
        let enemyCharacter = enemyTeam.enemies[i];
        if (enemyCharacter.alive, i === 0) {
            roundOffEnemyLifeCount = enemyCharacter.lifeCount.toFixed();
            roundOffEnemyLifeCount = constrain(roundOffEnemyLifeCount, 0, 600)
            textAlign(CENTER);
            textSize(62);
            fill(225, 0, 0);
            text(roundOffEnemyLifeCount, windowWidth / 8 * 6, windowHeight / 8);
        }
    }

    // Writes the player's life count
    for (let i = 0; i < playerCharacterTeam.characters.length; i++) {
        let playerCharacter = playerCharacterTeam.characters[i];
        textAlign(CENTER);
        textSize(62);
        fill(100, 200, 50);
        text(playerCharacter.lifeCount, windowWidth / 8, windowHeight / 8);
    }
}

// Checks if the any game end condition has been met and changes the game state accordingly
function gameEndConditions() {
    // Checks if the enemies are defeated
    for (let i = 0; i < enemyTeam.enemies.length; i++) {
        let enemyCharacter = enemyTeam.enemies[i];

        if (enemyCharacter.alive === false) {
            state = `winScreen`;
        }
        if (enemyCharacter.lifeCount <= 0) {
            state = `winScreen`;
        }
    }

    // Checks if the player is defeated
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
    fill(255, 255, 255);
    text(`You are defeated. 
    Train Harder!`, width / 2, height / 2);
    gameLoseSFX.play();
    bgMusic.stop()
    noLoop();
}

function gameComplete() {
    // Draws victory screen
    textAlign(CENTER);
    textSize(65);
    fill(255, 255, 255);
    text(`You are the victor! 
    You have the potential of a Final Boss!`, width / 2, height / 2);
    gameWinSFX.play();
    bgMusic.stop()
    noLoop();
}