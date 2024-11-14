let poem = '';

let grammar = tracery.createGrammar({
  "material": [
    "SAND",
    "DUST",
    "LEAVES",
    "PAPER",
    "TIN",
    "ROOTS",
    "BRICKS",
    "BROKEN DISHES",
    "WOOD",
    "STRAW",
    "WEEDS"
  ],
  "light":[
    "USING CANDLES",
    "USING ELECTRICITY",
    "USING OIL LAMPS",
  ],
  "origin": "A HOUSE OF #material# \n #light# "
});

poem = grammar.flatten("#origin#");


function setup() {
  createCanvas(800, 800);
  noLoop();
}

function draw() {
  background(220);

  textSize(40);
  text(poem,50,70);
}
