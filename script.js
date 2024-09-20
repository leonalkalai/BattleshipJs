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
  const length = shipTypes[shipType].length || null;
  console.log(shipTypes, shipTypes[shipType], shipTypes[shipType].length, length);
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

  // Create and show the popup
  const popup = document.createElement('div');
  popup.classList.add('popup');
  popup.innerHTML = `
    <h2>${shipType}</h2>
    <p>Ship placed successfully.</p>
    <button class="rotate-button">Rotate</button>
  `;
  document.body.appendChild(popup);

  // Add event listener to the rotate button
  const rotateButton = popup.querySelector('.rotate-button');
  rotateButton.addEventListener('click', () => {
    // Implement ship rotation logic here
    // ...
    popup.classList.remove('show');
  });
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
// ... (existing code)

// Add event listeners to each ship
const ships = document.querySelectorAll('.ship');
ships.forEach(ship => {
  ship.addEventListener('mousedown', handleMouseDown);
  ship.addEventListener('touchstart', handleTouchStart);
  ship.addEventListener('mousemove', handleMouseMove);
  ship.addEventListener('touchmove', handleTouchMove);
  ship.addEventListener('mouseup', handleMouseUp);
  ship.addEventListener('touchend', handleTouchEnd);
});

let isDragging = false;
let currentShip;
let initialX, initialY;

function handleMouseDown(event) {
  event.preventDefault();
  isDragging = true;
  currentShip = event.target;
  initialX = event.clientX;
  initialY = event.clientY;
}

function handleTouchStart(event) {
  event.preventDefault();
  isDragging = true;
  currentShip = event.target;
  initialX = event.touches[0].clientX;
  initialY = event.touches[0].clientY;
}

function handleMouseMove(event) {
  if (isDragging) {
    event.preventDefault();
    const currentX = event.clientX || event.touches[0].clientX;
    const currentY = event.clientY || event.touches[0].clientY;
    const dx = currentX - initialX;
    const dy = currentY - initialY;

    currentShip.style.left = `${currentShip.offsetLeft + dx}px`;
    currentShip.style.top = `${currentShip.offsetTop + dy}px`;
  }
}

function handleTouchMove(event) {
  if (isDragging) {
    handleMouseMove(event);
  }
}

function handleMouseUp(event) {
  isDragging = false;

  // Check if the ship is dropped within the game board
  if (isShipOverBoard(currentShip, player1Board)) {
    // Try to place the ship on the board
    if (placeShipOnBoard(shipTypes[currentShip.id], currentShip, player1Board)) {
      // Ship placement successful
      currentShip.removeEventListener('mousedown', handleMouseDown);
      currentShip.removeEventListener('touchstart', handleTouchStart);
      currentShip.removeEventListener('mousemove', handleMouseMove);
      currentShip.removeEventListener('touchmove', handleTouchMove);
      currentShip.removeEventListener('mouseup', handleMouseUp);
      currentShip.removeEventListener('touchend', handleTouchEnd);
      currentShip.classList.add('placed'); // Visually indicate placed ship
      currentShip.style.position = 'static'; // Remove absolute positioning

      // Switch to the next player's turn
      currentPlayer = currentPlayer === 1 ? 2 : 1;
      updateTurnDisplay(); // Update UI to show the next player's turn (if applicable)
    } else {
      // Ship placement failed (e.g., collision, out of bounds, etc.)
      resetShipPosition(currentShip);
    }
  } else {
    // Ship dropped outside the board
    resetShipPosition(currentShip);
  }
}

// ... (rest of your code)


// Append labels to boards
player1Board.appendChild(gridLabels.cloneNode(true));
player1Board.appendChild(rowLabels.cloneNode(true));
player2Board.appendChild(gridLabels.cloneNode(true));
player2Board.appendChild(rowLabels.cloneNode(true));
