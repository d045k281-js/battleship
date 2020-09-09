const ROWS = 10;
const COLS = 10;

class Board {
	constructor(rows, cols, numShip) {
		this.ships = [];
		this.cells = [];
		this.numShips = numShip;

		this.shipSpaces = 0; //Testing this idea
		
		for (let row = 0; row < rows; row++) {
			this.cells[row] = [];
			for (let col = 0; col < cols; col++) {
				this.cells[row][col] = new Space(col, row);
			}
		}
	}

	/**
	* @param table The DOM element to render the board to
	* @param showShips Boolean for whether all ship locations should be visible
	* @param executive Object to use the clickSpace method of
	* @param final Boolean for whether the game is already won
	**/
	render(table, showShips, executive, final) {
		table.innerHTML = ""; // Remove any existing cells

		// Add letter row
		let letter = 'A';
		let tr = document.createElement("tr");
		let th = document.createElement("th");
		tr.appendChild(th);
		for (let cell of this.cells[0]) {
			let th = document.createElement("th");
			th.innerText = letter;
			tr.appendChild(th);
			letter = String.fromCharCode(letter.charCodeAt(0) + 1); // Increment letter
		}
		table.appendChild(tr);

		let num = 1;
		for (let row of this.cells) {
			let tr = document.createElement("tr");

			// Add number column
			let th = document.createElement("th");
			th.innerText = num;
			tr.appendChild(th);
			num++;

			for (let cell of row) {
				let td = document.createElement("td");
				if (showShips && cell.hasShip) td.classList.add("ship");
				if (cell.isHit && !cell.hasShip) td.classList.add("miss");
				if (cell.isHit && cell.hasShip) td.classList.add("hit");
				if (!final) {
					td.addEventListener("click", e =>{
						if (cell.hasShip) { //Testing this idea
							this.shipSpaces--;
							this.checkWin(executive);
						}
						executive.clickSpace(cell,!showShips)
					}); 
				}
				tr.appendChild(td);
			}
			table.appendChild(tr);
		}
	}

	// TODO: Validate coordinates are within bounds of board
	placeShip(length, row, col, isVertical) {
		let ship = new Ship(length, row, col, isVertical);
		this.ships.push(ship);

		this.shipSpaces = this.shipSpaces + length; //Testing this idea

		let coords = ship.listIntersecting();
		for (let coord of coords) {
			this.cells[coord[0]][coord[1]].hasShip = true;
		}
	}

	// Currently unused
	attack(row, col) {
		this.cells[row][col].isHit = true;
		this.checkWin();
	}

	checkWin(executive) {
		if ((this.shipSpaces == 0)){
			alert("You win!") //Improve: Say which player won
			executive.renderBothBoards(); //FIX: doesnt render both
		}
	}
}




		/*for (let Ship of this.ships) {
			let sunked = 0;
			if (this.ships[Ship].isSunked == true) {
				sunked++;
			}
			if (sunked == this.numShips) {
				alert("You win!") //Improve: Say which player won
				return(win);
			}
		}*/