const canvas = document.getElementById('timeCanvas');
const ctx = canvas.getContext('2d');

function setup() {
    drawScene();
}

function drawScene() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const currentHour = new Date().getHours();
    const season = getCurrentSeason(currentHour);
    drawTree(season);
    requestAnimationFrame(drawScene);
}

function getCurrentSeason(hour) {
    // Map the hour to the seasons
    if (hour >= 6 && hour < 12) return 'spring'; // Spring (6 AM - 11 AM)
    else if (hour >= 12 && hour < 18) return 'summer'; // Summer (12 PM - 5 PM)
    else if (hour >= 18 && hour < 24) return 'autumn'; // Autumn (6 PM - 11 PM)
    else return 'winter'; // Winter (12 AM - 5 AM)
}

function drawTree(season) {
    const trunkColor = '#8B4513'; // Brown for trunk
    const trunkWidth = 40;
    const trunkHeight = 100;

    // Draw the trunk
    ctx.fillStyle = trunkColor;
    ctx.fillRect(canvas.width / 2 - trunkWidth / 2, canvas.height - trunkHeight, trunkWidth, trunkHeight);

    // Draw leaves based on the current season
    switch (season) {
        case 'spring':
            drawLeaves(['#FFB6C1', '#90EE90'], 80, 50); // Light pink and light green
            break;
        case 'summer':
            drawLeaves(['#228B22', '#32CD32'], 150, 80); // Dark green
            break;
        case 'autumn':
            drawLeaves(['#FF6347', '#FFD700', '#FF4500'], 120, 80); // Orange and yellow
            break;
        case 'winter':
            drawLeaves(['#FFFFFF'], 0, 0); // Bare branches with snow
            break;
    }
}

function drawLeaves(colors, leafHeight, leafWidth) {
    const leafPositions = [
        { x: -60, y: -80 }, { x: -30, y: -70 }, { x: 0, y: -90 },
        { x: 30, y: -70 }, { x: 60, y: -80 },
    ];

    leafPositions.forEach(pos => {
        ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
        ctx.beginPath();
        ctx.ellipse(canvas.width / 2 + pos.x, canvas.height - 100 + pos.y, leafWidth, leafHeight, Math.PI / 4, 0, 2 * Math.PI);
        ctx.fill();
    });
}

setup();
