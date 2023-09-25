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

let displayCircle = false

/**
 * Description of draw()
*/
function draw() {
background (BgColor.R,BgColor.G,BgColor.B);

constrain (BgColor.R, 0, 255)
constrain (BgColor.G, 0, 255)
constrain (BgColor.B, 0, 255)

fill (255,255,255)
noStroke()

//  === means true, <= means inferior or equal and >= means superior or equal
if (mouseIsPressed === true) {
    BgColor.R = BgColor.R + 10;
    BgColor.G = BgColor.G + 10;
    BgColor.B = BgColor.B + 10;
}
else {
    BgColor.R = BgColor.R - 1;
    BgColor.G = BgColor.G - 1;
    BgColor.B = BgColor.B - 1;
}

if (mouseIsPressed === true) {
    displayCircle = true;
}
else{
    displayCircle = false;
}

if (displayCircle === true) {
    ellipse (450,450,200);
}
}