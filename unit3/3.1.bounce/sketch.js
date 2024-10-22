let x = 50;
let y = 0;
let x2 = 0;
let y2 = 50;
let xspeed = 5;
let yspeed = 5;


// Load the image.
//function preload() {
 // samsmile = loadImage('output-onlinepngtools.png');
//}



//function preload() {
  //samsad = loadImage('SamSad.png');
  //samsmile = loadImage('SamSad.png');
//}

function setup() {
  createCanvas(650, 600);
  //image(samsmile,x,y)
  //samsad = loadImage('SamSad.png');
  //samsmile = loadImage('C:\Users\seanm\OneDrive\Documents\GitHub\creative-coding\unit3\3.1.bounce\SamSmile.png');
}

function draw(){
  background(0);
  
  // check for collision with left and right edge
  if (x < 0 | x > width-50){
      xspeed = xspeed * -1; // reverse the x direction
      let r = random(255);
      let b = random(255);
      let g = random(255);
      fill(r,g,b);
      
  }
  if (y < 0 | y > height-50){
      yspeed = yspeed * -1; // reverse the x direction
      let r = random(255);
      let b = random(255);
      let g = random(255);
      fill(r,g,b);
      
  }
  
  x = x + xspeed; // iterate x

  y = y + yspeed; // iterate y


  
  // draw a circle
  //image(SamSmile,x,y);
  rect(x,y,50,50);
  //ctx.drawImage(samsmile,x,y);
  //image(samsmile,x, y, 50,50);
  //SamSmile.mask(circle);
  //image(samsmile,x,y,50,50);
}