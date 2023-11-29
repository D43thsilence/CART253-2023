class Enemy {

    // The constructor sets up the enemy's starting properties
    constructor(x, y, enemyImagesSizeX, enemyImagesSizeY, enemyIdleImage, enemyAttackImage, enemyDamagedImage, enemyName) {
        this.x = x;
        this.y = y;
        this.neutralX = x;
        this.neutralY = y;
        this.sizeX = enemyImagesSizeX;
        this.sizeY = enemyImagesSizeY;
        this.neutralSizeX = 550
        this.neutralSizeY = 550
        this.vx = 0;
        this.vy = 0;
        this.speed = 5;
        this.aX = 0;
        this.aY = 0;
        this.acceleration = 2;
        // Determines which attack the enemy decides to use
        this.weakAttack = 0.3;
        this.strongAttack = 0.6;
        this.powerfulAttack = 0.9;
        this.ultimateAttack = 1;
        this.lifeCount = 600
        this.alive = true;
        this.idleImage = enemyIdleImage
        this.attackImage = enemyAttackImage
        this.damagedImage = enemyDamagedImage
        this.ArtinaAttack = ArtinaAngelicRay
        this.FenrichAttack = FenrichAssasination
        this.image = this.idleImage
        this.name = enemyName

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

        if (ArtinaAngelicRay.getCurrentFrame() === artinaAngelicRayFrames - 1) {
            ArtinaAngelicRay.pause();
            setTimeout(() => {
                ArtinaAngelicRay.setFrame(0)
            }, 2000);
        }

        if (FenrichAssasination.getCurrentFrame() === fenrichAssasinationFrames - 1) {
            FenrichAssasination.pause();
            setTimeout(() => {
                FenrichAssasination.setFrame(0)
            }, 2000);
        }
    }


    neutralPosition() {
        this.x = this.neutralX;
        this.y = this.neutralY;
        this.image = this.idleImage
        this.sizeX = this.neutralSizeX
        this.sizeY = this.neutralSizeY
    }


    attackSelection() {
        // Returns the a value that will be used in the script to initiate an attack from the enemy and adjust the timing for the turn switch.
        // return `simpleStrike`

        if (enemyTeam.attacker === enemyTeam.enemies[0]) {
            return `simpleStrike`
        }

        if (enemyTeam.attacker === enemyTeam.enemies[1]) {
            return `angelicRay`
        }

        if (enemyTeam.attacker === enemyTeam.enemies[2]) {
            return `howToKillANetherworldPresident`
        }

        if (enemyTeam.attacker === enemyTeam.enemies[3]) {
            return `howToKillANetherworldPresident`
        }

        if (enemyTeam.attacker === enemyTeam.enemies[4]) {
            return `howToKillANetherworldPresident`
        }


        // Generates a random number and from that number the function decides what attack to use
        // let r = random(0, 0.9);
        // if (r >= 0, r <= this.weakAttack) {
        //     this.simpleStrike()
        //     return `simpleStrike`
        // }

        // else if (r > this.weakAttack, r <= this.strongAttack) {
        //     this.angelicRay()
        //     return `angelicRay`
        // }

        // else if (r > this.strongAttack, r <= this.powerfulAttack) {
        //     this.howToKillANetherworldPresident()
        //     return `howToKillANetherworldPresident`
        // }

        // else if (r > this.powerfulAttack, r <= this.ultimateAttack) {
        //     this.teamComboAttack()
        //     return `teamComboAttack`
        // }

        // else {
        //     return `none`
        // }
    }

    damaged() {
        this.image = this.damagedImage
        setTimeout(() => {
            this.neutralPosition
        }, 2000);
    }

    defeated() {
        if (this.lifeCount <= 0) {
            this.alive === false
        }
    }


    simpleStrike() {
        // Plays Valvatorez's strike animation
        this.image = this.attackImage
        // ValvatorezStrike.play();
        this.image.play()

        // Moves Valvatorez (the enemy) towards Desco (the player) and reduces Desco's (the player) life points
        for (let i = 0; i < playerCharacterTeam.characters.length; i++) {
            let playerCharacter = playerCharacterTeam.characters[i];

            if (playerCharacter.alive, this.name === `enemy1`) {
                playerCharacter.damaged()
                this.x = playerCharacter.x + 100
                this.y = playerCharacter.y - 30
                playerCharacter.lifeCount = playerCharacter.lifeCount - 20
            }
        }

        // Arranges the x,y and size values for the animations of certain enemies
        if (this.name === `enemy2`) {
            this.x = windowWidth / 2
            this.y = windowHeight / 3
            this.sizeX = 1920
            this.sizeY = 1080
        }

        if (this.name === `enemy3`) {
            this.x = windowWidth / 2
            this.y = windowHeight / 3
            this.sizeX = 1920
            this.sizeY = 1080
        }

        if (this.name === `enemy4`) {
            this.x = windowWidth / 2
            this.y = windowHeight / 3
            this.sizeX = 1920
            this.sizeY = 1080
        }

        if (this.name === `enemy5`) {
            this.x = windowWidth / 2
            this.y = windowHeight / 3
            this.sizeX = 1920
            this.sizeY = 1080
        }
    }

    angelicRay() {

        // this.image = this.attackImage.ArtinaAngelicRay
        // ArtinaAngelicRay.play()

        // this.image = this.attackImage
        // ArtinaAngelicRay.play();

        this.x = windowWidth / 2
        this.y = windowHeight / 3
        this.sizeX = 1920
        this.sizeY = 1080
        this.image = this.ArtinaAttack
        ArtinaAngelicRay.play()



        for (let i = 0; i < playerCharacterTeam.characters.length; i++) {
            let playerCharacter = playerCharacterTeam.characters[i];

            if (playerCharacter.alive) {
                playerCharacter.damaged()
                playerCharacter.lifeCount = playerCharacter.lifeCount - 50
            }
        }
    }

    howToKillANetherworldPresident() {

        // this.image = this.attackImage.FenrichAssasination
        // FenrichAssasination.play()

        this.x = windowWidth / 2
        this.y = windowHeight / 2
        this.sizeX = 1920
        this.sizeY = 1080
        this.image = this.FenrichAttack
        FenrichAssasination.play()


        for (let i = 0; i < playerCharacterTeam.characters.length; i++) {
            let playerCharacter = playerCharacterTeam.characters[i];

            if (playerCharacter.alive) {
                playerCharacter.damaged()
                playerCharacter.lifeCount = playerCharacter.lifeCount - 70
            }
        }
    }

}