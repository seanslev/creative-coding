//matter.js module names
const { Engine, Render, World, Bodies, Body, Vector, Events, Constraint } = Matter;
//arrays and setting variable
let engine;
let world;
let ball;
let paddles = [];
let bumpers = [];
let walls = [];
let slants = [];
let holes = []; 
let gameOver = false;
let score = 0;
let highScore = 0;

let gameOverZoneRadius = 40; //variable to call when game over

function setup() {
  createCanvas(800, 850);

  //matter.js engine and world creation
  engine = Engine.create();
  world = engine.world;

  //create the ball positioned slightly left of the center
  ball = Bodies.circle(width / 4, height / 2, 20, {
    restitution: 1.2, //restitution is "bounciness"
    frictionAir: 0.01, //slows ball down in air
  });
  World.add(world, ball);

  //pushing walls
  walls.push(Bodies.rectangle(width / 2, 0, width, 10, { isStatic: true })); //top wall
  walls.push(Bodies.rectangle(width / 2, height, width, 10, { isStatic: true })); //bottom wall
  walls.push(Bodies.rectangle(0, height / 2, 10, height, { isStatic: true })); //left wall
  walls.push(Bodies.rectangle(width, height / 2, 10, height, { isStatic: true })); //right wall

  
  World.add(world, walls);

  //pushing fixed bumpers at specific locations with higher restitution, simulates bumpers in pin ball
  bumpers.push(Bodies.circle(300, 200, 30, { isStatic: true, restitution: 2 }));
  bumpers.push(Bodies.circle(500, 200, 30, { isStatic: true, restitution: 2 }));
  bumpers.push(Bodies.circle(400, 400, 30, { isStatic: true, restitution: 2 }));
  bumpers.push(Bodies.circle(220, 710, 30, { isStatic: true, restitution: 3 }));
  bumpers.push(Bodies.circle(580, 710, 30, { isStatic: true, restitution: 3 }));
  bumpers.push(Bodies.circle(170, 700, 30, { isStatic: true, restitution: 3 }));
  bumpers.push(Bodies.circle(630, 700, 30, { isStatic: true, restitution: 3 }));
  bumpers.push(Bodies.circle(130, 500, 30, { isStatic: true, restitution: 3 }));
  bumpers.push(Bodies.circle(670, 500, 30, { isStatic: true, restitution: 3 }));

  
  World.add(world, bumpers);

  //create paddle variables so I can call them while mouse click
  let paddle1 = Bodies.rectangle(width / 2 - 75, height - 100, 100, 20, { restitution: 2.5 }); //left paddle
  let paddle2 = Bodies.rectangle(width / 2 + 75, height - 100, 100, 20, { restitution: 2.5 }); //right paddle

  //create hinge constraint for paddle1 (left paddle) at its leftmost end
  let hinge1 = Constraint.create({
    pointA: { x: width / 2 - 125, y: height - 100 }, //attach hinge to the left side of paddle1
    bodyB: paddle1,
    pointB: { x: -50, y: 0 },
    stiffness: 1,
    damping: 0.1
  });

  //create hinge constraint for paddle2 (right paddle) at its rightmost end
  let hinge2 = Constraint.create({
    pointA: { x: width / 2 + 125, y: height - 100 }, //attach hinge to the right side of paddle2
    bodyB: paddle2,
    pointB: { x: 50, y: 0 }, 
    stiffness: 1,
    damping: 0.1
  });

  //using a array to add paddles with world
  World.add(world, [paddle1, paddle2]);

  //add the hinge constraints to the world the same
  World.add(world, [hinge1, hinge2]);

  //the paddles in an array for easy access
  paddles.push(paddle1, paddle2);

  //creating slants for the ball slowly fall into hole
  slants.push(Bodies.fromVertices(0, height, [
    { x: 0, y: height },
    { x: 1000, y: height },
    { x: 0, y: height - 1000 }
  ], { isStatic: true }));  //bottom-left corner

  slants.push(Bodies.fromVertices(width, height, [
    { x: width, y: height },
    { x: width - 1000, y: height },
    { x: width, y: height - 1000 }
  ], { isStatic: true }));  //bottom-right corner
//these two are for design purposes
  slants.push(Bodies.fromVertices(0, 0, [
    { x: 0, y: 0 },
    { x: 100, y: 100 },
    { x: 0, y: 100 }
  ], { isStatic: true }));  //top-left corner

  slants.push(Bodies.fromVertices(width, 0, [
    { x: width, y: 0 },
    { x: width - 100, y: 100 },
    { x: width, y: 100 }
  ], { isStatic: true }));  //top-right corner

  //slants adding
  World.add(world, slants);

  //creating holes at with calling
  spawnHole();
  spawnHole();

  //run the engine
  Engine.run(engine);
}

