// Matter.js module aliases
const { Engine, Render, World, Bodies, Body, Vector, Events, Constraint } = Matter;

let engine;
let world;
let ball;
let paddles = [];
let bumpers = [];
let walls = [];
let slants = [];
let holes = []; // Array to store holes
let gameOver = false;
let score = 0;
let highScore = 0;

let gameOverZoneRadius = 50; // Smaller game over zone radius

function setup() {
  createCanvas(800, 850);

  // Create the Matter.js engine and world
  engine = Engine.create();
  world = engine.world;

  // Create the ball and position it above the paddles (e.g., 200px above)
  ball = Bodies.circle(width / 4, height / 2, 20, {
    restitution: 1.2, // Makes the ball extra bouncy
    frictionAir: 0.01, // Slight air friction to slow it down
  });
  World.add(world, ball);

  // Create walls
  walls.push(Bodies.rectangle(width / 2, 0, width, 10, { isStatic: true })); // Top wall
  walls.push(Bodies.rectangle(width / 2, height, width, 10, { isStatic: true })); // Bottom wall
  walls.push(Bodies.rectangle(0, height / 2, 10, height, { isStatic: true })); // Left wall
  walls.push(Bodies.rectangle(width, height / 2, 10, height, { isStatic: true })); // Right wall

  // Add the walls to the world
  World.add(world, walls);

  // Create fixed bumpers at specific locations with higher restitution
  bumpers.push(Bodies.circle(300, 200, 30, { isStatic: true, restitution: 2 }));
  bumpers.push(Bodies.circle(500, 200, 30, { isStatic: true, restitution: 2 }));
  bumpers.push(Bodies.circle(400, 400, 30, { isStatic: true, restitution: 2 }));
  bumpers.push(Bodies.circle(220, 700, 30, { isStatic: true, restitution: 3 }));
  bumpers.push(Bodies.circle(580, 700, 30, { isStatic: true, restitution: 3 }));
  bumpers.push(Bodies.circle(180, 700, 30, { isStatic: true, restitution: 3 }));
  bumpers.push(Bodies.circle(620, 700, 30, { isStatic: true, restitution: 3 }));

  // Add bumpers to the world
  World.add(world, bumpers);

  // Create paddles with a gap between them (100px apart)
  let paddle1 = Bodies.rectangle(width / 2 - 75, height - 100, 100, 20, { restitution: 4 }); // Left paddle
  let paddle2 = Bodies.rectangle(width / 2 + 75, height - 100, 100, 20, { restitution: 4 }); // Right paddle

  // Create hinge constraint for paddle1 (left paddle) at its leftmost end
  let hinge1 = Constraint.create({
    pointA: { x: width / 2 - 125, y: height - 100 }, // Attach hinge to the left side of paddle1
    bodyB: paddle1,
    pointB: { x: -50, y: 0 }, // Relative to the paddle's center
    stiffness: 1,
    damping: 0.1
  });

  // Create hinge constraint for paddle2 (right paddle) at its rightmost end
  let hinge2 = Constraint.create({
    pointA: { x: width / 2 + 125, y: height - 100 }, // Attach hinge to the right side of paddle2
    bodyB: paddle2,
    pointB: { x: 50, y: 0 }, // Relative to the paddle's center
    stiffness: 1,
    damping: 0.1
  });

  // Add paddles to the world
  World.add(world, [paddle1, paddle2]);

  // Add the hinge constraints to the world
  World.add(world, [hinge1, hinge2]);

  // Store the paddles in an array for easy access
  paddles.push(paddle1, paddle2);

  // Create slanted barriers in the corners using fromVertices
  slants.push(Bodies.fromVertices(0, height, [
    { x: 0, y: height },
    { x: 1000, y: height },
    { x: 0, y: height - 1000 }
  ], { isStatic: true }));  // Bottom-left corner

  slants.push(Bodies.fromVertices(width, height, [
    { x: width, y: height },
    { x: width - 1000, y: height },
    { x: width, y: height - 1000 }
  ], { isStatic: true }));  // Bottom-right corner

  slants.push(Bodies.fromVertices(0, 0, [
    { x: 0, y: 0 },
    { x: 100, y: 100 },
    { x: 0, y: 100 }
  ], { isStatic: true }));  // Top-left corner

  slants.push(Bodies.fromVertices(width, 0, [
    { x: width, y: 0 },
    { x: width - 100, y: 100 },
    { x: width, y: 100 }
  ], { isStatic: true }));  // Top-right corner

  // Add slants to the world
  World.add(world, slants);

  // Create holes at specific positions
  holes.push({ x: 200, y: 300, radius: 30 });
  holes.push({ x: 600, y: 500, radius: 30 });

  // Run the engine
  Engine.run(engine);
}

