let circles = [
  [50,100],
  [100,150],
  [150,200],
  [200,250],
  [250,300]
]

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background("white");
  fill("orange");
  noStroke();

  for (let i = 0; i < circles.length; i += 1){
    circle(circles[i][0],circles[i][1],50)
  }
  
}