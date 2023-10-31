class Wasp {
    // The constructor sets up the wasp's propreties
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 40;
        this.vx = 0;
        this.vy = 0;
        this.aX = 0;
        this.aY = 0;
        this.speed = 1;
        this.acceleration = 0.2;
    }

    // move() moves the bee by potentially changing direction
    // and then changing position based on velocity
    move() {
        // First check if we should change direction
        // let r = random(0, 1);
        // if (r < this.jitteriness) {
        //     this.vx = random(-this.speed, this.speed);
        //     this.vy = random(-this.speed, this.speed);
        // }

        // Update the wasp's position with the velocity values
        this.x = this.x + this.vx;
        this.y = this.y + this.vy;
        this.vx = this.vx + this.aX
        this.vy = this.vy + this.aY
        this.aX = this.aX + this.acceleration
        this.aY = this.aY + this.acceleration

        // Constrains the wasp to the canvas and constrains the speed and acceleration
        this.x = constrain(this.x, 0, width);
        this.y = constrain(this.y, 0, height);
        this.vx = constrain(this.vx, -this.speed, this.speed);
        this.vy = constrain(this.vy, -this.speed, this.speed);
        this.aX = constrain(this.aX, -this.acceleration, this.acceleration);
        this.aY = constrain(this.aY, -this.acceleration, this.acceleration);
    }

    // display() draws the wasp
    display() {
        push();
        // Wings on either side
        fill(255, 255, 255);
        noStroke();
        ellipse(this.x - this.size / 2, this.y, this.size / 2);
        ellipse(this.x + this.size / 2, this.y, this.size / 2);
        pop();

        // Body
        push();
        fill(0, 0, 0);
        noStroke();
        ellipse(this.x, this.y, this.size);
        pop();

        // Eyes
        push();
        fill(255, 0, 0);
        noStroke();
        ellipse(this.x - this.size / 10, this.y, this.size / 10);
        ellipse(this.x + this.size / 10, this.y, this.size / 10);
        pop();
    }

    WaspChase(bee) {
        // Adjusts the wasp's acceleration to move towards the bees.
        if (this.x > bee.x) {
            this.aX = -this.acceleration;
        }

        else {
            this.aX = this.acceleration;
        }

        if (this.y > bee.y) {
            this.aY = -this.acceleration;
        }

        else {
            this.aY = this.acceleration;
        }
    }

    WaspCatch(bee) {
        //Calcuates the distance between the wasp and the bee.
        let d = dist(this.x, this.y, bee.x, bee.y);
        // If the wasp and the bee overlap, the bee gets caught.
        if (d < this.size / 2 + bee.size / 2) {
            bee.BeeCaught()
        };
    }

    WaspCatch(queenBee) {
        //Calcuates the distance between the wasp and the bee.
        let r = dist(this.x, this.y, queenBee.x, queenBee.y);
        // If the wasp and the bee overlap, the bee gets caught.
        if (r < this.size / 2 + queenBee.size / 2) {
            queenBee.BeeCaught()
        };
    }

}

