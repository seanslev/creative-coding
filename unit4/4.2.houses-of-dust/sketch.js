let poem = '';

let grammar = tracery.createGrammar({//creating lists of strings
    "material": [//16 entries
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
    "place": [//15 entries
        "IN A DESERT",
        "IN A FOREST",
        "IN A CITY",
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
    "light_source": [//16 entries
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
    "inhabitants": [//16 entries
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
        "NOSTALGIA"// I made unique inhabitants, the results often give a sort of abandoned/ghost like house poems
    ],
    "origin": "A HOUSE OF #material#\n#place#\nILLUMINATED WITH #light_source#\nINHABITED BY #inhabitants#"
});//16x16x15x16=61,440

poem = grammar.flatten("#origin#");        


function setup() {
  createCanvas(800, 800);
  noLoop();
}

function draw() {
  background(220);

  textSize(40);
  text(poem,50,70);//printing poem
}
