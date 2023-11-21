class PlayerCharacter {
    // The constructor sets up the player character's propreties
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 400;
        this.vx = 0;
        this.vy = 0;
        this.speed = 5;
        this.aX = 0;
        this.aY = 0;
        this.acceleration = 2;
        this.alive = true;
        this.lifeCount = 100
    }

    // display() draws the player onto the canvas
    display() {
        if (playerAttackCheck === false) {
            image(DescoIdle, this.x, this.y, this.size, this.size);
        }

        if (playerAttackCheck === true) {
            image(DescoSwing, this.x, this.y, this.size, this.size);
        }

    }

    neutralPosition() {
        this.x = windowWidth / 4;
        this.y = windowHeight / 4 * 3;
    }


    attackSelection() {
        // Uses key presses to select which attack to use
        if (keyIsDown(LEFT_ARROW)) {
            this.simpleSwing()
            return true
        }

        else if (keyIsDown(RIGHT_ARROW)) {
            this.bladeSwipe()
            return true
        }

        else if (keyIsDown(38)) {
            this.finalBossArises()
            return true
        }

        else if (keyIsDown(50)) {
            this.trueGodlyWeapon()
            return true
        }

        else if (keyIsDown(40)) {
            this.trueDarkRelease()
            return true
        }
        else {
            return false
        }

    }

    simpleSwing() {
        for (let i = 0; i < enemyTeam.enemies.length; i++) {
            let enemyCharacter = enemyTeam.enemies[i];
            if (enemyCharacter.alive, i === 0) {
                this.x = enemyCharacter.neutralX - 20
                image(DescoSwing, this.x, this.y, this.size, this.size)
                enemyCharacter.lifeCount = enemyCharacter.lifeCount - 5
                chargeIncrease()
            }
        }
    }

    bladeSwipe() {
        for (let i = 0; i < enemyTeam.enemies.length; i++) {
            let enemyCharacter = enemyTeam.enemies[i];
            if (enemyCharacter.alive, i === 0) {
                image(DescoBlade, this.x, windowHeight / 2, this.size, this.size)
                image(DescoBladePrepare, this.x, this.y, this.size, this.size)
                // Used to manipulate the shape of the blade and animate it
                applyMatrix()
                enemyCharacter.lifeCount = enemyCharacter.lifeCount - 10
            }
        }
    }

    finalBossArises() {

    }

    trueGodlyWeapon() {

    }

    trueDarkRelease() {
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
        // console.log(this.alive)
    }
}