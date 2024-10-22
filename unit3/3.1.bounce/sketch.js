let x = 50;
let y = 0;
let x2 = 0;
let y2 = 50;
let xspeed = 1;
let yspeed = 1;

//let img = document.createElement('img');
//img.src = 'SamSmile.png'; // Replace with the actual path


// Load the image.
function preload() {
  samsmile = loadImage('SamSmile.png');
}

let samsad;

//function preload() {
  //samsad = loadImage('SamSad.png');
  //samsmile = loadImage('SamSad.png');
//}

function setup() {
  createCanvas(600, 590);
  image(samsmile,x,y)
  //samsad = loadImage('SamSad.png');
  //samsmile = loadImage('C:\Users\seanm\OneDrive\Documents\GitHub\creative-coding\unit3\3.1.bounce\SamSmile.png');
}

function draw(){
  background(220);
  
  // check for collision with left and right edge
  if (x < 0 | x > width-50){
      xspeed = xspeed * -1; // reverse the x direction
  }
  if (y < 0 | y > height-50){
      yspeed = yspeed * -1; // reverse the x direction
  }
  
  x = x + xspeed; // iterate x

  y = y + yspeed; // iterate y



  // draw a circle
  
  //ctx.drawImage(samsmile,x,y);
  //image(samsmile,x, y, 50,50);
  //SamSmile.mask(circle);
  image(samsmile,x,y,50,50);
}