let poem = '';

let grammar = tracery.createGrammar({
    "material": [
        "WOOL",
        "DUST",
        "MOSS",
        "PAPER",
        "COPPER",
        "ROOTS",
        "FOIL",
        "BALLOONS",
        "WOOD",
        "STRAW",
        "WEEDS",
        "STONE",
        "GLASS",
        "CLAY",
        "METAL",
        "FIBER"
    ],
    "place": [
        "IN A DESERT",
        "IN A FOREST",
        "A CITY",
        "NEAR AN ABANDONED CEMETARY",
        "SURROUNDED BY A GARDEN",
        "ON A SHORE",
        "NEXT TO A COTTAGE",
        "IN A GHOST TOWN",
        "ON A MOUNTAINTOP",
        "ON AN ISLAND",
        "IN A VALLEY",
        "NEAR A BRIDGE",
        "BESIDE A CAVE",
        "ON AN OLD ROAD",
        "OVER A HILL"
    ],
    "light_source": [
        "CANDLES",
        "OIL LAMPS",
        "ELECTRICITY",
        "MOONLIGHT",
        "SUNLIGHT",
        "FIRELIGHT",
        "TORCHES",
        "LANTERNS",
        "GLOWWORMS",
        "STARS",
        "WILDFIRE",
        "NEON LIGHT",
        "SUNSET",
        "TWILIGHT",
        "FIREWORKS",
        "LIGHTNING"
    ],
    "inhabitants": [
        "GHOSTS",
        "WIND",
        "MEMORIES",
        "ANIMALS",
        "SHADOWS",
        "SPIRITS",
        "HUMANS",
        "FLIES",
        "WOLVES",
        "BIRDS",
        "LIZARDS",
        "TREES",
        "BATS",
        "MICE",
        "FAIRIES",
        "NOSTALGIA"
    ],
    "origin": "A HOUSE OF #material#\n#place#\nILLUMINATED WITH #light_source#\nINHABITED BY #inhabitants#"
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
