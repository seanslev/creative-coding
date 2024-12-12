let ball;
let targetX, targetY;

function setup() {
  createCanvas(800, 600);  // Set up canvas size
  ball = new Ball(width / 2, height / 2);  // Ball at center of canvas
  targetX = mouseX;
  targetY = mouseY;
}

function draw() {
  background(0);  // Clear the screen with a black background

  // Update the target position based on mouse location
  targetX = mouseX;
  targetY = mouseY;

  ball.update();
  ball.display();

  // Check for collision with walls
  ball.checkWalls();
}

// Ball class to define the behavior of the ball
class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 20;
    this.speed = 0;
    this.angle = 0;
    this.isLaunched = false;
  }

  // Update the ball's position
  update() {
    if (this.isLaunched) {
      this.x += this.speed * cos(this.angle);
      this.y += this.speed * sin(this.angle);
    }
  }

  // Display the ball on screen
  display() {
    fill(255);
    noStroke();
    ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
  }

  // Launch the ball towards the mouse when clicked
  launch() {
    if (!this.isLaunched) {
      this.angle = atan2(targetY - this.y, targetX - this.x);  // Angle towards mouse
      this.speed = 5;  // Set speed of the ball
      this.isLaunched = true;
    }
  }

  // Check if the ball hits the walls
  checkWalls() {
    if (this.x - this.radius <= 0 || this.x + this.radius >= width) {
      this.angle = PI - this.angle;  // Reflect the angle horizontally
    }
    if (this.y - this.radius <= 0 || this.y + this.radius >= height) {
      this.angle = -this.angle;  // Reflect the angle vertically
    }
  }
}

// Trigger ball launch on mouse click
function mousePressed() {
  ball.launch();
}
