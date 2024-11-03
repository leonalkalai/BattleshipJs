const playerGrid = document.getElementById("player-grid");
const computerGrid = document.getElementById("computer-grid");
const shipsTableContainer = document.querySelector('#ships-table-container');
const startButton = document.getElementById("start-button");
const restartButton =document.getElementById("restart-button");
const message = document.getElementById("message");
const turnIndicator = document.getElementById("turn-indicator");
const toggleRotateButton = document.getElementById("toggle-rotate");

const gridSize = 10;
const shipSizes = [5, 4, 3, 3, 2]; // Carrier, Battleship, Cruiser, Submarine, Destroyer
const shipNames = [
  "carrier",
  "battleship",
  "cruiser",
  "submarine",
  "destroyer",
];

let playerShips = [];
let computerShips = [];
let computerMoves = [];
let gameStarted = false;
let currentShipIndex = 0; // Tracks which ship you're placing
let playerTurn = true; // True if it's player1's turn, false for computer
let isHorizontal = true; // Track ship orientation
let computerGuesses = [];
let playerGuesses = [];


restartButton.addEventListener("click", restartGame);

function clearGrid(gridElement) {
  gridElement.innerHTML='';
}

function removeElements(elements) {
  document.querySelectorAll(elements).forEach(el => {
    el.remove();
  });
}

function createGame(){
  turnIndicator.classList.remove("ready");
  createGrid(playerGrid);
  createGrid(computerGrid);
  playerGrid.classList.add("pending");
  computerGrid.classList.add("pending");
  playerGrid.classList.add("waiting");
  computerGrid.classList.add("waiting");
  createGridTitles();
  createShipsTables();
}

// Initialize game
function init() {
  placePlayerShips();
  startButton.addEventListener("click", startGame);
  toggleRotateButton.classList.add("ready");
  toggleRotateButton.addEventListener("click", toggleShipRotation);
}

function resetVariables() {
  // Reset ships and other game variables
  playerShips = [];
  computerShips = [];
  computerMoves = [];
  gameStarted = false;
  currentShipIndex = 0; // Tracks which ship you're placing
  playerTurn = true; // True if it's player1's turn, false for computer
  isHorizontal = true; // Track ship orientation
  computerGuesses = [];
  playerGuesses = [];
}


function restartGame() {


  resetVariables(); // Reset all variables at the beginning of a new game

  restartButton.classList.remove("ready");
  startButton.classList.remove("ready");
  
  message.textContent = "Place your ships";
  message.className = '';
  // Clear the game grids for player and computer
  clearGrid(playerGrid);
  clearGrid(computerGrid);
  shipsTableContainer.innerHTML='';
  removeElements('.grid-labels');
  removeElements('.column-container');
  removeElements('.gridh2container');
 


  createGame();
  init();
}



