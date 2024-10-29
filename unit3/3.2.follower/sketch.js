let speedfactor = 3; // Speed factor for the follower's movement
let xspeed = speedfactor; // Horizontal speed
let yspeed = speedfactor; // Vertical speed
let x = 0; // Follower's x position
let y = 0; // Follower's y position
let followerImage; // Variable to hold the follower image
let score = 0; //variable to hold mice caught

function preload() {
    // Load the follower image
    followerImage = loadImage("https://seanslev.github.io/creative-coding/unit3/3.2.follower/SamSad.png"); // Update the path to your image file
}

function setup() {
    createCanvas(800, 800); // Set the canvas size to 800x800
    
    x = width / 2; // Start the follower in the center of the canvas
    y = height / 2; // Start the follower in the center of the canvas
}

function draw() {
    background(220); // Clear the background
    textSize(50);
    fill("red");
    let texts = "Mice Caught: ";
    text(texts, 50, 50);
    text(score, 350, 50);
    // Calculate the distance between the mouse pointer and the follower
    let d = dist(mouseX, mouseY, x, y);

    // Update the follower's position to move towards the mouse
    if (d > 5) { // Adjust this value to control how close the follower needs to get
        let angle = atan2(mouseY - y, mouseX - x); // Calculate angle to mouse
        x += cos(angle) * xspeed; // Update x position
        y += sin(angle) * yspeed; // Update y position
            }

    // Draw the follower image at the (x, y) position, centered
    imageMode(CENTER); // Set image mode to center
    image(followerImage, x, y, 75, 75); // Draw the image
     
    // Check if the follower catches the mouse
    if (d < 25) { // Check if the distance is less than a certain threshold
        resetFollower(); // Reset the follower's position after a catch
        score++;
    }
}

function resetFollower() {
    // Reset the position of the follower to a random location on the canvas
    x = random(width);
    y = random(height);
}