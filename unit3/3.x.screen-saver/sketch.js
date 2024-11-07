let leftEyeX = 250; 
let leftEyeY = 300; 
let rightEyeX = 350; 
let rightEyeY = 300; 

let eyeRadius = 40; //the eyeball
let pupilRadius = 10; //the pupil

function setup() {
    createCanvas(600, 600);
}

function draw() {
    background(255);
    
    drawEye(leftEyeX, leftEyeY);

    drawEye(rightEyeX, rightEyeY);
}

function drawEye(x, y) {
    // Draw the eyeball
    fill(255); //white part of the eye
    stroke(0);
    strokeWeight(2);
    ellipse(x, y, eyeRadius * 2, eyeRadius * 2); 

    
    let pupilX, pupilY;

    //Get the distance from the eye center to the mouse position
    let d = dist(x, y, mouseX, mouseY);

    //calculate pupil position based on mouse position
    if (d < eyeRadius - pupilRadius) {
        //mouse is inside the eye radius, place pupil at mouse position
        pupilX = mouseX;
        pupilY = mouseY;
    } else {
        //mouse is outside the eye radius, limit the pupil movement
        let angle = atan2(mouseY - y, mouseX - x);
        pupilX = x + cos(angle) * (eyeRadius - pupilRadius);
        pupilY = y + sin(angle) * (eyeRadius - pupilRadius);
    }

    //draw the pupil
    fill(0); //black part of the eye
    ellipse(pupilX, pupilY, pupilRadius * 2, pupilRadius * 2);
}