function createShipsTables(){
  for(let i=1;i<3;i++){
     const playerChecker = i === 1 ? 'player' : 'enemy';
     // Create a row container
     const row = document.createElement('div');
     row.classList.add('row');

      // Create header for player ships
     const playerShipsHeader = document.createElement('div');
     const playerShipsHeaderText = document.createElement('h2');
     playerShipsHeaderText.textContent = `Player ${i} Ships`;
     playerShipsHeader.appendChild(playerShipsHeaderText);
     row.appendChild(playerShipsHeader);

     // Create player ships list container
     const playerShipsList = document.createElement('div');
     playerShipsList.classList.add('player-ships-list');

     // Create the table and set a unique ID for each player
     const playerShipsTable = document.createElement('table');
     playerShipsTable.setAttribute('id',`${ playerChecker }-ships-list`);

     // Create table header row
     const trh = document.createElement('tr');
     const th1 = document.createElement('th');
     const th2 = document.createElement('th');
     th1.textContent = 'Ship';
     th2.textContent = 'Status';
     trh.appendChild(th1);
     trh.appendChild(th2);
     playerShipsTable.appendChild(trh);

    // Populate ship rows
     const trs = {};
     shipNames.forEach((name) => {

      trs[`tr-${name}`] = document.createElement('tr');

      // Add the icon to the status cell
      const img = document.createElement('img');
      img.src = `./images/icons/${name}.svg`;
      img.alt = name;

       const td1 = document.createElement('td');
       td1.setAttribute('id',`${playerChecker}-ship-${name}-name`);
       td1text = name.charAt(0).toUpperCase() + name.slice(1); // capitalize 
       td1.appendChild(img);
       td1.insertAdjacentHTML('afterbegin', td1text );


       const td2 = document.createElement('td');
       td2.setAttribute('id',`${playerChecker}-ship-${name}-status`);
       td2.textContent = 'Not Placed';


       // Append cells to the row
       trs[`tr-${name}`].appendChild(td1);
       trs[`tr-${name}`].appendChild(td2);
       playerShipsTable.appendChild(trs[`tr-${name}`]);
    });

    // Append the player ships table to the list container
    playerShipsList.appendChild(playerShipsTable);
    row.appendChild(playerShipsList);
    
    // Append the row to the main ships table container
    shipsTableContainer.appendChild(row);
   
  }
  

}


// Function to check if each ship type is destroyed
function checkShipDestroyed(shipsArray) {

   const playerBoardString = shipsArray[0].parentElement.getAttribute("id"); // find player 
   const playerBoard = playerBoardString.replace('-grid','-ships-list');
   const chosenPlayerBoard = document.querySelector(`${playerBoard === 'computer-ships-list' ? '#enemy-ships-list' : '#player-ships-list'}`); 
   
  const playerBoardObject = playerBoardString.replace('-grid','');
  const destroyedShipStatusName = `${ playerBoardObject}DestroyedShipStatus`;
  // Group ships by type inside the function
  const ships = {};

  // Create a parent object to hold the dynamic key
  const destroyedShipStatus = {};

  // Object to hold the destruction status of each ship
  destroyedShipStatus[destroyedShipStatusName] = {};

  shipNames.forEach((name) => {
    ships[name] = shipsArray.filter((element) => element.classList.contains(name));
    destroyedShipStatus[`${name}`] = ships[name].every((cell) => cell.classList.contains("hit"));
    if (destroyedShipStatus[name]){

      const boardSelector = `${playerBoard === 'computer-ships-list' ? 'enemy' : 'player'}`
      const boardSelectorShipName = document.querySelector(`#${boardSelector}-ship-${name}-name`);
      //const boardSelectorShipImage = document.querySelector(`#${boardSelector}-ship-${name}-name > img`);
      boardSelectorShipName.classList.add("flames");
      const boardSelectorShipNameStatus = document.querySelector(`#${boardSelector}-ship-${name}-status`);
      boardSelectorShipName.style.textDecoration = "line-through";
      boardSelectorShipNameStatus.innerHTML= "<img src='./images/skull-and-crossbones.svg' alt='cruiser'><span>Destroyed</span>";
      console.log(boardSelector + '_' + name + ' is destroyed');
    }
  });

  //console.log(shipsArray)


  //console.log(chosenPlayerBoard);
  
  // Log the status of each ship type
  console.log(destroyedShipStatus);



  return destroyedShipStatus;
}



// Generate grid titles
function createGridTitles() {
  const grids = document.querySelectorAll(".grid-container");
  grids.forEach((grid, index) => {
    gridTitle = grid.querySelector("h2");
    gridTitle.textContent = `Player ${index + 1} (${
      index === 1 ? "AI" : "human"
    })`;
    gridTitle.classList.add(`${index === 1 ? "ai" : "human"}`);
  });
}

