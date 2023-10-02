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
 * Creates the canvas
*/
function setup() {
createCanvas (windowWidth,windowHeight)
background (255,255,255)
}


/**
 * Description of draw()
*/
function draw() {

}

/**
 * Description of parallels()
 * Draws parallel lines
*/
function parallels(x, y, numLines, lineThickness, lineHeight, lineSpacing) {
    for (let i = 0; i < numLines; i++) {
      noStroke();
      let lineFill = map(i, 0, numLines, 0, 255);
      fill(lineFill);
      rectMode(CENTER);
      rect(x, y, lineThickness, lineHeight);
      x = x + lineSpacing;
    }
  }