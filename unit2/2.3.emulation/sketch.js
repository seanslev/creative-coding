function setup() {
  // create the canvas
  createCanvas(1200, 1700);

  // disable animation
  noLoop();
}
//my assignment is based on https://www.artsy.net/artwork/kyong-lee-sinnliche-komposition-8-abstract-painting
//Kyong Lee Sinnliche Komposition 8 (Abstract painting), 2024
function draw() {

  background(255);
//creates a 10x15 square grid
  translate(100,100);
  for (let x = 0; x < 10; x++){
   for (let y = 0; y < 15; y++){

      push();
      //chooses random values to pick random colors of the color wheel
      let r = random(255);
      let b = random(255);
      let g = random(255);
      translate(x * 100, y * 100);

      
      //picks a random value between 0-100, we are using this to make our if statement compute 50% of the time
      let fiftypercent = random(100);

      //makes the fill of both rectangles white, for the second rectangle this will be our original fill, and can be replaced if the if statement computes
      fill("white");
      stroke("gray");
      rect(0,0,100,100);
      stroke("white");
      //every loop this if statement functions 50% of the time, making the smaller rectangle colored
      if (fiftypercent > 50) {
        fill(r,b,g);
      }
      //creates a smaller rectangle within
      rect(10,10,80,80);
      pop();

   }
  }
}