// Generate a grid for players
function createGrid(gridElement) {
  for (let index = 0; index < gridSize * gridSize; index++) {
    const cell = document.createElement("div");
    cell.dataset.index = index; // Store the index for reference

    cell.classList.add("square");
    let row = cell.dataset.index[0];
    let column =
      cell.dataset.index < 10 ? cell.dataset.index[0] : cell.dataset.index[1];
    //console.log(row, column);

    if (cell.dataset.index.length === 1) {
      if (row % 2 === 1) {
        cell.classList.add("stripe");
      } else {
        cell.classList.add("white");
      }
    } else if (row % 2 === 1) {
      // If the group is odd
      if (column % 2 === 1) {
        // If the index is odd
        //console.log(`if the group ${group} is odd and index ${j} is odd`)
        cell.classList.add("blue"); // Add the "blue" class
        // div.classList.remove('white', 'stripe'); // Remove the "white" and "stripe" classes
      } else {
        // If the index is even
        //console.log(`if the group ${group} is odd and index ${j} is even`)
        cell.classList.add("stripe"); // Add the "stripe" class
        //div.classList.remove('blue', 'white'); // Remove the "blue" and "white" classes
      }
    } else {
      // If the group is even
      if (column % 2 === 1) {
        // If the index is odd
        // console.log(`if the group ${group} is even and index ${j} is odd`)
        cell.classList.add("stripe"); // Add the "stripe" class
        //div.classList.remove('blue', 'white'); // Remove the "blue" and "white" classes
      } else {
        // If the index is even
        cell.classList.add("white"); // Add the "white" class
        //console.log(`if the group ${group} is even and index ${j} is even`)
        // div.classList.remove('blue', 'stripe'); // Remove the "blue" and "stripe" classes
      }
    }

    gridElement.appendChild(cell);
  }

  // Create grid labels - letters
  const gridLabels = document.createElement("div");
  gridLabels.classList.add("grid-labels");
  gridLabels.classList.add("grid");

  for (let i = 0; i < 10; i++) {
    const label = document.createElement("div");
    label.classList.add("grid-label");
    label.textContent = String.fromCharCode(65 + i); // A-J
    gridLabels.appendChild(label);
  }

  // Create row labels - numbers
  const rowLabels = document.createElement("div");
  rowLabels.classList.add("row-labels");

  for (let i = 0; i < 11; i++) {
    const label = document.createElement("div");
    label.classList.add("grid-label");
    label.textContent = i === 0 ? "" : i;
    rowLabels.appendChild(label);
  }

  const columnContainer = document.createElement("div");
  columnContainer.classList.add("column-container");
  columnContainer.classList.add("container");
  gridElement.parentElement.insertBefore(columnContainer, gridElement);

  gridElement.parentElement.prepend(gridLabels);
  gridElement.previousSibling.appendChild(rowLabels);

  // Create board title
  const gridh2container = document.createElement("div");
  gridh2container.classList.add("gridh2container");
  const gridh2image = document.createElement("img");
  gridh2image.src = `./images/${gridElement.id}.svg`;
  gridh2image.classList.add("gridh2image");
  const gridTitle = document.createElement("h2");
  gridh2container.appendChild(gridh2image);
  gridh2container.appendChild(gridTitle);
  gridElement.parentElement.appendChild(gridh2container);
  //gridElement.parentElement.appendChild(gridTitle);
}

// Toggle ship rotation
function toggleShipRotation() {
  isHorizontal = !isHorizontal; // Toggle between horizontal and vertical
  const orientationMessage = isHorizontal ? "Horizontal" : "Vertical";
  message.textContent = `orientation: ${orientationMessage}`;
}

// Allow Player to place ships
function placePlayerShips() {
  message.textContent = "Place your ships";
  playerGrid.childNodes.forEach((cell) => {
    cell.addEventListener("click", handleGridClick);
    cell.addEventListener("touchstart", handleGridClick);
  });
}

