function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  const currentHour = hour(); //get the current hour of the day
  const season = getCurrentSeason(currentHour); //get the current season
  
  //change the sky background based on the time of day
  setSkyBackground(currentHour);
  
  //draw the tree based on the season
  drawTree(season);
}

function getCurrentSeason(hour) {
  // Map the hour to the seasons with more flexible ranges
  if (hour >= 6 && hour < 12) return 'spring';  // Morning
  else if (hour >= 12 && hour < 18) return 'summer';  // Afternoon
  else if (hour >= 18 && hour < 22) return 'autumn';  // Evening
  else return 'winter';  // Night
}

function setSkyBackground(hour) {
  //sky colors for different times of the day
  let skyColor;

  if (hour >= 6 && hour < 12) {
    //morning: Light blue
    skyColor = lerpColor(color(0, 191, 255), color(135, 206, 250), map(hour, 6, 12, 0, 1));
  } else if (hour >= 12 && hour < 18) {
    //nfternoon: Sky blue
    skyColor = color(135, 206, 250);
  } else if (hour >= 18 && hour < 22) {
    //nvening: Orange or purple for sunset
    skyColor = lerpColor(color(255, 165, 0), color(138, 43, 226), map(hour, 18, 22, 0, 1));
  } else {
    //night: Dark blue or black
    skyColor = color(25, 25, 112);
  }

  //setting the background to the sky color
  background(skyColor);
}

function drawTree(season) {
  const trunkColor = '#8B4513'; //brown
  const trunkWidth = 40;
  const trunkHeight = 150;

  //draw the trunk with branches
  fill(trunkColor);
  noStroke();
  rect(width / 2 - trunkWidth / 2, height - trunkHeight, trunkWidth, trunkHeight);
  triangle(width / 2 - 40, height - 100, width / 2, height - 50, width / 2, height - 70);
  triangle(width / 2 + 60, height - 150, width / 2 , height - 20, width / 2, height - 70);

  //draw leaves based on the current season
  switch (season) {
    case 'spring':
      drawLeaves(['#FFB6C1', '#90EE90'], 80, 50); //light pink and light green
      break;
    case 'summer':
      drawLeaves(['#228B22', '#32CD32'], 150, 80); //dark green
      break;
    case 'autumn':
      drawLeaves(['#FF6347', '#FFD700', '#FF4500'], 120, 80); //orange and yellow
      break;
    case 'winter':
      drawLeaves(['#FFFFFF'], 0, 0); //bare branches with snow
      break;
  }
}

function drawLeaves(colors, leafHeight, leafWidth) { //drawing multiple leaves with diff colors
  const leafPositions = [
    { x: -60, y: -80 }, { x: -30, y: -70 }, { x: 0, y: -90 },
    { x: 30, y: -70 }, { x: 60, y: -80 },
  ];

  leafPositions.forEach(pos => {
    fill(colors[Math.floor(Math.random() * colors.length)]);
    beginShape();
    ellipse(width / 2 + pos.x, height - 100 + pos.y, leafWidth, leafHeight);
    endShape(CLOSE);
  });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); 
}
