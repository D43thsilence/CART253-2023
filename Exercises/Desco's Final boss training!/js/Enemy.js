class Enemy {

    // The constructor sets up the enemy's starting properties
    constructor(x, y, enemyImagesX, enemyImagesY, enemyIdleImage, enemyAttackImage) {
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
        this.image = this.idleImage

    }

    // display() draws the enemy onto the canvas
    display() {
        imageMode(CENTER)
        image(this.image, this.x, this.y, this.sizeX, this.sizeY);
    }


    neutralPosition() {
        this.x = this.neutralX;
        this.y = this.neutralY;
        this.image = this.idleImage
    }


    attackSelection() {
        // Generates a random number and from that number the function decides what attack to use
        let r = random(0, 0.3);
        if (r >= 0, r <= this.weakAttack) {
            this.simpleStrike()
            return `simpleStrike`
        }

        else if (r > this.weakAttack, r <= this.strongAttack) {

        }

        else if (r > this.strongAttack, r <= this.powerfulAttack) {

        }

        else if (r > this.powerfulAttack, r <= this.ultimateAttack) {

        }

        else {
            return false
        }
    }

    defeated() {
        if (this.lifeCount <= 0) {
            this.alive === false
        }
        // console.log(this.alive)
    }


    simpleStrike() {
        this.image = this.attackImage
        for (let i = 0; i < playerCharacterTeam.characters.length; i++) {
            let playerCharacter = playerCharacterTeam.characters[i];

            if (playerCharacter.alive) {
                this.x = playerCharacter.x + 20
                playerCharacter.lifeCount = playerCharacter.lifeCount - 5
            }
        }
    }


}