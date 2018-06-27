// set grid rows and columns and the size of each square
var rows = 10;
var cols = 10;
var squareSize = 50;
//ship sizes object
var shipSize = {
	patrolBoat: 2,
	destroyer: 3,
	submarine: 3,
	battleship: 4,
	carrier: 5
	};
var totalHitsToWin = 0;
//variable for tracking the hitcount (17 hits = win)
var hitCount = 0;
//Initializing empty board
var gameBoard = [
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0]
				];

// get the container element
var gameBoardContainer = document.getElementById("gameboard");

createGrid();
getTotalHitsForWin();
placeShips();

// set event listener for all elements in gameboard, run fireTorpedo function when square is clicked
gameBoardContainer.addEventListener("click", fireTorpedo, false);

function createGrid(){
	gameBoardContainer.innerHTML = "";
	for (i = 0; i < cols; i++) {
	for (j = 0; j < rows; j++) {
		
		// create a new div HTML element for each grid square and make it the right size
		var square = document.createElement("div");
		gameBoardContainer.appendChild(square);

    // give each div element a unique id based on its row and column, like "s00"
		square.id = 's' + j + i;			
		
		// set each grid square's coordinates: multiples of the current row or column number
		var topPosition = j * squareSize;
		var leftPosition = i * squareSize;			
		
		// use CSS absolute positioning to place each grid square on the page
		square.style.top = topPosition + 'px';
		square.style.left = leftPosition + 'px';						
		}
	}
}

function fireTorpedo(e) {
	if (e.target !== e.currentTarget) {
		var row = e.target.id.substring(1,2);
		var col = e.target.id.substring(2,3);
				
		// if player clicks a square with no ship, change the color and change square's value
		if (gameBoard[row][col] == 0) {
			e.target.style.background = '#bbb';
			gameBoard[row][col] = 3;
			
		// if player clicks a square with a ship, change the color and change square's value
		} else if (gameBoard[row][col] == 1) {
			e.target.style.background = 'red';
			gameBoard[row][col] = 2;
			
			// increment hitCount each time a ship is hit
			hitCount++;
			if (hitCount == totalHitsToWin) {
				alert("All enemy battleships have been defeated! You win!");
			}
			
		// if player clicks a square that's been previously hit, let them know
		} else if (gameBoard[row][col] > 1) {
			alert("Stop wasting your torpedos! You already fired at this location.");
		}		
    }
    e.stopPropagation();
}

function placeShips(){
	var startPointl;
	var startPoint2;
	var orientation;
	var isShipDeployed = false;
	for (var key in shipSize) {
		isShipDeployed = false;
		while(!isShipDeployed){
		if (shipSize.hasOwnProperty(key)) {
			startPoint1 = randomStartingPoint(0, 9);
			startPoint2 = randomStartingPoint(0, 9);
			orientation = randomOrientation();
			if(isPlacementPossible(orientation, startPoint1, startPoint2, shipSize[key])){
				switch(orientation){
					case 1:
					for(var i=0; i<shipSize[key]; i++){
						gameBoard[startPoint1 + i][startPoint2] = 1;
					}
					isShipDeployed = true;
					break;
					case 2:
					for(var i=0; i<shipSize[key]; i++){
						gameBoard[startPoint1][startPoint2 + i] = 1;
					}
					isShipDeployed = true;
					break;
					}
				} 
			}
		}
	}
}

function randomStartingPoint(min, max){
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

//getting the orientation for a ship randomly (1 for horizontal, 2 for vertical)
function randomOrientation(){
	return Math.floor(Math.random() * (2 - 1 + 1)) + 1;
}

function isPlacementPossible(orient, startPoint1, startPoint2, size){
	var flag = true;
	switch(orient) {
		case 1:
		if(gameBoard[startPoint1][startPoint2] != 0 || startPoint1 + size > rows){
			flag = false;
			return false;
		} else {
			for(var i=1; i<size; i++){
				if(gameBoard[startPoint1 + i][startPoint2] != 0) {
					flag = false;
					return false;
					}
			}
			if(flag = true) {return true;}
		}
		break;
		case 2:
		if(gameBoard[startPoint1][startPoint2] != 0 || startPoint1 + size > cols){
			flag = false;
			return false;
		} else {
			for(var i=1; i<size; i++){
				if(gameBoard[startPoint1][startPoint2 + i] != 0) {
					flag = false;
					return false;
					}
			}
			if(flag = true) {return true;}
		}
		break;
	}
}

function newGame(){
	createGrid();
	var gameBoard = [
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0]
				];
	placeShips();
	alert("You have started a new game! Good luck!");
}

function getTotalHitsForWin(){
	for (var key in shipSize) {
		if (shipSize.hasOwnProperty(key)) {
			totalHitsToWin += shipSize[key];
		}
	}
}