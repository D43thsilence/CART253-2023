class Wasp {
    // The constructor sets up the wasp's propreties
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 40;
        this.vx = 0;
        this.vy = 0;
        this.speed = 2;
        this.acceleration = 2;
    }

    // move() moves the bee by potentially changing direction
    // and then changing position based on velocity
    move() {
        // First check if we should change direction
        let r = random(0, 1);
        if (r < this.jitteriness) {
            this.vx = random(-this.speed, this.speed);
            this.vy = random(-this.speed, this.speed);
        }

        // Update position with velocity to actually move
        this.x = this.x + this.vx;
        this.y = this.y + this.vy;

        // Constrain to the canvas (guess it's a walled garden!)
        this.x = constrain(this.x, 0, width);
        this.y = constrain(this.y, 0, height);
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
        if (this.x < bee.x) {
            this.aX = -this.acceleration;
        }

        else {
            this.aX = this.acceleration;
        }

        if (playerBoat.y < bee.y) {
            this.aY = -this.acceleration;
        }

        else {
            this.aY = this.acceleration;
        }
    }
}