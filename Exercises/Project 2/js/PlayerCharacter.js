class PlayerCharacter {
    // The constructor sets up the player character's propreties
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 120;
        this.vx = 0;
        this.vy = 0;
        this.speed = 5;
        this.aX = 0;
        this.aY = 0;
        this.acceleration = 2;
        this.alive = true;
        this.lifeCount = 100
    }

    // display() draws the enemy onto the canvas
    display() {
        fill(225, 225, 50);
        noStroke();
        ellipse(this.x, this.y, this.size);
    }

    neutralPosition() {
        this.x = windowWidth / 4;
        this.y = windowHeight / 4 * 3;
    }


    attackSelection() {
        // Uses key presses to select which attack to use
        if (keyIsDown(LEFT_ARROW)) {
            this.simpleSwing()
        }

        else if (keyIsDown(RIGHT_ARROW)) {
            this.powerfulSwing()
        }

        else if (keyIsDown(38)) {
            this.ultimateSwing()
        }

        else if (keyIsDown(40)) {
            this.chargeSkill()
        }
    }

    simpleSwing() {
        for (let i = 0; i < enemyTeam.enemies.length; i++) {
            let enemyCharacter = enemyTeam.enemies[i];
            if (enemyCharacter.alive) {
                this.x = enemyCharacter.x - 20
                enemyCharacter.lifeCount = enemyCharacter.lifeCount - 5
            }
        }
        console.log(`hello`)
    }

    powerfulSwing() {

    }

    ultimateSwing() {

    }

    chargeSkill() {
        for (let i = 0; i < enemyTeam.enemies.length; i++) {
            let enemyCharacter = enemyTeam.enemies[i];
            if (enemyCharacter.alive) {
                this.x = enemyCharacter.x - 20
                enemyCharacter.lifeCount = enemyCharacter.lifeCount - chargeCount * 0.2
                chargeCount = 0
            }
        }
    }

    defeated() {
        if (this.lifeCount <= 0) {
            this.alive === false
        }
        console.log(this.alive)
    }
}