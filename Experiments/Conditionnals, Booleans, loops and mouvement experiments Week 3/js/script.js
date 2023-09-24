/**
 * Title of Project
 * Author Name
 * 
 * This is a template. You must fill in the title, author, 
 * and this description to match your project!
 */

"use strict";

/**
 * Description of preload
*/
function preload() {

}



/**
 * Description of setup
*/
function setup() {
createCanvas (900,900);
}

let circle = {
    x: 0,
    y: 450,
    size: 100,
    speed:3
}

let BgColor = {
    R: 0,
    G: 0,
    B: 0
} 

/**
 * Description of draw()
*/
function draw() {
background (BgColor.R,BgColor.G,BgColor.B);

circle.x = circle.x + circle.speed;
if (circle.x > width) {
    circle.speed = -circle.speed;
}

if (circle.x < 0) {
    circle.speed = -circle.speed;
}

if (mouseX < width/3){
    fill (255,0,0);
}
// else {
    // fill(0,255,0);
// }

else if (mouseX < 2 * width/3) {
    fill (0,255,0);
}
else{
    fill (0,0,255);
}


// if (mouseY > height/2){
    // fill (0,255,0);
// }

ellipse(circle.x,circle.y,circle.size);
}