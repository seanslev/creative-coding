function setup() {
  // Create the canvas
  createCanvas(1000, 1000);
  
  //setting colors so i can recall the in fill
  let r = random(150);
  let b = random(150);
  let g = random(150);
  let black = color(0);
  let white = color(255);
  let sky = color(r,b,g);
  let light = lerpColor(sky, white, 0.2);
  let treeLine = lerpColor(sky, black, 0.2);
  let ground = lerpColor(treeLine, black, 0.2);
  let pole = lerpColor(ground, black, 0.2);

  //drawing noise levels
  let noiseLevels = [200, 500, 100]; //noise levels for each layer
  let noiseScales = [0.0001, 0.01, 0.003]; //noise scales for each layer
  let hillColors = [sky, treeLine, ground]; //colors for each layer

  //loop through each value for layers
  for (let i = 0; i < noiseLevels.length; i++) {
    for (let x = 0; x < width; x++) {
      let nx = noiseScales[i] * x; //calculate noise based on x position
      let y = noiseLevels[i] * noise(nx); //get the noise value

      // set the stroke color for the current in loop 
      stroke(hillColors[i]);

      //draw the layer lines
      if (i == 0) {
        line(x, 0, x, y + 500); // For hill #1
      } else if (i == 1) {
        line(x, 1000, x, y); // For hill #2
      } else if (i == 2) {
        line(x, y + 700, x, 1000); // For hill #3
      }
    }
  }

  //drawing tent and lamp post with "light" emmitting them
  
  fill("white");
  strokeWeight("1");
  triangle(800, 780, 845, 670, 905, 790);
  fill("gray");
  circle(850,768,30);
  fill(r, b, g, 100);
  noStroke();
  circle( 850, 730, 200);
  circle(200, 650, 200);
  fill(pole);
  rect(190, 610, 20, 190);
  fill(light);
  stroke(ground);
  rect(180, 630, 40, 50);


}



