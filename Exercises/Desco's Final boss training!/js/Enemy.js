class Enemy {

    // The constructor sets up the enemy's starting properties
    constructor(x, y, enemyImagesX, enemyImagesY, enemyIdleImage, enemyAttackImage, enemyDamagedImage) {
        this.x = x;
        this.y = y;
        this.neutralX = x;
        this.neutralY = y;
        this.sizeX = enemyImagesX;
        this.sizeY = enemyImagesY;
        this.vx = 0;
        this.vy = 0;
        this.speed = 5;
        this.aX = 0;
        this.aY = 0;
        this.acceleration = 2;
        this.decision = 0.1; // Determines which attack the enemy decides to use
        this.weakAttack = 0.3;
        this.strongAttack = 0.6;
        this.powerfulAttack = 0.9;
        this.ultimateAttack = 1;
        this.lifeCount = 100
        this.alive = true;
        this.idleImage = enemyIdleImage
        this.attackImage = enemyAttackImage
        this.damagedImage = enemyDamagedImage
        this.image = this.idleImage

    }

    // display() draws the enemy onto the canvas
    display() {
        imageMode(CENTER)
        image(this.image, this.x, this.y, this.sizeX, this.sizeY);

        if (ValvatorezStrike.getCurrentFrame() === valvatorezStrikeFrames - 1) {
            ValvatorezStrike.pause();
            setTimeout(() => {
                ValvatorezStrike.setFrame(0)
            }, 2000);
        }

        // if (FenrichBow.getCurrentFrame() === fenrichBowFrames - 1) {
        //     FenrichBow.pause();
        //     setTimeout(() => {
        //         FenrichBow.setFrame(0)
        //     }, 2000);
        // }

        if (ArtinaAngelicRay.getCurrentFrame() === artinaAngelicRayFrames - 1) {
            ArtinaAngelicRay.pause();
            setTimeout(() => {
                ArtinaAngelicRay.setFrame(0)
            }, 2000);
        }
    }


    neutralPosition() {
        this.x = this.neutralX;
        this.y = this.neutralY;
        this.image = this.idleImage
    }


    attackSelection() {
        // Generates a random number and from that number the function decides what attack to use
        let r = random(0.3, 0.6);
        if (r >= 0, r <= this.weakAttack) {
            this.simpleStrike()
            return `simpleStrike`
        }

        else if (r > this.weakAttack, r <= this.strongAttack) {
            this.angelicRay()
            return `angelicRay`
        }

        else if (r > this.strongAttack, r <= this.powerfulAttack) {
            this.howToKillANetherworldPresident()
            return `howToKillANetherworldPresident`
        }

        else if (r > this.powerfulAttack, r <= this.ultimateAttack) {
            this.teamComboAttack()
            return `teamComboAttack`
        }

        else {
            return false
        }
    }

    damaged() {
        // this.image = this.damagedImage
        // setTimeout(() => {
        //     this.neutralPosition
        // }, 2000);
    }

    defeated() {
        if (this.lifeCount <= 0) {
            this.alive === false
        }
        // console.log(this.alive)
    }


    simpleStrike() {
        // Plays Valvatorez's strike animation
        this.image = this.attackImage
        ValvatorezStrike.play()

        // Moves Valvatorez towards Desco and reduces Desco's life points
        for (let i = 0; i < playerCharacterTeam.characters.length; i++) {
            let playerCharacter = playerCharacterTeam.characters[i];

            if (playerCharacter.alive) {
                playerCharacter.damaged()
                this.x = playerCharacter.x + 100
                this.y = playerCharacter.y - 30
                playerCharacter.lifeCount = playerCharacter.lifeCount - 5
            }
        }
    }

    angelicRay() {

        for (let i = 1; i < enemyTeam.enemies.length; i++) {
            let enemyCharacter = enemyTeam.enemies[i];
            if (enemyCharacter.alive) {
                this.image = this.attackImage
                ArtinaAngelicRay.play()
            }
        }

        for (let i = 0; i < playerCharacterTeam.characters.length; i++) {
            let playerCharacter = playerCharacterTeam.characters[i];

            if (playerCharacter.alive) {
                playerCharacter.damaged()
                playerCharacter.lifeCount = playerCharacter.lifeCount - 20
            }
        }
    }

    howToKillANetherworldPresident() {
        // for (let e = 4; e < enemyTeam.enemies.length; e++) {
        //     let enemyCharacter = enemyTeam.enemies[e];
        //     if (enemyCharacter.alive) {
        //         this.image = this.attackImage
        //         FenrichBow.play()
        //     }
        // }

        this.image = this.attackImage

        for (let i = 0; i < playerCharacterTeam.characters.length; i++) {
            let playerCharacter = playerCharacterTeam.characters[i];

            if (playerCharacter.alive) {
                playerCharacter.damaged()
                playerCharacter.lifeCount = playerCharacter.lifeCount - 30
            }
        }
        console.log(`hello`)
    }

}