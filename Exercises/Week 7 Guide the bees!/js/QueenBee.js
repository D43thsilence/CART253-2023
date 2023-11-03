class QueenBee {

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 40;
        this.vx = 0;
        this.vy = 0;
        this.speed = 5;
        this.alive = true;
    }

    QueenBeeMovement() {
        // Moves the Queen Bee
        if (keyIsDown(LEFT_ARROW)) {
            this.x = this.x - 5;
        }

        else if (keyIsDown(RIGHT_ARROW)) {
            this.x = this.x + 5;
        }

        else if (keyIsDown(38)) {
            this.y = this.y - 5;
        }

        else if (keyIsDown(40)) {
            this.y = this.y + 5;
        }

        // Constrain the Queen bee to the canvas
        this.x = constrain(this.x, 0, width);
        this.y = constrain(this.y, 0, height);
    }

    // display() draws the Queen Bee on the canvas
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
        fill(225, 150, 50);
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

    BeeCaught() {
        if (this.alive === true) {
            this.alive = false
        }
    };

}