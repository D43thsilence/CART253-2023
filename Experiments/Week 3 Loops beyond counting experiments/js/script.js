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

let circle = {
x:undefined,
y:undefined,
size:200
};

let dangerZone = {
    x:450,
    y:450,
    size:400
}


/**
 * Description of setup
*/
function setup() {
createCanvas (900,900);
background (100,200,100);

circle.x = random(0,width);
circle.y = random(0,height);

}


/**
 * Description of draw()
*/
function draw() {
noStroke();
fill (50,100,50);

ellipse (circle.x,circle.y,circle.size)

// Draws the danger zone
noFill()
stroke (255,0,0)
ellipse (dangerZone.x, dangerZone.y,dangerZone.size)

// Makes sure the circle doesn't enter the danger zone
let d = dist(circle.x, circle.y, dangerZone.x, dangerZone.y);

while (d < circle.size/2 + dangerZone.size/2){
    circle.x = random(0,width);
    circle.y = random(0,height);
    d = dist (circle.x, circle.y, dangerZone.x, dangerZone.y);
}

}