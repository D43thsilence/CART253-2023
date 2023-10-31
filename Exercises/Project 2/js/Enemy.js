class Enemy {

    // The constructor sets up the enemy's starting properties
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
        fill(225, 225, 50);
        noStroke();
        ellipse(this.x, this.y, this.size);
    }


    neutralPosition() {
        this.x = windowWidth / 4 * 3;
        this.y = windowHeight / 4 * 3;
    }


    attackSelection() {
        // Generates a random number and from that number the program decides what attack to use
        let r = random(0, 1);
        if (r >= 0, r <= this.weakAttack) {

        }

        else if (r > this.weakAttack, r <= this.strongAttack) {

        }

        else if (r > this.strongAttack, r <= this.powerfulAttack) {

        }

        else if (r > this.powerfulAttack, r <= this.ultimateAttack) {

        }
    }

    defeated() {
        if (this.lifeCount <= 0) {
            this.alive === false
        }
    }

}