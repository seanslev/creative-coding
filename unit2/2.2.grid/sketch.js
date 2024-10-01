function setup() {
  // create a canvas
  createCanvas(1000, 1000);

  // disable animation
  noLoop();
}

function draw() {
  background(0);

  translate(100,100);
  for (let x = 0; x < 8; x++){
    for (let y = 0; y < 8; y++){
        push();
        translate(x * 100, y * 100);
        //setting random values for RBG for 3 different things
        let r = random(255);
        let b = random(255);
        let g = random(255);

        let r2 = random(255);
        let b2 = random(255);
        let g2 = random(255);

        let r3 = random(255);
        let b3 = random(255);
        let g3 = random(255);

        //fill the squares with a random rbg color
        fill(r,b,g);

        //a previous non working color picker I tried
        //fill(random([(129, 66, 245),(56, 53, 242),(33, 31, 153),(29, 28, 102),(9, 8, 87),(42, 90, 181),(63, 122, 235),(40, 163, 235)]));

        //adds an outline with a random color of the ones listed and thickness 1-10
        stroke(r2,b2,g2);
        //previous random color picker
        //stroke(random(["lime","blue","purple","red","orange","yellow","pink","teal"]));

        strokeWeight(random(10));

        rect(0,0,100,100);
        //chooses a random shape each loop to print inside our grid
        let shapeRandom = random([ellipse, square, quad, line, triangle]);
        //determines random values for x and y 
        let x2 = random(50);
        let y2 = random(50);
        //prints a shape with random width, height, color, fill, and thickness
        fill(r3,b3,g3);

        shapeRandom(random(50),random(50), x2, y2);

        pop();
   }
}
}