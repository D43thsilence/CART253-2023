class PlayerCharacter {
    // The constructor sets up the player character's propreties
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.sizeX = 500;
        this.sizeY = 500;
        this.vx = 0;
        this.vy = 0;
        this.speed = 5;
        this.aX = 0;
        this.aY = 0;
        this.acceleration = 2;
        this.alive = true;
        this.lifeCount = 400;
        this.idleImage = DescoIdle;
        this.simpleSwingImage = DescoSwing;
        this.bladeStrikeImage = DescoBladeSwing;
        this.castImage = DescoBeamCast;
        this.darkReleaseImage = DescoTrueDarkRelease;
        this.damagedImage = DescoDamaged;
        this.image = this.idleImage;
    }

    // display() draws the player onto the canvas
    display() {
        image(this.image, this.x, this.y, this.sizeX, this.sizeY);


        // Resets Desco's animations to their first frames after the neutral position reset
        if (DescoSwing.getCurrentFrame() === descoSwingFrames - 1) {
            DescoSwing.pause();
            setTimeout(() => {
                DescoSwing.setFrame(0)
            }, 2000);
        }

        if (DescoDamaged.getCurrentFrame() === descoDamagedFrames - 1) {
            DescoDamaged.pause();
            setTimeout(() => {
                DescoDamaged.setFrame(0)
            }, 2000);
        }

        if (DescoBladeSwing.getCurrentFrame() === descoBladeSwingFrames - 1) {
            DescoBladeSwing.pause();
            setTimeout(() => {
                DescoBladeSwing.setFrame(0)
            }, 2000);
        }

        if (DescoBeamCast.getCurrentFrame() === descoBeamCastFrames - 1) {
            DescoBeamCast.pause();
            setTimeout(() => {
                DescoBeamCast.setFrame(0)
            }, 2000);
        }

        if (DescoTrueDarkRelease.getCurrentFrame() === descoTrueDarkReleaseFrames - 1) {
            DescoTrueDarkRelease.pause();
            setTimeout(() => {
                DescoTrueDarkRelease.setFrame(0)
            }, 2000);
        }


    }

    neutralPosition() {
        this.image = this.idleImage
        this.x = windowWidth / 5;
        this.y = windowHeight / 5 * 3;
        this.sizeX = 500
        this.sizeY = 500
        console.log(`hello`)
    }


    attackSelection() {
        // Uses key presses to select which attack to use
        if (keyIsDown(LEFT_ARROW)) {
            this.simpleSwing()
            return `simpleSwing`
        }

        else if (keyIsDown(RIGHT_ARROW)) {
            this.finalBossArises()
            return `finalBossArises`
        }

        else if (keyIsDown(38)) {
            this.trueGodlyWeapon()
            return `trueGodlyWeapon`
        }

        else if (keyIsDown(40)) {
            this.trueDarkRelease()
            return `trueDarkRelease`
        }

        else {
            return `none`
        }

    }

    simpleSwing() {
        // Plays the animation for Desco's simple swing attack and deduced the written amount of life points to the enemy
        this.image = this.simpleSwingImage
        DescoSwing.play()

        for (let i = 0; i < enemyTeam.enemies.length; i++) {
            let enemyCharacter = enemyTeam.enemies[i];
            if (enemyCharacter.alive, i === 0) {
                this.x = enemyCharacter.neutralX - 120
                setTimeout(() => {
                    enemyCharacter.damaged()
                }, 900);
                enemyCharacter.lifeCount = enemyCharacter.lifeCount - 20
                chargeIncrease()
            }
        }
    }

    finalBossArises() {
        // Plays the animation and sound for Desco's Final Boss Arises attack and deduces the written amount of life points to the enemy
        DescoBeamCast.play()
        this.x = windowWidth / 2
        this.y = windowHeight / 3
        this.sizeX = 1920
        this.sizeY = 1080
        this.image = this.castImage
        // Plays the sound with correct timing
        setTimeout(() => {
            beamSFX.play()
        }, 500);

        for (let i = 0; i < enemyTeam.enemies.length; i++) {
            let enemyCharacter = enemyTeam.enemies[i];
            if (enemyCharacter.alive) {
                setTimeout(() => {
                    // Plays the enemy damaged animation with correct timing
                    enemyCharacter.damaged()
                }, 500);
                enemyCharacter.lifeCount = enemyCharacter.lifeCount - 40
            }
        }

    }

    trueGodlyWeapon() {
        // Plays the animation for Desco's True Godly Weapon attack and deduces the written amount of life points to the enemy
        DescoBladeSwing.play()
        this.x = windowWidth / 2
        this.y = windowHeight / 3
        this.sizeX = 1920
        this.sizeY = 1080
        this.image = this.bladeStrikeImage
        setTimeout(() => {
            slashSFX.play()
        }, 1000);

        for (let i = 0; i < enemyTeam.enemies.length; i++) {
            let enemyCharacter = enemyTeam.enemies[i];
            if (enemyCharacter.alive) {
                setTimeout(() => {
                    enemyCharacter.damaged()
                }, 11000);
                enemyCharacter.lifeCount = enemyCharacter.lifeCount - 70
            }
        }
    }

    trueDarkRelease() {
        // Plays the animation for Desco's True Dark Release attack and deduces the written amount of life points to the enemy
        DescoTrueDarkRelease.play();
        this.x = 800;
        this.y = 450;
        this.sizeX = 1920;
        this.sizeY = 1080;
        this.image = this.darkReleaseImage;

        for (let i = 0; i < enemyTeam.enemies.length; i++) {
            let enemyCharacter = enemyTeam.enemies[i];
            if (enemyCharacter.alive) {
                setTimeout(() => {
                    enemyCharacter.damaged()
                }, 900);
                // This attack's damage scales off of the player's charge count and spends it all. A higher charge count makes this attack deal more damage.
                enemyCharacter.lifeCount = enemyCharacter.lifeCount - chargeCount * 0.2
                chargeCount = 0
            }
        }
    }

    damaged() {
        // Plays Desco's (the player) damage animation
        this.image = this.damagedImage
        DescoDamaged.play()
    }

    defeated() {
        // Checks if Desco (the player) is alive and if not, changes their alive state to reflect their defeat.
        if (this.lifeCount <= 0) {
            this.alive === false
        }
    }
}