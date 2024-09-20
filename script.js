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

// Place ships for both players
placeShip(player1Board, 2, 2, 4, 'horizontal');
placeShip(player1Board, 5, 7, 3, 'vertical');
// ... (place other ships)
placeShip(player2Board, 3, 3, 5, 'horizontal');
// ... (place other ships)

// Start the AI player's turn
aiMove();

// Add event listeners to both boards
player1Board.addEventListener('click', handleClick);
player2Board.addEventListener('click', handleClick);
