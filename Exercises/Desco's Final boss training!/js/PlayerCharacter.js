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
        this.damagedImage = DescoHurt;
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

        if (DescoHurt.getCurrentFrame() === descoHurtFrames - 1) {
            DescoHurt.pause();
            setTimeout(() => {
                DescoHurt.setFrame(0)
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
        this.x = windowWidth / 4;
        this.y = windowHeight / 4 * 3;
        this.sizeX = 500
        this.sizeY = 500
        this.image = this.idleImage
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
        // Plays the animation for Desco's simple swing attack and deduced the selected amount of life points to the enemy
        this.image = this.simpleSwingImage
        DescoSwing.play()

        for (let i = 0; i < enemyTeam.enemies.length; i++) {
            let enemyCharacter = enemyTeam.enemies[i];
            if (enemyCharacter.alive, i === 0) {
                this.x = enemyCharacter.neutralX - 120
                enemyCharacter.damaged()
                enemyCharacter.lifeCount = enemyCharacter.lifeCount - 20
                chargeIncrease()
            }
            if (enemyCharacter.alive) {
                enemyCharacter.lifeCount = enemyCharacter.lifeCount - 20
                chargeIncrease()
            }
        }
    }

    finalBossArises() {
        DescoBeamCast.play()
        this.x = windowWidth / 2
        this.y = windowHeight / 3
        this.sizeX = 1920
        this.sizeY = 1080
        this.image = this.castImage

        beamSFX.play()

        for (let i = 0; i < enemyTeam.enemies.length; i++) {
            let enemyCharacter = enemyTeam.enemies[i];
            if (enemyCharacter.alive) {
                enemyCharacter.damaged()
                enemyCharacter.lifeCount = enemyCharacter.lifeCount - 40
            }
        }

    }

    trueGodlyWeapon() {
        DescoBladeSwing.play()
        this.x = windowWidth / 2
        this.y = windowHeight / 3
        this.sizeX = 1920
        this.sizeY = 1080
        this.image = this.bladeStrikeImage

        for (let i = 0; i < enemyTeam.enemies.length; i++) {
            let enemyCharacter = enemyTeam.enemies[i];
            if (enemyCharacter.alive) {
                enemyCharacter.damaged()
                enemyCharacter.lifeCount = enemyCharacter.lifeCount - 70
            }
        }
    }

    trueDarkRelease() {

        DescoTrueDarkRelease.play();
        this.x = windowWidth / 2;
        this.y = windowHeight / 2;
        this.sizeX = 1920;
        this.sizeY = 1080;
        this.image = this.darkReleaseImage;

        for (let i = 0; i < enemyTeam.enemies.length; i++) {
            let enemyCharacter = enemyTeam.enemies[i];
            if (enemyCharacter.alive) {
                enemyCharacter.lifeCount = enemyCharacter.lifeCount - chargeCount * 0.2
                chargeCount = 0
            }
        }
    }

    damaged() {
        // if (attackType === `simpleStrike`) {
        //     setTimeout(() => {
        //         this.image = this.damagedImage
        //     }, 100)

        //     setTimeout(() => {
        //         this.neutralPosition
        //     }, 2000);
        // }
    }

    defeated() {
        if (this.lifeCount <= 0) {
            this.alive === false
        }
        // console.log(this.alive)
    }
}