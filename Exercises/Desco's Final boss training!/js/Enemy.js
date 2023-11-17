class Enemy {

    // The constructor sets up the enemy's starting properties
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.neutralX = x;
        this.neutralY = y;
        this.sizeX = 150;
        this.sizeY = 180
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
    }

    // display() draws the enemy onto the canvas
    display() {
        for (let i = 0; i < enemyTeam.enemies.length; i++) {
            if (i === 0) {
                imageMode(CENTER)
                image(ValvatorezIdle, this.x, this.y, this.sizeX, this.sizeY);
            }

            if (i === 1) {
                image(FenrichIdle, this.x, this.y, this.sizeX, this.sizeY);
            }

            if (i === 2) {
                image(ArtinaIdle, this.x, this.y, this.sizeX, this.sizeY);
            }

            if (i === 3) {
                image(EmizelIdle, this.x, this.y, this.sizeX, this.sizeY);
            }
        }
    }


    neutralPosition() {
        this.x = this.neutralX;
        this.y = this.neutralY;
    }


    attackSelection() {
        // Generates a random number and from that number the function decides what attack to use
        let r = random(0, 0.3);
        if (r >= 0, r <= this.weakAttack) {
            this.simpleSwing()
            return true
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


    simpleSwing() {
        for (let i = 0; i < playerCharacterTeam.characters.length; i++) {
            let playerCharacter = playerCharacterTeam.characters[i];

            if (playerCharacter.alive) {
                this.x = playerCharacter.x + 20
                playerCharacter.lifeCount = playerCharacter.lifeCount - 5
            }
        }
    }


}