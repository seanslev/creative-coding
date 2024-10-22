
function setup() {

  // create the canvas
  createCanvas(1000, 1000);
  
}

//translate(50, 50);
//rect(0,0,300,300);
//let from = color
//let to = color
//for (let x = 0; x < 300; x++) {
//let fill_color = lerpColor(from, to ,x/300);

//fill(fill_color);  
//rect(0,x,300,1)
//}
function draw() {

  //creating a interpolate color
 let from = color("white");
 let to = color("black");

//creating intermediate colors
 let interA = lerpColor(from, to, 0.25);
 let interB = lerpColor(from, to, 0.50);
 let interC = lerpColor(from, to, 0.75);

  let treeX = random(10,950);
  let treeX2 = random(30, 100);
  treeX2 = treeX2 + treeX;
  let treeY = 300
  let treeY2 = random(380,500);

//drawing hill #1
 let noiseLevel = 200;
  let noiseScale = 0.0001;

 
  let x = frameCount;
  let nx = noiseScale * x;


  let y = noiseLevel * noise(nx);
  stroke("black");
  line(x, 0, x, y+500); 

  //drawing trees
  srtoke(67, 51, 8);
  fill(67, 51, 8); // tree brown
  rect(treeX,treeY,treeX2,treeY2); // trunk



  //drawing hill #2
  let noiseLevel2 = 100;
  let noiseScale2 = 0.005;

 
  let x2 = frameCount;
  let nx2 = noiseScale2 * x2;


  let y2 = noiseLevel2 * noise(nx2);

 

  stroke(interC);
  line(x2, 1000, x2, y2+200);

  //drawing hill #3
  let noiseLevel3 = 100;
  let noiseScale3 = 0.003;

 
  let x3 = frameCount;
  let nx3 = noiseScale3 * x3;


  let y3 = noiseLevel3 * noise(nx3);
  stroke(interB);
  line(x3, y3+700, x3, 1000);

}