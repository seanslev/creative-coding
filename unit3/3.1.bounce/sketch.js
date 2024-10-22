let x = 0;
let y = 0;
let xspeed = 1;
let yspeed = 1;
function preload() {
  img = loadImage(
}
function setup() {
  createCanvas(400, 400);
}

function draw(){
  background(220);
  
  // check for collision with left and right edge
  if (x < 0 | x > width){
      xspeed = xspeed * -1; // reverse the x direction
  }
  if (y < 0 | y > width){
      yspeed = yspeed * -1; // reverse the x direction
  }
  x = x + xspeed; // iterate x

  y = y + yspeed; // iterate y

  // draw a circle
  fill("red");
  circle(x, y, 50);
}