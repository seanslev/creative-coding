let x = 50;
let y = 0;
let x2 = 0;
let y2 = 50;
let xspeed;
let yspeed;
frameRate(10);
let frameCount = 10;
let samSmile, samSad, currentImg;
// Load the image.
//function preload() {
 // samsmile = loadImage('output-onlinepngtools.png');
//}



function preload() {
  samSad = loadImage('SamSad.png');
  samSmile = loadImage('SamSmile.png');
  currentImg = samSmile
}



function setup() {
  createCanvas(650, 600);
  xspeed = random([5,4,3,2,1,-1,-2,-3,-4,-5]);
  yspeed = random([5,4,3,2,1,-1,-2,-3,-4,-5]);

  //image(samsmile,x,y)
  //samsad = loadImage('SamSad.png');
  //SamSmile = loadImage('C:\Users\seanm\OneDrive\Documents\GitHub\creative-coding\unit3\3.1.bounce\SamSmile.png');
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
      frameCount = 0;
      
      //collisionCount = frameCount;
  }
  if (y < 0 | y > height-50){
      yspeed = yspeed * -1; // reverse the x direction
      let r = random(255);
      let b = random(255);
      let g = random(255);
      fill(r,g,b);
      frameCount = 0;
      //collisionCount = frameCount;
      
  }
  
  x = x + xspeed; // iterate x

  y = y + yspeed; // iterate y

  

  //let angle = frameCount * 0.02;
  //rotate(angle);
  // draw a circle
  image(currentImg,x,y,50,50);

  if (frameCount < 10){
    currentImg= samSad;
  } else{
    currentImg = samSmile;
  }
  
  //rect(x,y,50,50);
  //ctx.drawImage(samsmile,x,y);
  //image(samsmile,x, y, 50,50);
  //SamSmile.mask(circle);
  //image(samsmile,x,y,50,50);
}
