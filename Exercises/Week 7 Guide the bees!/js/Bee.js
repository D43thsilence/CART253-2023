class Bee {

    // The constructor sets up the friendly bee's starting properties
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 40;
        this.vx = 0;
        this.vy = 0;
        this.speed = 5;
        this.aX = 0;
        this.aY = 0;
        this.acceleration = 0.3;
        this.jitteriness = 0.1; // How likely the bee is to change direction
        this.alive = true;
    }

    // move() moves the bee by potentially changing direction
    // and then changing position based on velocity
    move() {
        // Update the bee's position with the velocity values
        this.x = this.x + this.vx;
        this.y = this.y + this.vy;
        this.vx = this.vx + this.aX;
        this.vy = this.vy + this.aY;
        this.aX = this.aX + this.acceleration;
        this.aY = this.aY + this.acceleration;

        // Constrain the bees to the canvas and constrain the speed and acceleration
        this.x = constrain(this.x, 0, width);
        this.y = constrain(this.y, 0, height);
        this.vx = constrain(this.vx, -this.speed, this.speed);
        this.vy = constrain(this.vy, -this.speed, this.speed);
        this.aX = constrain(this.aX, -this.acceleration, this.acceleration);
        this.aY = constrain(this.aY, -this.acceleration, this.acceleration);
    };

    followTheQueen(queenBee) {
        if (queenBee.x < this.x) {
            this.aX = -this.acceleration;
        }

        else {
            this.aX = this.acceleration;
        }

        if (queenBee.y < this.y) {
            this.aY = -this.acceleration;
        }

        else {
            this.aY = this.acceleration;
        }
    }

    // display() draws our bee onto the canvas
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
        fill(225, 225, 50);
        noStroke();
        ellipse(this.x, this.y, this.size);
        pop();

        // Eyes
        push();
        fill(0, 0, 0);
        noStroke();
        ellipse(this.x - this.size / 10, this.y, this.size / 10);
        ellipse(this.x + this.size / 10, this.y, this.size / 10);
        pop();
    };

    // Makes the bee dissapear if caught by the wasp
    BeeCaught() {
        if (this.alive === true) {
            this.alive = false
        }
    };

    CollectNectar(flower) {
        // Calculates the distance between the bee and the flower
        let d = dist(this.x, this.y, flower.x, flower.y);
        // If they overlap, the nectar is taken from the flower
        if (d < this.size / 2 + flower.size / 2 + flower.petalThickness) {
            flower.nectarTaken()
        };
    };

}