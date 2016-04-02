//Variables
var tablesize = 4;

function startGame() {
	createTiles(4);
}

//This function creates the table, which contains the tiles
function createTiles(size) {
	var table = document.getElementById("gametable");
	for (i = 0; i < size; i++) {
		var row = table.insertRow(i);
		for (j = 0; j < size; j++) {
			var cell = row.insertCell(j);
			cell.innerHTML = "<div class='tile off' id='" + i + "-" + j + "' onclick='tileClicked(this);'>";
		}
	}
	randomizer();
}

function randomizer() {
	for (i = 0; i < 10; i++) {
		x = parseInt(Math.random() * tablesize);
		y = parseInt(Math.random() * tablesize);
		tileClicked(document.getElementById(x + "-" + y));
	}
}

function tileClicked(tile) {
	//Splits the tile id, and turns the coords into numbers, so it can easily be changed
	id = tile.id.split("-");
	id[0] = Number(id[0]);
	id[1] = Number(id[1]);
	//Creates a list of the ids of adjacentTiles
	var adjacentTiles = [];
	adjacentTiles[0] = (id[0] - 1) + "-" + id[1];
	adjacentTiles[1] = id[0] + "-" + (id[1] + 1);
	adjacentTiles[2] = (id[0] + 1) + "-" + id[1];
	adjacentTiles[3] = id[0] + "-" + (id[1] - 1);
	adjacentTiles[4] = id[0] + "-" + id[1];
	//For loop that cycles through the adjacent tiles, and changes their charge
	for (i = 0; i < 5; i++) {
		var adjtile = document.getElementById(adjacentTiles[i]);
		if (adjtile != null) {
			if (adjtile.className.includes("off")) adjtile.className = adjtile.className.replace("off", "on");
			else if (adjtile.className.includes("on")) adjtile.className = adjtile.className.replace("on", "off");
		}
	}
}