function draw() {
  background(0);

  //updating for engine to render stuff
  Engine.update(engine);

  //check for "Game Over" (ball falls into the center hole)
  let ballDistance = dist(ball.position.x, ball.position.y, width / 2, height - 50); //hole center at bottom center
  if (ballDistance < gameOverZoneRadius) {
    gameOver = true;

    //freezing the ball during game over
    Body.setVelocity(ball, { x: 0, y: 0 });
    Body.setAngularVelocity(ball, 0);
    Body.setStatic(ball, true);

    //displaying game over
    textSize(64);
    fill(255, 0, 0);
    textAlign(CENTER, CENTER);
    text("GAME OVER", width / 2, height / 2);
    textSize(32);
    text("Restart browser to play again", width / 2, height / 2 + 50);
  }

  //ball creation
  fill(255);
  noStroke();
  ellipse(ball.position.x, ball.position.y, 40, 40);

  //display the bumpers
  for (let bumper of bumpers) {
    fill(255, 0, 0);
    ellipse(bumper.position.x, bumper.position.y, 60, 60);
  }

  fill(0, 0, 255); //blue color for the walls
  for (let wall of walls) { //WALLS DISPLAYED
    rectMode(CENTER);
    rect(wall.position.x, wall.position.y, wall.bounds.max.x - wall.bounds.min.x, wall.bounds.max.y - wall.bounds.min.y);
  }

  // display blue slanted barriers (vertices) with a transparency for looks
  fill(0, 0, 255, 100); //blue for the slants
  for (let slant of slants) {
    beginShape();
    for (let vertexObj of slant.vertices) {
      vertex(vertexObj.x, vertexObj.y); 
    }
    endShape(CLOSE);
  }

  //display paddles with a rotate function, so the paddles can swing
  for (let paddle of paddles) {
    fill(0, 255, 0);
    rectMode(CENTER);
    push();
    translate(paddle.position.x, paddle.position.y);
    rotate(paddle.angle);
    rect(0, 0, 120, 20);
    pop();
  }

  // Check if the ball enters any hole
  for (let i = holes.length - 1; i >= 0; i--) {
    let hole = holes[i];
    let distance = dist(ball.position.x, ball.position.y, hole.x, hole.y);
    if (distance < hole.radius) {
      //remove the collected hole when touched
      holes.splice(i, 1);
      //changes score
      score += 10;
      //spawn a new hole after
      spawnHole();
    }
  }

  //display holes
  fill(0, 0, 255); // Blue
  noStroke();
  for (let hole of holes) {
    ellipse(hole.x, hole.y, hole.radius * 2);
  }

  //display score
  fill(255);
  textSize(32);
  textAlign(LEFT, TOP);
  text('Score: ' + score, 20, 20); //updates score constantky

  //display game over zone
  fill(255, 0, 0, 100);
  stroke(255, 0, 0, 100);
  ellipse(width / 2, height - 40, gameOverZoneRadius * 2, gameOverZoneRadius * 2); //transparent red zone
}

//flick paddle behavior on mouse press and release
function mousePressed() {
  //disable inputs if the game is over
  if (gameOver) {
    return;
  }

  //determining which paddle to flick based on mouse position
  let flickingPaddle = mouseX < width / 2 ? paddles[0] : paddles[1]; // Left or right paddle

  //apply "torque" to flick the selected paddle
  if (flickingPaddle) {
    let torque = mouseX < width / 2 ? -0.2 : 0.2; //torque direction
    Body.setAngularVelocity(flickingPaddle, torque); // THE FLICK
  }
}

function mouseReleased() {
  //disable inputs if the game is over
  if (gameOver) {
    return;
  }

  //stop the paddles motion and reset their angular velocity
  for (let paddle of paddles) {
    Body.setAngularVelocity(paddle, 0); //stop rotation
    Body.setAngle(paddle, 0); //reset paddle angle to original position when mouse not clicked
  }
}

function spawnHole() {
  //ensure the new hole doesn't overlap existing holes or the ball
  let newHole;
  let validHole = false;
  while (!validHole) {
    newHole = {
      x: random(100, width - 100),
      y: random(100, height - 300),//makes hole spawn above the game over zone
      radius: 30
    };
    validHole = holes.every(hole => dist(newHole.x, newHole.y, hole.x, hole.y) > hole.radius * 2) &&
                dist(newHole.x, newHole.y, ball.position.x, ball.position.y) > 50;
  }
  holes.push(newHole);
}