function draw() {
  background(0);

  // Update the Matter.js engine
  Engine.update(engine);

  // Display the ball
  fill(255);
  noStroke();
  ellipse(ball.position.x, ball.position.y, 40, 40);

  // Display the bumpers
  for (let bumper of bumpers) {
    fill(255, 0, 0);
    ellipse(bumper.position.x, bumper.position.y, 60, 60);
  }

  fill(0, 0, 255); // Blue color for the walls
  for (let wall of walls) {
    rectMode(CENTER);
    rect(wall.position.x, wall.position.y, wall.bounds.max.x - wall.bounds.min.x, wall.bounds.max.y - wall.bounds.min.y);
  }

  // Display blue slanted barriers (vertices)
  fill(0, 0, 255, 100); // Semi-transparent blue for the slants
  for (let slant of slants) {
    beginShape();
    for (let vertexObj of slant.vertices) {
      vertex(vertexObj.x, vertexObj.y); // Correctly access the x and y of each vertex
    }
    endShape(CLOSE);
  }

  // Display paddles with the updated gap
  for (let paddle of paddles) {
    fill(0, 255, 0);
    rectMode(CENTER);
    push();
    translate(paddle.position.x, paddle.position.y);
    rotate(paddle.angle);
    rect(0, 0, 120, 20);
    pop();
  }

  // Display holes
  fill(0, 0, 255); // Blue color for holes
  noStroke();
  for (let hole of holes) {
    ellipse(hole.x, hole.y, hole.radius * 2);
  }

  // Display score
  fill(255);
  textSize(32);
  textAlign(LEFT, TOP);
  text('Score: ' + score, 20, 20);

  // Display game over zone
  noFill();
  stroke(255, 0, 0, 100);
  ellipse(width / 2, height - 50, gameOverZoneRadius * 2, gameOverZoneRadius * 2); // Transparent red zone

  // Check for "Game Over" (ball falls into the center hole)
  let ballDistance = dist(ball.position.x, ball.position.y, width / 2, height - 50); // Hole center at bottom center
  if (ballDistance < gameOverZoneRadius) {
    gameOver = true;
    // Update the high score if needed
    
    textSize(64);
    fill(255, 0, 0);
    textAlign(CENTER, CENTER);
    text("GAME OVER", width / 2, height / 2);
    textSize(32);
    text("Restart browser to play again", width / 2, height / 2 + 50);
  }
}

// Flick paddle behavior on mouse press and release
function mousePressed() {
  // Disable inputs if the game is over
  if (gameOver) {
    return;
  }

  // Determine which paddle to flick based on mouse position
  let flickingPaddle = mouseX < width / 2 ? paddles[0] : paddles[1]; // Left or right paddle

  // Apply torque to flick the selected paddle
  if (flickingPaddle) {
    let torque = mouseX < width / 2 ? -0.2 : 0.2; // Determine torque direction
    Body.setAngularVelocity(flickingPaddle, torque); // Flick the paddle
  }
}

function mouseReleased() {
  // Disable inputs if the game is over
  if (gameOver) {
    return;
  }

  // Stop the paddles' motion and reset their angular velocity
  for (let paddle of paddles) {
    Body.setAngularVelocity(paddle, 0); // Stop rotation
    Body.setAngle(paddle, 0); // Reset paddle angle to original position
  }
}
