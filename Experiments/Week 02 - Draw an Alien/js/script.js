/**
 * Draw an Alien
 * Malcolm Siné Tadonki
 * 
 * This code draws an alien
 * 
 */

"use strict";

/**
 * Description of preload
 * does nothing
*/
function preload() {

    
}


/**
 * Description of setup
 * Creates a pink canvas, draws and colors the alien
*/
function setup() {
    //Creates the colored canvas
    createCanvas(640,480);
    background(255,204,242);

    //Draws and colors the body
    ellipseMode(CENTER);
    noStroke();
    fill(217, 217, 217);
    ellipse(320,480,300);

    //Draws and colors the head
    ellipseMode(CENTER);
    noStroke();
    fill(217, 217, 217);
    ellipse(320,200,200,280);

    //Draws the eyes
    ellipseMode(CENTER);
    noStroke();
    fill(0, 0, 0);
    ellipse(265,200,30);
    ellipse(375,200,30);
    fill(255, 255, 255);
    ellipse(265,200,10);
    ellipse(375,200,10);

    //Draws the nostrils
    ellipseMode(CENTER);
    noStroke();
    fill(0, 0, 0);
    ellipse(305,250,10);
    ellipse(335,250,10);

    //Draws the mouth
    rectMode(CENTER)
    stroke(255,0,0)
    strokeWeight(3)
    rect(320,290,50,20)
}


/**
 * Description of draw()
 * does nothing
*/
function draw() {

}