// Handle grid click/touch for player ship placement
function handleGridClick(event) {
  event.preventDefault();
  const target = event.target;

  if (currentShipIndex < shipSizes.length) {
    const index = parseInt(target.dataset.index);
    const size = shipSizes[currentShipIndex];
    const shipClass = shipNames[currentShipIndex];

    if (canPlaceShip(index, size, playerGrid)) {
      playerGrid.classList.remove("pending");
      playerGrid.classList.remove("waiting");
      placeShip(index, size, shipClass, playerGrid);
      message.classList.remove("alarm");
      message.innerHTML = `${shipClass} added`;
      updateShipStatus(currentShipIndex);
      currentShipIndex++; // Move to the next ship
    } else {
      message.classList.add("alarm");
      message.innerHTML = `
      Can't place ship. </br> 
      Try another location.
      `;
    }
  }

  // Check if all ships are placed
  if (currentShipIndex === shipSizes.length) {
    // Add a timeout to show the message after a brief delay
    setTimeout(() => {
      message.innerHTML = `
      All ships placed. </br> 
      Click 'Start Game'!
      `;
      startButton.classList.add("ready");
      startButton.disabled = false; // Enable start button

      // Remove the rotate button after placing all ships
     // toggleRotateButton.style.display = "none"; // Hide the rotate button
      toggleRotateButton.classList.remove('ready');
    }, 1500); // 1500 milliseconds (1.5 seconds) delay
  }
}

// Check if a ship can be placed at the given index
function canPlaceShip(startIndex, size, grid) {
  for (let i = 0; i < size; i++) {
    const index = isHorizontal ? startIndex + i : startIndex + i * gridSize;
    // Check if the index is out of bounds or already occupied
    if (
      index >= gridSize * gridSize ||
      grid.childNodes[index].classList.contains("ship")
    ) {
      return false; // Ship cannot be placed
    }
    // Check if the ship is being placed in the last row when horizontal
    if (isHorizontal && (startIndex % gridSize) + size > gridSize) {
      return false; // Ship goes out of bounds horizontally
    }
  }
  return true; // Ship can be placed
}

// Place the ship on the grid and track the ship's cells
function placeShip(startIndex, size, shipClass, grid) {
  const shipCells = [];
  for (let i = 0; i < size; i++) {
    const index = isHorizontal ? startIndex + i : startIndex + i * gridSize;
    //grid.childNodes[index].className = "";
    grid.childNodes[index].classList.add("ship", shipClass);
    grid.childNodes[index].classList.add(
      `${isHorizontal ? "horizontal" : "vertical"}`
    );
    shipCells.push(grid.childNodes[index]);
  }

  // Track ships for both player and AI
  if (grid === playerGrid) {
    playerShips.push(...shipCells); // Track player ships
  } else if (grid === computerGrid) {
    computerShips.push(...shipCells); // Track AI ships
  }
}

// Update the ship status and strike-through ship name
function updateShipStatus(shipIndex) {
  const shipId = `player-ship-${shipNames[shipIndex]}-status`;
  //const shipStatusIds = ['carrier-status', 'battleship-status', 'cruiser-status', 'submarine-status', 'destroyer-status'];
  const shipStatusCell = document.getElementById(shipId);


  shipStatusCell.textContent = ""; // Set status to "Placed" without strikethrough

  // Add the checkmark icon to the placed ship
  const img = document.createElement('img');
  img.src = `./images/checkmark-icon.svg`;
  img.alt = 'checkmark';
  img.classList.add("checkmark");

  const shipStatusCellText = document.createElement('span');
  shipStatusCellText.textContent = "Placed";
  shipStatusCell.appendChild(shipStatusCellText);
  shipStatusCell.appendChild(img);

  shipStatusCell.classList.remove("placed"); // Ensure there's no strikethrough on the status

  //const shipNameCell = shipStatusCell.parentElement.firstElementChild; // Get the ship name cell
  //shipNameCell.style.textDecoration = "line-through"; // Apply strikethrough to ship name
}

