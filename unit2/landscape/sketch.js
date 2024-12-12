function setup() {
  // Create the canvas
  createCanvas(1000, 1000);
  
  // Draw the hills immediately
  let sky = color(3, 21, 48);
  let treeLine = color(3, 38, 2);
  let ground = color(26, 16, 1);

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
  for (let i = 0; i < 5; i++) { // Draw exactly 3 rectangles
    let rectWidth = random(30, 75); // Random width
    let rectHeight = random(375, 600); // Random height
    let xPos = random(width); // Random x position
    let yPos = 800; // Fixed position at the bottom

    fill(26, 16, 1); // Fill color
    stroke(26, 16, 1); // Stroke color
    strokeWeight(random(30,60));
    line(xPos, rectHeight, xPos, 900); // Draw the rectangle
  }
  fill("white");
  stroke("brown");
  strokeWeight("1");
  triangle(800, 780, 845, 670, 905, 790);

}


