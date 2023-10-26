class Bee {

    // The constructor sets up the friendly bee's starting properties
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 40;
        this.vx = 0;
        this.vy = 0;
        this.speed = 5;
        this.jitteriness = 0.1; // How likely the bee is to change direction
        this.alive = true;
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
    };

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

    WaspCatch(wasp) {
        //Calcuates the distance between the wasp and the bee.
        let d = dist(this.x, this.y, wasp.x, wasp.y);
        // If they overlap, the bee gets caught.
        if (d < this.size / 2 + wasp.size / 2) {
            this.alive = false;
        };
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