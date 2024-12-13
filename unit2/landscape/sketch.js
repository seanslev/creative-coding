function setup() {
  // Create the canvas
  createCanvas(1000, 1000);
  
  // Draw the hills immediately
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

  // Drawing hills
  let noiseLevels = [200, 500, 100]; // Noise levels for each hill
  let noiseScales = [0.0001, 0.01, 0.003]; // Noise scales for each hill
  let hillColors = [sky, treeLine, ground]; // Colors for each hill

  // Loop through the hills
  for (let i = 0; i < noiseLevels.length; i++) {
    for (let x = 0; x < width; x++) {
      let nx = noiseScales[i] * x; // Calculate noise based on x position
      let y = noiseLevels[i] * noise(nx); // Get the noise value

      // Set the stroke color for the current hill
      stroke(hillColors[i]);

      // Draw the hill lines
      if (i == 0) {
        line(x, 0, x, y + 500); // For hill #1
      } else if (i == 1) {
        line(x, 1000, x, y); // For hill #2
      } else if (i == 2) {
        line(x, y + 700, x, 1000); // For hill #3
      }
    }
  }

  // Draw tall skinny rectangles once during setup
  
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



