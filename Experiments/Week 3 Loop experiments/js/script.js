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

let caterpillar = {
x:200,
y:450,
segmentSize:100
}

let numSegments = 7
let segmentsDrawn = 0

/**
 * Description of setup
*/
function setup() {
createCanvas (900,900);
background (100,200,100);
}


/**
 * Description of draw()
*/
function draw() {
noStroke();
fill (50,100,50);

// Accidental loop program I made
// ellipse (caterpillar.x,caterpillar.y,caterpillar.segmentSize);
// caterpillar.x = caterpillar.x+40;
// caterpillar.x = constrain(caterpillar.x,200,400)


// // Regular "while" loop program
// while(segmentsDrawn < numSegments) {
//     ellipse (caterpillar.x,caterpillar.y,caterpillar.segmentSize)
//     caterpillar.x = caterpillar.x+80;
//     // these three lines accomplish the same goal
//     segmentsDrawn = segmentsDrawn + 1;
//     // segmentsDrawn +=1;
//     // segmentsDrawn ++;
// }

// for (let segmentsDrawn = 0; segmentsDrawn < numSegments; segmentsDrawn++) {
//     ellipse (caterpillar.x,caterpillar.y,caterpillar.segmentSize)
//     caterpillar.x = caterpillar.x+80;
// }

}