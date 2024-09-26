const player1Board = document.getElementById('player1-board');
const player2Board = document.getElementById('player2-board');

// Create a 10x10 grid for each player
let gridlength = 10;
for (let i = 0; i < gridlength; i++) {
  for (let j = 0; j < gridlength; j++) {
    const div = document.createElement('div');
    div.dataset.x = i;
    div.dataset.y = j;
    div.classList.add("square");
    
    const group = Math.floor(i / 10);
    const colorClass = group % 2 === 0 ? 'blue' : 'white';
    square.classList.add(colorClass);
    
    if (i < 10 && i % 2 === 0) {
        div.classList.add("stripe");
    } else if (i >= 11 && i % 2 === 1) {
        div.classList.add("stripe");
    }
    
    player1Board.appendChild(div);
    player2Board.appendChild(div.cloneNode(true));
  }
}

// Create an object to store ship information
const shipTypes = {
  carrier: { length: 5, orientation: 'horizontal', icon: 'carrier.png', color: 'blue', health: 5, isSunk: false },
  battleship: { length: 4, orientation: 'horizontal', icon: 'battleship.png', color: 'red', health: 4, isSunk: false },
  cruiser: { length: 3, orientation: 'horizontal', icon: 'cruiser.png', color: 'green', health: 3, isSunk: false },
  submarine: { length: 3, orientation: 'vertical', icon: 'submarine.png', color: 'yellow', health: 3, isSunk: false },
  destroyer: { length: 2, orientation: 'horizontal', icon: 'destroyer.png', color: 'orange', health: 2, isSunk: false }
};

