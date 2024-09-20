const player1Board = document.getElementById('player1-board');
const player2Board = document.getElementById('player2-board');

// Create a 10x10 grid for each player
for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    const div = document.createElement('div');
    div.dataset.x = i;
    div.dataset.y = j;
    player1Board.appendChild(div);
    player2Board.appendChild(div.cloneNode(true));
  }
}

// Create an object to store ship information
const shipTypes = {
  carrier: { length: 5 },
  battleship: { length: 4 },
  cruiser: { length: 3 },
  submarine: { length: 3 },
  destroyer: { length: 2 }
};

// Function to place a ship on the board
function placeShip(board, x, y, length, orientation) {
  if (orientation === 'horizontal') {
    for (let i = 0; i < length; i++) {
      if (x + i >= 10) {
        return false; // Invalid placement
      }
      const div = board.querySelector(`[data-x="${x + i}"][data-y="${y}"]`);
      if (div.classList.contains('ship')) {
        return false; // Invalid placement
      }
      div.classList.add('ship');
    }
  } else {
    // ... (implement vertical ship placement)
  }
  return true;
}

// Function to handle player attacks
function handleClick(event) {
  const x = event.target.dataset.x;
  const y = event.target.dataset.y;
  const targetBoard = event.target.parentNode;

  if (targetBoard.classList.contains('hit') || targetBoard.classList.contains('miss')) {
    return; // Already attacked
  }

  if (targetBoard.querySelector(`[data-x="${x}"][data-y="${y}"]`).classList.contains('ship')) {
    event.target.classList.add('hit');
    checkWin(targetBoard);
  } else {
    event.target.classList.add('miss');
  }
}

// Function to check for a win
function checkWin(board) {
  const ships = board.querySelectorAll('.ship');
  if (ships.length === 0) {
    alert('Game over! You win!');
  }
}

// Function for the AI player to make a random move
function aiMove() {
  const x = Math.floor(Math.random() * 10);
  const y = Math.floor(Math.random() * 10);
  const targetDiv = player1Board.querySelector(`[data-x="${x}"][data-y="${y}"]`);
  if (targetDiv.classList.contains('hit') || targetDiv.classList.contains('miss')) {
    aiMove(); // Try again if already attacked
  } else {
    handleClick({ target: targetDiv });
  }
}

// Function to handle ship placement
function placeShip(shipType) {
  const length = shipTypes[shipType].length;
  let orientation = Math.random() < 0.5 ? 'horizontal' : 'vertical';
  let x, y;

  do {
    x = Math.floor(Math.random() * 10);
    y = Math.floor(Math.random() * 10);
  } while (!placeShip(player1Board, x, y, length, orientation));

  // Remove the button from the menu
  document.getElementById(shipType).disabled = true;

  if (Object.values(shipTypes).every(ship => ship.placed)) {
    // All ships are placed, hide the menu and start the game
    document.getElementById('menu').style.display = 'none';
    aiMove();
  }
}

// Add event listeners to ship placement buttons
document.getElementById('carrier').addEventListener('click', () => placeShip('carrier'));
document.getElementById('battleship').addEventListener('click', () => placeShip('battleship'));
document.getElementById('cruiser').addEventListener('click', () => placeShip('cruiser'));
document.getElementById('submarine').addEventListener('click', () => placeShip('submarine'));
document.getElementById('destroyer').addEventListener('click', () => placeShip('destroyer'));

// Add event listeners to both boards
player1Board.addEventListener('click', handleClick);
player2Board.addEventListener('click', handleClick);

// ... (existing code)

// Create grid labels
const gridLabels = document.createElement('div');
gridLabels.classList.add('grid-labels');

for (let i = 0; i < 10; i++) {
  const label = document.createElement('div');
  label.classList.add('grid-label');
  label.textContent = String.fromCharCode(65 + i); // A-J
  gridLabels.appendChild(label);
}

// Create row labels
const rowLabels = document.createElement('div');
rowLabels.classList.add('row-labels');

for (let i = 0; i < 10; i++) {
  const label = document.createElement('div');
  label.classList.add('grid-label');
  label.textContent = i + 1;
  rowLabels.appendChild(label);
}

// ... (existing code)


// Append labels to boards
player1Board.appendChild(gridLabels.cloneNode(true));
player1Board.appendChild(rowLabels.cloneNode(true));
player2Board.appendChild(gridLabels.cloneNode(true));
player2Board.appendChild(rowLabels.cloneNode(true));
