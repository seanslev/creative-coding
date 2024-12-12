// Matter.js module aliases
const { Engine, Render, World, Bodies, Body, Vector, Events, Constraint } = Matter;

let engine;
let world;
let ball;
let paddles = [];
let bumpers = [];
let walls = [];
let slants = [];
let flickingPaddle = null;
let paddleForce = 0.15;  // Force for flicking paddles
let gravity = 0.5;  // Gravity for paddles
let gameOver = false;
let score = 0;
let highScore = 0;

let retryButton;

let gameOverZoneRadius = 50;  // Smaller game over zone radius

function setup() {
  createCanvas(800, 850);

  // Load high score from local storage
  highScore = localStorage.getItem('highScore') ? parseInt(localStorage.getItem('highScore')) : 0;

  // Create the Matter.js engine and world
  engine = Engine.create();
  world = engine.world;

  // Create the ball
  ball = Bodies.circle(width / 2, height / 2, 20, {
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
  bumpers.push(Bodies.circle(300, 200, 30, { isStatic: true, restitution: 1.5 }));
  bumpers.push(Bodies.circle(500, 200, 30, { isStatic: true, restitution: 1.5 }));
  bumpers.push(Bodies.circle(400, 400, 30, { isStatic: true, restitution: 1.5 }));
  bumpers.push(Bodies.circle(250, 700, 30, { isStatic: true, restitution: 1 }));
  bumpers.push(Bodies.circle(550, 700, 30, { isStatic: true, restitution: 1 }));

  // Add bumpers to the world
  World.add(world, bumpers);

  // Create paddles with a gap between them (100px apart)
  let paddle1 = Bodies.rectangle(width / 2 - 75, height - 100, 100, 20, { restitution: 1.5 });
  let paddle2 = Bodies.rectangle(width / 2 + 75, height - 100, 100, 20, { restitution: 1.5 });

  // Add paddles to the world
  World.add(world, [paddle1, paddle2]);

  // Create revolute constraints (hinges) for paddles, attach to far end
  let hinge1 = Constraint.create({
    pointA: { x: width / 2 - 75 - 50, y: height - 100 },  // Attach hinge to far end (left side)
    bodyB: paddle1,
    stiffness: 1,
    damping: 0.1
  });

  let hinge2 = Constraint.create({
    pointA: { x: width / 2 + 75 + 50, y: height - 100 },  // Attach hinge to far end (right side)
    bodyB: paddle2,
    stiffness: 1,
    damping: 0.1
  });

  // Add the constraints to the world
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
    { x: width - 1000, y: height},
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

  // Setup Matter.js renderer (optional, but helpful for debugging)
  const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
      width: width,
      height: height,
      wireframes: false, // Use real visuals instead of wireframes
    },
  });

  Render.run(render);

  // Run the engine
  Engine.run(engine);

  // Create retry button
  retryButton = createButton('Retry');
  retryButton.position(width / 2 - 50, height / 2 + 50);
  retryButton.size(100, 50);
  retryButton.mousePressed(restartGame);
  retryButton.hide();  // Hide retry button at the start
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
    translate(paddle.position.x, paddle.position.y);
    rotate(paddle.angle);
    rect(0, 0, 100, 20);
    rotate(-paddle.angle); // Undo the rotation
    translate(-paddle.position.x, -paddle.position.y); // Undo the translation
  }

  // Display score
  fill(255);
  textSize(32);
  textAlign(LEFT, TOP);
  text('Score: ' + score, 20, 20);

  // Display high score
  textAlign(RIGHT, TOP);
  text('High Score: ' + highScore, width - 20, 20);

  // Display game over zone
  noFill();
  stroke(255, 0, 0, 100);
  ellipse(width / 2, height - 50, gameOverZoneRadius * 2, gameOverZoneRadius * 2); // Transparent red zone

  // Check for "Game Over" (ball falls into the center hole)
  let ballDistance = dist(ball.position.x, ball.position.y, width / 2, height - 50); // Hole center at bottom center
  if (ballDistance < gameOverZoneRadius) {
    gameOver = true;
    // Update the high score if needed
    if (score > highScore) {
      highScore = score;
      localStorage.setItem('highScore', highScore);  // Save new high score
    }
    textSize(64);
    fill(255, 0, 0);
    textAlign(CENTER, CENTER);
    text("GAME OVER", width / 2, height / 2);
    textSize(32);
    text("Click retry to play again", width / 2, height / 2 + 50);
    retryButton.position(width / 2, 50);
    retryButton.show();  // Show retry button
  }
}

// Flick paddle behavior on mouse press and release
function mousePressed() {
  // Disable inputs if the game is over
  if (gameOver) {
    return;
  }

  // Apply upward force to the paddles on mouse press
  for (let paddle of paddles) {
      Matter.Body.applyForce(paddle, paddle.position, { x: 0, y: -paddleForce });
    }
}


function mouseReleased() {
  // Disable inputs if the game is over
  if (gameOver) {
    return;
  }
  // Reset paddle flicking
  flickingPaddle = null;
}

// Restart the game
function restartGame() {
  score = 0;
  gameOver = false;
  retryButton.hide();  // Hide retry button
  ball.position = { x: width / 2, y: height / 2 };  // Reset ball position
  Matter.Body.setVelocity(ball, { x: 0, y: 0 });  // Reset velocity
}
