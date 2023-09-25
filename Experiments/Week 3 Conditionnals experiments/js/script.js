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

fill (255,255,255);

// && means and
// if (circle.x > width/3 && circle.x < 2 * width/3){
    // fill (255,0,0);
// }

// || means or
// if (circle.x < width/3 || circle.x > 2 * width/3){
    // fill (255,0,0);
// }

// !() means not
// if (!(circle.x < width/3) && !(circle.x > 2 * width/3)){
    // fill (255,0,0);
// }


// Stacking conditions within conditions
// if (circle.x > width/3) {
    // if (circle.x < 2 * width/3) {
        // fill (255,0,0);
    // }
    
    // else {
        // fill (255,255,255);
    // }
// }
// else {
    // fill (255,255,255);
// }


// Ordinary conditionnal
// if (mouseX < width/3){
    // fill (255,0,0);
// }
// else {
    // fill(0,255,0);
// }


// Ordinary conditionnal
// else if (mouseX < 2 * width/3) {
    // fill (0,255,0);
// }
// else{
    // fill (0,0,255);
// }


// Ordinary conditionnal
// if (mouseY > height/2){
    // fill (0,255,0);
// }

ellipse(circle.x,circle.y,circle.size);
}