let speedfactor = 3; //Speed for the follower
let yspeed = speedfactor; //y speed
let x = 0; //x position
let y = 0; //y position
let followerImage; // Variable to hold the follower image
let score = 0; //variable to hold mice caught

function preload() {
    //Load the follower image
    followerImage = loadImage("https://seanslev.github.io/creative-coding/unit3/3.2.follower/SamSad.png");
    //backgroundImage = loadImage("https://seanslev.github.io/creative-coding/unit3/3.2.follower/FollowerBackground.png");
}

function setup() {
    createCanvas(800, 800); // Set the canvas size to 800x800
    
    x = width / 2; //center the image
    y = height / 2; 
}

function draw() {
    background("purple"); //background
    textSize(50);
    fill("pink");
    let texts = "Mice Caught: "; 
    text(texts, 50, 50); //write out text
    text(score, 350, 50);//write out score
    //calculating mouse pointer and the follower distince
    let d = dist(mouseX, mouseY, x, y);

    //update the follower position to move towards the mouse
    if (d > 5) { //how close the follower is to mouse when it "eats" it
        let angle = atan2(mouseY - y, mouseX - x); //calculate angle to mouse
        x += cos(angle) * xspeed; //Update x position
        y += sin(angle) * yspeed; //Update y position
            }

    //follower image at the (x, y) position, centered
    imageMode(CENTER); //image mode to center
    image(followerImage, x, y, 75, 75);
     
    //check if the follower catches the mouse
    if (d < 25) { // Check if the distance is less than a certain threshold
        resetFollower(); //reset the follower's position after a catch
        score++;
    }
}

function resetFollower() {
    //reset the position of the follower to a random location on the canvas
    x = random(width);
    y = random(height);
}