// Start the game
function startGame() {
  playerGrid.classList.remove("pending");
  computerGrid.classList.remove("pending");
  if (currentShipIndex === shipSizes.length) {
    // Check if all ships are placed
    gameStarted = true;
    playerTurn = true; // Player starts
    message.innerHTML = `
    "Game started!"</br> 
    your turn!'
     `;
    turnIndicator.classList.add("ready");
    updateTurnIndicator();

    placeComputerShips(); // Place AI ships on the computer's grid
    computerGrid.classList.remove("waiting");
    // Disable start button after game starts
    startButton.classList.remove("ready");
    //startButton.style.display = "none";

    // Enable player to attack computer's grid
    computerGrid.childNodes.forEach((cell, index) => {
      cell.addEventListener("click", () => {
        if (
          playerTurn &&
          gameStarted &&
          !cell.classList.contains("hit") &&
          !cell.classList.contains("miss")
        ) {
          attack(cell, index, computerShips, computerGrid, "player");
          if (!checkWin(computerShips, "Player 1")) {
            playerTurn = false;
            updateTurnIndicator();
            setTimeout(computerTurn, 1000); // Computer moves after a delay
          }
        }
      });
    });
  } else {
    message.textContent = "Please place all ships before starting the game!";
  }
}


// AI ship placement
function placeComputerShips() {
  for (let i = 0; i < shipSizes.length; i++) {
    let placed = false;
    while (!placed) {
      const randomIndex = Math.floor(Math.random() * gridSize * gridSize);
      const size = shipSizes[i];
      const shipClass = shipNames[i];
      const horizontal = Math.random() < 0.5;
      isHorizontal = horizontal;
      if (canPlaceShip(randomIndex, size, computerGrid)) {
        placeShip(randomIndex, size, shipClass, computerGrid);
        placed = true;
        const enemyShipNamesStatus = document.querySelector(`#enemy-ship-${shipNames[i]}-status`);

        enemyShipNamesStatus.textContent = ""; // Set status to "Placed" without strikethrough

        // Add the checkmark icon to the placed ship
        const img = document.createElement('img');
        img.src = `./images/checkmark-icon.svg`;
        img.alt = 'checkmark';
        img.classList.add("checkmark");

        const shipStatusCellText = document.createElement('span');
        shipStatusCellText.textContent = "Placed";
        enemyShipNamesStatus.appendChild(shipStatusCellText);
        enemyShipNamesStatus.appendChild(img);
      }
    }
  }
}

// Attack function
function attack(cell, index, ships, grid, attacker) {
  if (cell.classList.contains("ship")) {
    cell.classList.add("hit");
    message.textContent = "Its a Hit!";
  } else {
    cell.classList.add("miss");
    message.textContent = "You missed!";
  }
  checkShipDestroyed(ships);
}

// Computer's turn to attack
function computerTurn() {
  let move;
  do {
    move = Math.floor(Math.random() * gridSize * gridSize);
  } while (computerGuesses.includes(move));

  computerGuesses.push(move);
  const targetCell = playerGrid.childNodes[move];

  if (targetCell.classList.contains("ship")) {
    targetCell.classList.add("hit");
    message.innerHTML = `
   Computer hit</br> 
   your ship!'
    `;
  } else {
    targetCell.classList.add("miss");
    message.textContent = "Computer missed!";
  }
  checkShipDestroyed(playerShips);
  playerTurn = true; // Pass the turn back to the player
  updateTurnIndicator();
}

// Check if all ships are destroyed
function checkWin(ships, player) {
  const allShipsHit = ships.every((cell) => cell.classList.contains("hit"));
  if (allShipsHit) {
    message.classList.add("win");
    message.textContent = `${player} wins!`;
    restartButton.classList.add('ready');
    gameStarted = false;
    return true;
  }
  return false;
}

// Update the turn indicator
function updateTurnIndicator() {
  turnIndicator.textContent = playerTurn ? "Your turn" : "AI's turn";
}

createGame();
// Call the init function to set up the game
init();
