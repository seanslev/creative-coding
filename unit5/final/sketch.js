// Matter.js module aliases
const { Engine, Render, World, Bodies, Body, Events } = Matter;

let engine;
let world;
let ball;
let paddles = [];
let bumpers = [];
let walls = [];

function setup() {
  createCanvas(800, 600);
  
  // Create the Matter.js engine and world
  engine = Engine.create();
  world = engine.world;

  // Create the ball
  ball = Bodies.circle(width / 2, height / 2, 20, {
    restitution: 0.9, // Makes the ball bouncy
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

  // Create bumpers
  for (let i = 0; i < 5; i++) {
    let bumper = Bodies.circle(random(100, width - 100), random(100, height - 100), 30, {
      isStatic: true,
      restitution: 1, // Bouncy bumpers
    });
    bumpers.push(bumper);
    World.add(world, bumper);
  }

  // Create paddles
  paddles.push(Bodies.rectangle(100, height - 50, 100, 20, { isStatic: true }));
  paddles.push(Bodies.rectangle(width - 100, height - 50, 100, 20, { isStatic: true }));
  
  // Add paddles to the world
  World.add(world, paddles);
  
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

  // Display paddles
  for (let paddle of paddles) {
    fill(0, 255, 0);
    rectMode(CENTER);
    rect(paddle.position.x, paddle.position.y, 100, 20);
  }

  // Display walls (optional, for debugging)
  fill(255, 255, 255, 50);
  for (let wall of walls) {
    rectMode(CENTER);
    rect(wall.position.x, wall.position.y, wall.bounds.max.x - wall.bounds.min.x, wall.bounds.max.y - wall.bounds.min.y);
  }
}

function mousePressed() {
  // Apply a force to launch the ball in the direction of the mouse click
  let angle = atan2(mouseY - ball.position.y, mouseX - ball.position.x);
  let force = Matter.Vector.create(cos(angle) * 0.05, sin(angle) * 0.05);
  Matter.Body.applyForce(ball, ball.position, force);
}

// Update paddle movement with the mouse
function mouseDragged() {
  for (let paddle of paddles) {
    Matter.Body.setPosition(paddle, { x: mouseX, y: paddle.position.y });
  }
}
