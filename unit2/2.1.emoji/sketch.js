var lineX = 216;
var Xmove = 2;

function setup() {
  // create a canvas
  createCanvas(500, 500);
  
}

//black background
function draw() {
  background(30);

  //red "ears"
  stroke("red");
  strokeWeight(20);
  line(95, 200, 95, 300);

  stroke("red");
  strokeWeight(20);
  line(405, 200, 405, 300);


  //two red antennas
  stroke("red");
  strokeWeight(10);
  line(100, 100, 100, 200);

  stroke("red")
  strokeWeight(10);
  line(400, 100, 400, 200);


  //the two red circles on the antennas
  fill("red");
  stroke("red");
  circle(100, 100, 20);

  fill("red");
  stroke("red");
  circle(400, 100, 20);

  //left side of the face
  stroke("lightgray");
  strokeWeight(80);
  line(145, 175, 145, 335);

  //right side of the face
  stroke("lightgray");
  strokeWeight(80);
  line(355, 175, 355, 335);

  //top of the face
  stroke("lightgray");
  strokeWeight(80);
  line(145, 175, 355, 175);

  //the bottom of the face
  stroke("lightgray");
  strokeWeight(80);
  line(145, 345, 355, 345);


  //filling the robots face
  stroke("lightgray");
  strokeWeight(100);
  line(165, 260, 335, 260);

  //Light bulb on head
  stroke("orange");
  strokeWeight(30)
  line(200, 120, 300, 120);

  //eye socket
  stroke("black");
  strokeWeight(85)
  line(165, 220, 335, 220);

  //this black line is the mouth 
  stroke("black");
  strokeWeight(30)
  line(220, 320, 285, 320);

  //this is code for the potential extra credit
  //(random(200, 255), random(200, 255),random(200, 255);
  //stroke("cyan");  
  //strokeWeight(17);
  //line(lineX, 318, lineX, 322);
  //lineX = lineX + Xmove;

  //if (lineX > 289) {
   // Xmove = -Xmove;
  //}

  //if (lineX < 216) {
    //Xmove = -Xmove;
  //}

  //these cyan lines with be the pill shaped eyes
  stroke("cyan");
  strokeWeight(30);
  line(195, 210, 195, 230);

  stroke("cyan");
  strokeWeight(30);
  line(305, 210, 305, 230);
}