let ripplers = []; //hold rippler objects

function setup() {
    createCanvas(800, 600);
    noFill(); //for ripples
}

function draw() {
    background("blue"); //water-y background

    //the array of ripplers and call their draw method
    for (let i = 0; i < ripplers.length; i++) {
        ripplers[i].draw();
    }
}

// Capture mouse clicks
function mousePressed() {
    //new Rippler object at the mouse coordinates and add it to the array
    ripplers.push(new Rippler(mouseX, mouseY));
}

class Rippler {
    constructor(x, y) {
        this.x = x; // this is the x-coordinate of the ripple
        this.y = y; //the y-coordinate of the ripple
        this.diameter = 0; // base diameter of 0
        this.maxDiameter = random(150, 800); //maximum diameter for each ripple
        this.speed = random(1, 3); //speed for ripple growth
    }

    draw() {
        this.diameter += this.speed; //ripple movement
        
        //the alpha value based on the diameter to make it transparent
        let alpha = map(this.diameter, 0, this.maxDiameter, 255, 0); //fading 

        //the ripple
        stroke(0, 255, 255, alpha); //color with alpha for fading
        strokeWeight(2); //this is the stroke thickness
        ellipse(this.x, this.y, this.diameter, this.diameter); //draw circle
        
        //removing ripples that are fully faded
        if (this.diameter > this.maxDiameter) {
            this.diameter = this.maxDiameter; //max diameter
        }
    }
}