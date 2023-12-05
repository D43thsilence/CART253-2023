class Enemy {

    // The constructor sets up the enemy's starting properties
    constructor(x, y, enemyImagesSizeX, enemyImagesSizeY, enemyIdleImage, enemyAttackImage, enemyDamagedImage, enemyName) {
        this.x = x;
        this.y = y;
        this.neutralX = x;
        this.neutralY = y;
        this.sizeX = enemyImagesSizeX;
        this.sizeY = enemyImagesSizeY;
        this.neutralSizeX = 550;
        this.neutralSizeY = 550;
        this.lifeCount = 600
        this.alive = true;
        this.idleImage = enemyIdleImage;
        this.attackImage = enemyAttackImage;
        this.damagedImage = enemyDamagedImage;
        this.ArtinaAttack = ArtinaAngelicRay;
        this.FenrichAttack = FenrichAssasination;
        this.EmizelAttack = EmizelProofOfStrength;
        this.FukaAttack = FukaStrike;
        this.image = this.idleImage;
        this.name = enemyName;

    }

    // display() draws the enemy onto the canvas and resets animations when needed
    display() {
        // Draws the enemies onto the canvas
        imageMode(CENTER)
        image(this.image, this.x, this.y, this.sizeX, this.sizeY);

        // Resets the enemies attack and damage animations when they reach their frame count in order to allow them to be played correctly multiple times
        if (ValvatorezStrike.getCurrentFrame() === valvatorezStrikeFrames - 1) {
            ValvatorezStrike.pause();
            setTimeout(() => {
                ValvatorezStrike.setFrame(0);
            }, 2000);
        }

        if (ArtinaAngelicRay.getCurrentFrame() === artinaAngelicRayFrames - 1) {
            ArtinaAngelicRay.pause();
            setTimeout(() => {
                ArtinaAngelicRay.setFrame(0);
            }, 2000);
        }

        if (FenrichAssasination.getCurrentFrame() === fenrichAssasinationFrames - 1) {
            FenrichAssasination.pause();
            setTimeout(() => {
                FenrichAssasination.setFrame(0);
            }, 2000);
        }

        if (EmizelProofOfStrength.getCurrentFrame() === emizelProofOfStrengthFrames - 1) {
            EmizelProofOfStrength.pause();
            setTimeout(() => {
                EmizelProofOfStrength.setFrame(0);
            }, 2000);
        }

        if (FukaStrike.getCurrentFrame() === fukaStrikeFrames - 1) {
            FukaStrike.pause();
            setTimeout(() => {
                FukaStrike.setFrame(0);
            }, 2000);
        }

        if (ValvatorezDamaged.getCurrentFrame() === valvatorezDamagedFrames - 1) {
            ValvatorezDamaged.pause();
            setTimeout(() => {
                ValvatorezDamaged.setFrame(0);
            }, 2000);
        }

        if (ArtinaDamaged.getCurrentFrame() === artinaDamagedFrames - 1) {
            ArtinaDamaged.pause();
            setTimeout(() => {
                ArtinaDamaged.setFrame(0);
            }, 2000);
        }

        if (FenrichDamaged.getCurrentFrame() === fenrichDamagedFrames - 1) {
            FenrichDamaged.pause();
            setTimeout(() => {
                FenrichDamaged.setFrame(0);
            }, 2000);
        }

        if (EmizelDamaged.getCurrentFrame() === emizelDamagedFrames - 1) {
            EmizelDamaged.pause();
            setTimeout(() => {
                EmizelDamaged.setFrame(0);
            }, 2000);
        }

        if (FukaDamaged.getCurrentFrame() === fukaDamagedFrames - 1) {
            FukaDamaged.pause();
            setTimeout(() => {
                FukaDamaged.setFrame(0);
            }, 2000);
        }


    }


    neutralPosition() {
        this.x = this.neutralX;
        this.y = this.neutralY;
        this.image = this.idleImage;
        this.sizeX = this.neutralSizeX;
        this.sizeY = this.neutralSizeY;
    }


    attackSelection() {
        // Returns the a value that will be used in the script to initiate an attack from the enemy and adjust the timing for the turn switch.

        if (enemyTeam.attacker === enemyTeam.enemies[0]) {
            return `simpleStrike`
        }

        if (enemyTeam.attacker === enemyTeam.enemies[1]) {
            return `angelicRay`
        }

        if (enemyTeam.attacker === enemyTeam.enemies[2]) {
            return `EmizelProofOfStrength`
        }

        if (enemyTeam.attacker === enemyTeam.enemies[3]) {
            return `FukaStrike`
        }

        if (enemyTeam.attacker === enemyTeam.enemies[4]) {
            return `howToKillANetherworldPresident`
        }

    }

    damaged() {
        // Plays the enemies damage animations
        this.image = this.damagedImage
        ValvatorezDamaged.play()
        ArtinaDamaged.play()
        EmizelDamaged.play()
        FenrichDamaged.play()
        FukaDamaged.play()
        setTimeout(() => {
            this.neutralPosition
        }, 2000);
    }

    defeated() {
        // Checks if the enemies are alive and if not, changes their alive state to reflect their defeat.
        if (this.lifeCount <= 0) {
            this.alive === false
        }
    }


    simpleStrike() {
        // Plays Valvatorez's (an enemy) attack animation
        this.image = this.attackImage;
        this.image.play();

        // Plays the sound effect with correct timing
        setTimeout(() =>
            strikeSFX.play(),
            300);

        // Moves Valvatorez (an enemy) towards Desco (the player) and reduces Desco's (the player) life points
        for (let i = 0; i < playerCharacterTeam.characters.length; i++) {
            let playerCharacter = playerCharacterTeam.characters[i];

            if (playerCharacter.alive, this.name === `enemy1`) {
                // Plays the player's damaged animation with correct timing
                setTimeout(() =>
                    playerCharacter.damaged(),
                    300);

                // Moves the enemy to the player
                this.x = playerCharacter.x + 100;
                this.y = playerCharacter.y - 30;

                // Reduces the player's life points
                playerCharacter.lifeCount = playerCharacter.lifeCount - 20;
            }
        }
    }

    angelicRay() {

        this.x = width / 2;
        this.y = 198;
        this.sizeX = 1600;
        this.sizeY = 900;
        this.image = this.attackImage;
        ArtinaAngelicRay.play();

        setTimeout(() =>
            beamSFX.play(),
            900);

        for (let i = 0; i < playerCharacterTeam.characters.length; i++) {
            let playerCharacter = playerCharacterTeam.characters[i];

            if (playerCharacter.alive) {
                setTimeout(() =>
                    playerCharacter.damaged(),
                    1200);

                playerCharacter.lifeCount = playerCharacter.lifeCount - 40;
            }
        }
    }

    EmizelProofOfStrength() {

        this.x = width / 2;
        this.y = 198;
        this.sizeX = 1600;
        this.sizeY = 900;
        this.image = this.attackImage;
        EmizelProofOfStrength.play();

        setTimeout(() =>
            beamSFX.play(),
            1200);

        for (let i = 0; i < playerCharacterTeam.characters.length; i++) {
            let playerCharacter = playerCharacterTeam.characters[i];

            if (playerCharacter.alive) {
                setTimeout(() =>
                    playerCharacter.damaged(),
                    1200);

                playerCharacter.lifeCount = playerCharacter.lifeCount - 50;
            }
        }

    }

    howToKillANetherworldPresident() {

        this.x = width / 2;
        this.y = 198;
        this.sizeX = 1600;
        this.sizeY = 900;
        this.image = this.attackImage;
        FenrichAssasination.play();

        setTimeout(() =>
            slashSFX.play(),
            3700);

        for (let i = 0; i < playerCharacterTeam.characters.length; i++) {
            let playerCharacter = playerCharacterTeam.characters[i];

            if (playerCharacter.alive) {
                setTimeout(() =>
                    playerCharacter.damaged(),
                    3700);

                playerCharacter.lifeCount = playerCharacter.lifeCount - 70;
            }
        }
    }

    FukaStrike() {
        this.image = this.attackImage
        FukaStrike.play()

        setTimeout(() =>
            strikeSFX.play(),
            300);

        // Moves Fuka (an enemy) towards Desco (the player) and reduces Desco's (the player) life points
        for (let i = 0; i < playerCharacterTeam.characters.length; i++) {
            let playerCharacter = playerCharacterTeam.characters[i];

            if (playerCharacter.alive, this.name === `enemy4`) {
                setTimeout(() =>
                    playerCharacter.damaged(),
                    300);

                this.x = playerCharacter.x + 150;
                this.y = playerCharacter.y;
                playerCharacter.lifeCount = playerCharacter.lifeCount - 30;
            }
        }
    }

}