// Function to place a ship on the board
function placeShip(board, x, y, length, orientation) {
  if (orientation === 'horizontal') {
    for (let i = 1; i < length; i++) {
      if (x + i >= 11) {
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

  function handleBoardClick(x, y, shipData) {
     // const x = event.target.dataset.x;
     // const y = event.target.dataset.y;
    // Try to place the ship at the clicked coordinates
    shipData = shipTypes[shipType];
    handleShipPlacement(shipType, x, y, shipData);
    if (placeShip(player1Board, x, y, length, shipData.orientation)) {
      // Ship placement successful
      shipDiv.remove();
      document.getElementById(shipType).disabled = true;

      // Create and show the popup
      const popup = document.createElement('div');
      popup.classList.add('popup', 'show');
      popup.innerHTML = `
        <h2>${shipType}</h2>
        <p>Ship placed successfully.</p>
        <button class="rotate-button">Rotate</button>
      `;
      document.body.appendChild(popup);

      // Add event listener to the rotate button
      const rotateButton = popup.querySelector('.rotate-button');
      rotateButton.addEventListener('click', () => {
        // Rotate the ship by 90 degrees
        if (shipData.orientation === 'horizontal') {
          shipData.orientation = 'vertical';
          shipDiv.style.transform = 'rotate(90deg)';
        } else {
          shipData.orientation = 'horizontal';
          shipDiv.style.transform = 'rotate(0deg)';
        }

        // Check if the rotated ship still fits within the board
        if (isValidPlacement(shipData, shipDiv.offsetLeft, shipDiv.offsetTop, length, shipData.orientation)) {
          // If valid, update the ship's position and show the popup
          placeShip(player1Board, shipDiv.offsetLeft, shipDiv.offsetTop, length, shipData.orientation);
        } else {
          // If invalid, rotate back to the original orientation and show an error message
          if (shipData.orientation === 'horizontal') {
            shipDiv.style.transform = 'rotate(0deg)';
          } else {
            shipDiv.style.transform = 'rotate(90deg)';
          }
          alert('Rotation not possible due to placement constraints.');
        }

        popup.classList.remove('show');
      });

      if (Object.values(shipTypes).every(ship => ship.placed)) {
        // All ships are placed, hide the menu and start the game
        document.getElementById('menu').style.display = 'none';
        aiMove();
      }
    } else {
      // Ship placement failed
      resetShipPosition(shipDiv);
    }
  }

// Function to handle player attacks
function handleClick(event) {
 
  // console.log(event.target); // Log the clicked element for debugging
   //const shipData = shipTypes[shipType];
  // Find the closest element with data-x and data-y attributes
  //const shipType = event.target.parentElement.id;
  const shipData = shipTypes[shipType];
  console.log('handleClick(event) shipData.orientation: ', shipData.orientation)
  if (!shipData || !shipData.orientation) {
    console.error('Invalid shipData or orientation');
    return;
  }
  console.log('handleClick(event) shipType:', shipType);
  console.log('handleClick(event) shipData:', shipData);
  const targetElement = event.target.closest('[data-x][data-y]');
  if (!targetElement) {
    console.error('Clicked element does not have data-x or data-y attributes');
    return;
  }

  const x = targetElement.dataset.x;
  const y = targetElement.dataset.y;
  console.log('handleClick(event) Clicked cell:', x, y);

  handleBoardClick(x, y, shipData);
 
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

// Function to handle ship placement (triggered by button click)

function handleShipPlacement(shipType, x, y) {
  const shipLength = shipTypes[shipType].length || null;
  console.log( 'handleShipPlacement shipType:', shipType);
  console.log( 'handleShipPlacement shipTypes[shipType]:', shipTypes[shipType]);
  console.log( 'handleShipPlacement shipTypes[shipType].length:', shipTypes[shipType].length);
  console.log( 'handleShipPlacement shipLength:', shipLength);
  let orientation = Math.random() < 0.5 ? 'horizontal' : 'vertical'; // Random orientation for now

  // Create a visual representation of the ship
  const shipDiv = document.createElement('div');
  shipDiv.classList.add('ship', shipType);
  shipDiv.style.position = 'absolute';
  shipDiv.style.left = `${30 * (x-1)}px`;
  shipDiv.style.top = `${30 * (y-1)}px`;
  shipDiv.style.width = `${shipLength * 30}px`; // Adjust multiplier based on grid cell size
  player1Board.appendChild(shipDiv);

  let isDragging = false;
  let initialX, initialY;

  // Event listeners for dragging and dropping the ship
  // shipDiv.addEventListener('mousedown', handleMouseDown);
  // shipDiv.addEventListener('touchstart', handleTouchStart);
  // shipDiv.addEventListener('mousemove', handleMouseMove);
  // shipDiv.addEventListener('touchmove', handleTouchMove);
  // shipDiv.addEventListener('mouseup', handleMouseUp);
  // shipDiv.addEventListener('touchend', handleTouchEnd);

   // Remove drag-related event listeners
  shipDiv.removeEventListener('mousedown', handleMouseDown);
  shipDiv.removeEventListener('touchstart', handleTouchStart);
  shipDiv.removeEventListener('mousemove', handleMouseMove);
  shipDiv.removeEventListener('touchmove', handleTouchMove);
  shipDiv.removeEventListener('mouseup', handleMouseUp);
  shipDiv.removeEventListener('touchend', handleTouchEnd);

// Add a click event listener to the game board
  player1Board.addEventListener('click', handleBoardClick);

  function resetShipPosition(shipDiv) {
    shipDiv.style.left = '';
    shipDiv.style.top = '';
  }

  function resetShipPosition(shipDiv) {
    shipDiv.style.left = '';
    shipDiv.style.top = '';
  }

  function handleMouseDown(event) {
    event.preventDefault();
    isDragging = true;
    initialX = event.clientX;
    initialY = event.clientY;
  }

  function handleTouchStart(event) {
    event.preventDefault();
    isDragging = true;
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

      shipDiv.style.left = `${shipDiv.offsetLeft + dx}px`;
      shipDiv.style.top = `${shipDiv.offsetTop + dy}px`;
    }
  }

  function handleTouchMove(event) {
    if (isDragging) {
      handleMouseMove(event);
    }
  }

  function handleTouchEnd(event) {
  isDragging = false;

  // Check if the ship is dropped within the game board
  if (isShipOverBoard(shipDiv, player1Board)) {
    // Try to place the ship on the board
    if (placeShip(player1Board, shipDiv.offsetLeft, shipDiv.offsetTop, shipLength, orientation)) {
      // Ship placement successful
      shipDiv.remove();
      document.getElementById(shipType).disabled = true;

      // Create and show the popup
      const popup = document.createElement('div');
      popup.classList.add('popup', 'show');
      popup.innerHTML = `
        <h2>${shipType}</h2>
        <p>Ship placed successfully.</p>
        <button class="rotate-button">Rotate</button>
      `;
      document.body.appendChild(popup);

      // Add event listener to the rotate button
      const rotateButton = popup.querySelector('.rotate-button');
      rotateButton.addEventListener('click', () => {
        // Rotate the ship by 90 degrees
        if (orientation === 'horizontal') {
          orientation = 'vertical';
          shipDiv.style.transform = 'rotate(90deg)';
        } else {
          orientation = 'horizontal';
          shipDiv.style.transform = 'rotate(0deg)';
        }

        // Check if the rotated ship still fits within the board
        if (isValidPlacement(shipData, shipDiv.offsetLeft, shipDiv.offsetTop, shipLength, orientation)) {
          // If valid, update the ship's position and show the popup
          placeShip(player1Board, shipDiv.offsetLeft, shipDiv.offsetTop, shipLength, orientation);
        } else {
          // If invalid, rotate back to the original orientation and show an error message
          if (orientation === 'horizontal') {
            shipDiv.style.transform = 'rotate(0deg)';
          } else {
            shipDiv.style.transform = 'rotate(90deg)';
          }
          alert('Rotation not possible due to placement constraints.');
        }

        popup.classList.remove('show');
      });

      if (Object.values(shipTypes).every(ship => ship.placed)) {
        // All ships are placed, hide the menu and start the game
        document.getElementById('menu').style.display = 'none';
        aiMove();
      }
    } else {
      // Ship placement failed
      resetShipPosition(shipDiv);
    }
  } else {
    // Ship dropped outside the board
    resetShipPosition(shipDiv);
  }
}

  function handleMouseUp(event) {
    isDragging = false;

    // Check if the ship is dropped within the game board
    if (isShipOverBoard(shipDiv, player1Board)) {
      // Try to place the ship on the board
      if (placeShip(player1Board, shipDiv.offsetLeft, shipDiv.offsetTop, shipLength, orientation)) {
        // Ship placement successful
        shipDiv.remove();
        document.getElementById(shipType).disabled = true;

        // Create and show the popup
        const popup = document.createElement('div');
        popup.classList.add('popup', 'show');
        popup.innerHTML = `
          <h2>${shipType}</h2>
          <p>Ship placed successfully.</p>
          <button class="rotate-button">Rotate</button>
        `;
        document.body.appendChild(popup);

        // Add event listener to the rotate button
        const rotateButton = popup.querySelector('.rotate-button');
        rotateButton.addEventListener('click', () => {
          // Rotate the ship by 90 degrees
          if (orientation === 'horizontal') {
            orientation = 'vertical';
            shipDiv.style.transform = 'rotate(90deg)';
          } else {
            orientation = 'horizontal';
            shipDiv.style.transform = 'rotate(0deg)';
          }

          // Check if the rotated ship still fits within the board
          if (isValidPlacement(shipData, shipDiv.offsetLeft, shipDiv.offsetTop, shipLength, orientation)) {
            // If valid, update the ship's position and show the popup
            placeShip(player1Board, shipDiv.offsetLeft, shipDiv.offsetTop, shipLength, orientation);
          } else {
            // If invalid, rotate back to the original orientation and show an error message
            if (orientation === 'horizontal') {
              shipDiv.style.transform = 'rotate(0deg)';
            } else {
              shipDiv.style.transform = 'rotate(90deg)';
            }
            alert('Rotation not possible due to placement constraints.');
          }

          popup.classList.remove('show');
        });

        if (Object.values(shipTypes).every(ship => ship.placed)) {
          // All ships are placed, hide the menu and start the game
          document.getElementById('menu').style.display = 'none';
          aiMove();
        }
      } else {
        // Ship placement failed
        resetShipPosition(shipDiv);
      }
    } else {
      // Ship dropped outside the board
      resetShipPosition(shipDiv);
    }
  }

  function resetShipPosition(shipDiv) {
    shipDiv.style.left = '';
    shipDiv.style.top = '';
  }
}

// Add event listeners to ship placement buttons
// document.getElementById('carrier').addEventListener('click', () => handleShipPlacement('carrier'));
// document.getElementById('battleship').addEventListener('click', () => handleShipPlacement('battleship'));
// document.getElementById('cruiser').addEventListener('click', () => handleShipPlacement('cruiser'));
// document.getElementById('submarine').addEventListener('click', () => handleShipPlacement('submarine'));
// document.getElementById('destroyer').addEventListener('click', () => handleShipPlacement('destroyer'));

// document.getElementById('carrier').addEventListener('click', (event) => {
//   handleShipPlacement('carrier', event.clientX, event.clientY);
// });

// document.getElementById('battleship').addEventListener('click', (event) => {
//   handleShipPlacement('battleship', event.clientX, event.clientY);
// });

// document.getElementById('cruiser').addEventListener('click', (event) => {
//   handleShipPlacement('cruiser', event.clientX, event.clientY);
// });

// document.getElementById('submarine').addEventListener('click', (event) => {
//   handleShipPlacement('submarine', event.clientX, event.clientY);
// });

// document.getElementById('destroyer').addEventListener('click', (event) => {
//   handleShipPlacement('destroyer', event.clientX, event.clientY);
// });

const shipButtons = document.querySelectorAll('.ship-button');

shipButtons.forEach(button => {
  button.addEventListener('click', (event) => {
    shipType = event.target.id;
   // handleShipPlacement(button.id, event.clientX, event.clientY, shipTypes[shipType]);
     // Optionally, highlight the selected ship button
    shipButtons.forEach(btn => btn.classList.remove('selected'));
    event.target.classList.add('selected');
  });
});



// Add event listeners to both boards
player1Board.addEventListener('click', handleClick);
player2Board.addEventListener('click', handleClick);
// player1Board.addEventListener('click', handleClick.bind(null, handleBoardClick));
// player2Board.addEventListener('click', handleClick.bind(null, handleBoardClick));

//player1Board.addEventListener('click', handleShipPlacement);
// ... (existing code)

// Create grid labels - letters
const gridLabels = document.createElement('div');
gridLabels.classList.add('grid-labels');

for (let i = 0; i < 10; i++) {
  const label = document.createElement('div');
  label.classList.add('grid-label');
  label.textContent = String.fromCharCode(65 + i); // A-J
  gridLabels.appendChild(label);
}

// Create row labels - numbers
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
