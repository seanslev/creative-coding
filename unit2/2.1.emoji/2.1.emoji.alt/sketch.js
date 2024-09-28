var lineX = 216;
var Xmove = 2;
function setup() {
  // create a canvas
  createCanvas(1000, 1000);
  
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
  stroke("cyan");  
  strokeWeight(17);
  line(lineX, 313, lineX, 327);
  lineX = lineX + Xmove;

  if (lineX > 289) {
    Xmove = -Xmove;
  }

  if (lineX < 216) {
    Xmove = -Xmove;
  }

  //these cyan lines with be the pill shaped eyes
  stroke("cyan");
  strokeWeight(30);
  line(195, 210, 195, 230);

  stroke("cyan");
  strokeWeight(30);
  line(305, 210, 305, 230);






//outer melon
  fill("darkgreen");
  stroke('darkgreen');
  circle(750, 280, 280);

//yellow rind
  fill(0,20,255);
  stroke(165,199,105);
  circle(750, 280, 250);

//meat of the fruit
  fill("red");
  stroke('red');
  circle(750, 280, 230);

//cutting the fruit in half
  rotate(45);
  fill(30);
  stroke(30);
  strokeWeight(5);
  square(470, -805, 320);

  //melon seeds
  rotate(-45);
  fill("black");
  stroke("black");
  ellipse(727, 285, 12, 10);

  fill("black");
  stroke("black");
  ellipse(690, 290, 12, 15);

  fill("black");
  stroke("black");
  ellipse(700, 250, 12, 10);

  fill("black");
  stroke("black");
  ellipse(660, 230, 7, 12);

  fill("black");
  stroke("black");
  ellipse(690, 340, 12, 14);

  fill("black");
  stroke("black");
  ellipse(760, 360, 7, 12);

  fill("black");
  stroke("black");
  ellipse(740, 320, 14, 12);



  //begin a kissy face emoji

  stroke(255, 190, 0);
  fill(255, 205, 0)
  circle(500, 650, 300)

  //eye ball 

  stroke(255, 255, 255);
  fill(255, 255, 255);
  circle(450, 615, 70);

  //pupil

  stroke(59, 48, 25);
  fill(59, 48, 25);
  circle(455, 610, 25);



  //undereye

  stroke(255, 205, 0);
  fill(255, 205, 0);
  ellipse(450, 650, 70, 30)


  //eyebrow
  stroke(59, 48, 25);
  curve(435, 680, 410, 580, 460, 545, 455, 600);

  stroke(59, 48, 25);
  curve(435, 640, 560, 560, 610, 595, 560, 600);


//winky eye
  stroke(59, 48, 25);
  strokeWeight(15)
  curve(475, 800, 540, 620, 590, 620, 570, 700);

  //kissy face

  stroke(59, 48, 25);
  strokeWeight(15)
  curve(250, 640, 500, 660, 500, 690, 450, 630);

  stroke(59, 48, 25);
  strokeWeight(15)
  curve(250, 640, 500, 690, 500, 720, 450, 660);

  //heart
  stroke("hotpink");
  strokeWeight(30);
  line(590, 670, 605, 720);

  stroke("hotpink");
  strokeWeight(30);
  line(650, 690, 605, 720);

  stroke("hotpink");
  fill("hotpink");
  circle(603, 670, 25)

  stroke("hotpink");
  fill("hotpink");
  circle(639, 682, 25)
}