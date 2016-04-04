//Variables
var tablesize = 0;
var isResetting = false;
var isEnd = false;

//starts the game
function startGame(size) {
	tablesize = size;
	createTiles(size);
}

//resets the game
function restartGame() {
	//rotates restart button
	var restartimg = document.getElementById("restartimg")
	restartimg.className = "rotate";
	window.setTimeout(function() {
		//resets end game stuff
		isEnd = false;
		document.getElementById("gametable").className = "";
		document.getElementById("end").className = "notend";
		
		//resets board
		randomizer();
		restartimg.className = "norotate";
	}, 250);
}

//creates a new game when the player start one from the setting panel
function newGame(size) {
	//reset the tiles/table and score
	document.getElementById("gametable").innerHTML = "";
	document.getElementById("best").innerHTML = document.getElementById("best").innerHTML.split("<br>")[0] + "<br>" + 0;
	//make sure 'game over' screen is not showing
	isEnd = false;
	document.getElementById("end").className = "notend";
	document.getElementById("gametable").className = "";
	//starts a new game
	startGame(size);
}

//This function creates the table, which contains the tiles
function createTiles(size) {
	var table = document.getElementById("gametable");
	for (var i = 0; i < size; i++) {
		var row = table.insertRow(i);
		for (var j = 0; j < size; j++) {
			var cell = row.insertCell(j);
			cell.innerHTML = "<div class='tile off' id='" + i + "-" + j + "' onclick='tileClicked(this);'>";
		}
	}
	randomizer();
}

//randomizes the board
function randomizer() {
	isResetting = true;
	for (var i = 0; i < 20; i++) {
		x = parseInt(Math.random() * tablesize);
		y = parseInt(Math.random() * tablesize);
		tileClicked(document.getElementById(x + "-" + y));
	}
	isResetting = false;
}

//Function executed when tile is clicked on
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
	for (var i = 0; i < 5; i++) {
		var adjtile = document.getElementById(adjacentTiles[i]);
		if (adjtile != null) {
			if (adjtile.className.includes("off") && !isEnd) adjtile.className = adjtile.className.replace("off", "on");
			else if (adjtile.className.includes("on") && !isEnd) adjtile.className = adjtile.className.replace("on", "off");
		}
	}
	
	//Score - Adds to score everytime a tile is clicked
	if (!isResetting && !isEnd) {
		var score_element = document.getElementById("score").innerHTML;
		var score = parseInt(score_element.split("<br>")[1]) + 1;
		document.getElementById("score").innerHTML = score_element.split("<br>")[0] + "<br>" + score;
	} else if (isResetting) {
		document.getElementById("score").innerHTML = document.getElementById("score").innerHTML.split("<br>")[0] + "<br>" + 0;
	}
	
	//End Game Logic
	var off_tiles = 0, on_tiles = 0;
	for (var i = 0; i < tablesize; i++) {
		for (var j = 0; j < tablesize; j++) {
			var ijtile = document.getElementById(i + "-" + j);
			if (ijtile.className.includes("on")) on_tiles += 1;
			else if (ijtile.className.includes("off")) off_tiles += 1;
			
			if (off_tiles > 0 && on_tiles > 0) return;
		}
	}
	
	//If code gets to this point, the board has been cleared and the user has won the game
	//checks if score is best score
	var score = parseInt(document.getElementById("score").innerHTML.split("<br>")[1]);
	var best = parseInt(document.getElementById("best").innerHTML.split("<br>")[1]);
	if (score < best || best == 0 && !isResetting) document.getElementById("best").innerHTML = document.getElementById("best").innerHTML.split("<br>")[0] + "<br>" + score;
	//Shows end game screen
	document.getElementById("gametable").className = "fadeOut";
	document.getElementById("end").className = "end";
	isEnd = true;
}

//Dropdown Button logic
/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
var isDropDownOn = false;
function triggerDropDownButton() {
	//If settings button isn't activated, activate it. If not, deactivate it.
	if (!isDropDownOn) {
		document.getElementById("myDropdown").classList.toggle("show");
		document.getElementById("header-top").style.marginLeft = "123px";
		document.getElementById("settings").className = document.getElementById("settings").className.replace("not", "");
		isDropDownOn = true;
	} else {
		stopDropDownButton();
		isDropDownOn = false;
	}
}

function stopDropDownButton() {
	//unshow the settings list
	var dropdowns = document.getElementsByClassName("dropdown-content");
	for (var i = 0; i < dropdowns.length; i++) {
		var openDropdown = dropdowns[i];
		if (openDropdown.classList.contains('show')) {
			openDropdown.classList.remove('show');
		}
	}
	//reset the settings button
	document.getElementById("header-top").style.marginLeft = "0px";
	document.getElementById("settings").className = document.getElementById("settings").className.replace("_", "_not");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
	//return if settings button is already on
	if (!isDropDownOn) return;
	
	if (!event.target.matches('.dropBtn')) {
		//hide the dropdown menu
		stopDropDownButton();
		isDropDownOn = false;
	}
}