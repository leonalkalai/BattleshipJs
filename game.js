import { initializeHtmlElements } from "./htmlElements.js"; // Importing the function from htmlElements.js

document.addEventListener("DOMContentLoaded", () => {
  // start variables
  const htmlElements = initializeHtmlElements();
  const boards = {}; // Object to store board elements
  const playersList = ["human", "enemy"];
  const boardSize = 10;
  const shipSizes = [5, 4, 3, 3, 2]; // Carrier, Battleship, Cruiser, Submarine, Destroyer
  const shipNames = [
    "carrier",
    "battleship",
    "cruiser",
    "submarine",
    "destroyer",
  ];

  let humanShips = [];
  let enemyShips = [];
  let enemyMoves = [];
  let gameStarted = false;
  let currentShipIndex = 0; // Tracks which ship you're placing
  let playerTurn = true; // True if it's human's turn, false for enemy
  let isHorizontal = true; // Track ship orientation
  let enemyGuesses = [];
  let humanGuesses = [];

  // end variables

  function createHeader() {
    const headerElement = document.createElement("header");
    const h1Element = document.createElement("h1");
    const imageElement = document.createElement("img");
    imageElement.src = "./images/logo.svg";
    imageElement.alt = "logo";
    h1Element.appendChild(imageElement);
    const interfaceContainerElement = document.createElement("div");
    interfaceContainerElement.id = "interface-container";
    interfaceContainerElement.classList.add("wrap");
    const turnIndicatorElement = document.createElement("div");
    turnIndicatorElement.id = "turn-indicator";
    const messageElement = document.createElement("div");
    messageElement.id = "message";
    messageElement.textContent = "Place your ships";
    interfaceContainerElement.appendChild(turnIndicatorElement);
    interfaceContainerElement.appendChild(messageElement);
    headerElement.appendChild(h1Element);
    headerElement.appendChild(interfaceContainerElement);
    htmlElements.body.appendChild(headerElement);
  }

  function createButtons(mainElement, elements) {
    const buttonNames = ["Start", "Restart", "Rotate"];
    const buttonsContainer = document.createElement("div");
    buttonsContainer.id = "buttons-container";
    for (const buttonName of buttonNames) {
      const buttonPrefix = "-button";
      const button = document.createElement("button");
      if (buttonName === "Start") {
        button.disabled = true;
      }
      if (buttonName === "Restart") {
        button.addEventListener("click", () => restartGame(elements));
      }
      if (buttonName === "Rotate") {
        button.classList.add("ready");
        button.addEventListener("click", toggleShipRotation);
      }
      button.id = `${buttonName.toLowerCase()}${buttonPrefix}`;
      button.textContent = buttonName;
      buttonsContainer.appendChild(button);
    }
    mainElement.appendChild(buttonsContainer);
  }

  function createContainer(mainElement) {
    const container = document.createElement("div");
    container.classList.add("container");
    for (const player of playersList) {
      const boardContainer = document.createElement("div");
      boardContainer.classList.add("board-container");
      const board = document.createElement("div");
      board.id = `${player}-board`;
      board.classList.add("board");
      boardContainer.appendChild(board);
      container.appendChild(boardContainer);
    }
    mainElement.appendChild(container);
  }

  // function to generate boards selectors
  function selectBoardSelector(player) {
    boards[`${player}Board`] = document.getElementById(`${player}-board`);
  }

  async function createMain(elements) {
    const mainElement = document.createElement("main");
    await createButtons(mainElement, elements);
    await createContainer(mainElement);
    elements.body.appendChild(mainElement);

    // Initialize boards
    selectBoardSelector("human");
    selectBoardSelector("enemy");
    await createBoard(boards.humanBoard);
    await createBoard(boards.enemyBoard);
  }

  // Generate a Board for players
  function createBoard(boardElement) {
    for (let index = 0; index < boardSize * boardSize; index++) {
      const cell = document.createElement("div");
      cell.dataset.index = index; // Store the index for reference

      cell.classList.add("square");
      let row = cell.dataset.index[0];
      let column =
        cell.dataset.index < 10 ? cell.dataset.index[0] : cell.dataset.index[1];
      // start applying pattern
      createPattern(cell, row, column);
      // end applying pattern
      boardElement.appendChild(cell);
    }

    const gameBoardContainer = document.createElement("div");
    gameBoardContainer.classList.add("game-board-container");
    gameBoardContainer.classList.add("board-container");
    boardElement.parentElement.prepend(gameBoardContainer);

    // Create Board labels - letters
    const boardLabels = document.createElement("div");
    boardLabels.classList.add("board-labels");
    boardLabels.classList.add("board");

    for (let i = 0; i < 10; i++) {
      const label = document.createElement("div");
      label.classList.add("board-label");
      label.textContent = String.fromCharCode(65 + i); // A-J
      boardLabels.appendChild(label);
    }

    // Create row labels - numbers
    const rowLabels = document.createElement("div");
    rowLabels.classList.add("row-labels");

    for (let i = 0; i < 11; i++) {
      const label = document.createElement("div");
      label.classList.add("board-label");
      label.textContent = i === 0 ? "" : i;
      rowLabels.appendChild(label);
    }

    const columnContainer = document.createElement("div");
    columnContainer.classList.add("column-container");
    columnContainer.classList.add("container");

    boardElement.parentElement.prepend(boardLabels);
    gameBoardContainer.appendChild(columnContainer);
    gameBoardContainer.appendChild(boardElement);

    columnContainer.appendChild(rowLabels);

    // Create board title
    const boardh2container = document.createElement("div");
    boardh2container.classList.add("boardh2container");

    const playerType = document.createElement("p");

    const boardh2image = document.createElement("img");
    boardh2image.src = `./images/${boardElement.id}.svg`;
    boardh2image.classList.add("boardh2image");

    const boardTitle = document.createElement("h2");
    boardh2container.appendChild(playerType);
    boardh2container.appendChild(boardh2image);
    boardh2container.appendChild(boardTitle);
    if (boardElement === boards.humanBoard) {
      gameBoardContainer.prepend(boardh2container);
    } else {
      gameBoardContainer.appendChild(boardh2container);
    }
  }

  // helper functions

  function toggleClassWithTimeout(element, className, timeout) {
    // Add the class
    element.classList.add(className);

    // Remove the class after the specified timeout
    setTimeout(() => {
      element.classList.remove(className);
    }, timeout);
  }

  function clearBoard(boardElement) {
    boardElement.innerHTML = "";
  }

  function removeElements(elements) {
    document.querySelectorAll(elements).forEach((el) => {
      el.remove();
    });
  }

  function createShipsTableContainer() {
    const shipsTableContainer = document.createElement("div");
    shipsTableContainer.id = "ships-table-container";
    htmlElements.body.appendChild(shipsTableContainer);
  }

  function resetVariables() {
    const htmlElements = initializeHtmlElements();

    humanShips = [];
    enemyShips = [];
    enemyMoves = [];
    gameStarted = false;
    currentShipIndex = 0; // Tracks which ship you're placing
    playerTurn = true; // True if it's human's turn, false for enemy
    isHorizontal = true; // Track ship orientation
    enemyGuesses = [];
    humanGuesses = [];
  }

  async function restartGame(elements) {
    await init();
    //     if (elements && Object.values(elements).every((el) => el !== null)) {
    //   // check if elements are in the DOM
    //   elements.restartButton.classList.remove("ready");
    //   elements.startButton.classList.remove("ready");

    //   elements.message.textContent = "Place your ships";
    //   elements.message.className = "";
    //   // Clear the game Boards for player and enemy
    //   clearBoard(boards.humanBoard);
    //   clearBoard(boards.enemyBoard);
    //   shipsTableContainer.innerHTML = "";
    //   removeElements(".board-labels");
    //   removeElements(".column-container");
    //   removeElements(".boardh2container");

    // }
  }

  function createShipsTables() {
    const shipsTableContainer = document.querySelector(
      "#ships-table-container"
    );
    for (let i = 1; i < 3; i++) {
      const playerChecker = i === 1 ? "human" : "enemy";
      // Create a row container
      const row = document.createElement("div");
      row.classList.add("row");

      // Create header for human ships
      const playerShipsHeader = document.createElement("div");
      const playerShipsHeaderText = document.createElement("h2");
      playerShipsHeaderText.textContent = `Player ${i} Ships`;
      playerShipsHeader.appendChild(playerShipsHeaderText);
      row.appendChild(playerShipsHeader);

      // Create player ships list container
      const playerShipsList = document.createElement("div");
      playerShipsList.classList.add("player-ships-list");

      // Create the table and set a unique ID for each player
      const playerShipsTable = document.createElement("table");
      playerShipsTable.setAttribute("id", `${playerChecker}-ships-list`);

      // Create table header row
      const trh = document.createElement("tr");
      const th1 = document.createElement("th");
      const th2 = document.createElement("th");
      th1.textContent = "Ship";
      th2.textContent = "Status";
      trh.appendChild(th1);
      trh.appendChild(th2);
      playerShipsTable.appendChild(trh);

      // Populate ship rows
      const trs = {};
      shipNames.forEach((name) => {
        trs[`tr-${name}`] = document.createElement("tr");

        // Add the icon to the status cell
        const img = document.createElement("img");
        img.src = `./images/icons/${name}.svg`;
        img.alt = name;

        const td1 = document.createElement("td");
        td1.setAttribute("id", `${playerChecker}-ship-${name}-name`);
        const td1text = name.charAt(0).toUpperCase() + name.slice(1); // capitalize
        td1.appendChild(img);
        td1.insertAdjacentHTML("afterbegin", td1text);

        const td2 = document.createElement("td");
        td2.setAttribute("id", `${playerChecker}-ship-${name}-status`);
        td2.textContent = "Not Placed";

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
    const playerBoard = playerBoardString.replace("-board", "-ships-list");
    const chosenPlayerBoard = document.querySelector(
      `${
        playerBoard === "enemy-ships-list"
          ? "#enemy-ships-list"
          : "#human-ships-list"
      }`
    );

    const playerBoardObject = playerBoardString.replace("-Board", "");
    const destroyedShipStatusName = `${playerBoardObject}DestroyedShipStatus`;
    // Group ships by type inside the function
    const ships = {};

    // Create a parent object to hold the dynamic key
    const destroyedShipStatus = {};

    // Object to hold the destruction status of each ship
    destroyedShipStatus[destroyedShipStatusName] = {};

    shipNames.forEach((name) => {
      ships[name] = shipsArray.filter((element) =>
        element.classList.contains(name)
      );
      destroyedShipStatus[`${name}`] = ships[name].every((cell) =>
        cell.classList.contains("hit")
      );
      if (destroyedShipStatus[name]) {
        const boardSelector = `${
          playerBoard === "enemy-ships-list" ? "enemy" : "human"
        }`;
        const boardSelectorShipName = document.querySelector(
          `#${boardSelector}-ship-${name}-name`
        );
        //const boardSelectorShipImage = document.querySelector(`#${boardSelector}-ship-${name}-name > img`);
        boardSelectorShipName.classList.add("flames");
        const boardSelectorShipNameStatus = document.querySelector(
          `#${boardSelector}-ship-${name}-status`
        );
        boardSelectorShipName.style.textDecoration = "line-through";
        boardSelectorShipNameStatus.innerHTML =
          "<img src='./images/skull-and-crossbones.svg' alt='cruiser'><span>Destroyed</span>";
        console.log(boardSelector + "_" + name + " is destroyed");
      }
    });

    // Log the status of each ship type
    console.log(destroyedShipStatus);

    return destroyedShipStatus;
  }

  // Generate Board titles
  function createBoardTitles() {
    const boards = document.querySelectorAll(".boardh2container");
    boards.forEach((board, index) => {
      const boardType = board.querySelector("p");
      const boardTitle = board.querySelector("h2");
      boardType.textContent = `${index === 1 ? "AI" : "human"}`;
      boardTitle.textContent = `Player ${index + 1}`;
      boardTitle.classList.add(`${index === 1 ? "ai" : "human"}`);
    });
  }

  function createPattern(cell, row, column) {
    //cell.classList.add("blue");

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
  }

  // Toggle ship rotation
  function toggleShipRotation() {
    isHorizontal = !isHorizontal; // Toggle between horizontal and vertical
    const orientationMessage = isHorizontal ? "Horizontal" : "Vertical";
    const message = document.getElementById("message");
    message.textContent = `orientation: ${orientationMessage}`;
  }

  // prevent click human board when game starts
  function preventClickHumanBoard(elements) {
    boards.humanBoard.childNodes.forEach((cell) => {
      // Remove the event listeners using the stored handler functions
      if (cell.clickHandler) {
        cell.removeEventListener("click", cell.clickHandler, false);
        delete cell.clickHandler; // Clean up reference
      }
      if (cell.touchHandler) {
        cell.removeEventListener("touchstart", cell.touchHandler, false);
        delete cell.touchHandler; // Clean up reference
      }

      cell.classList.add('nocursor');
    });
    boards.humanBoard.classList.add('nocursor');
  }

  // Allow Player to place ships
  function placeHumanShips(elements) {
    boards.humanBoard.childNodes.forEach((cell) => {
      // Store the handler functions on each cell for later removal
      cell.clickHandler = (event) => handleShipPlacement(event, elements);
      cell.touchHandler = (event) => handleShipPlacement(event, elements);

      // Add event listeners using the stored handler functions
      cell.addEventListener("click", cell.clickHandler, false);
      cell.addEventListener("touchstart", cell.touchHandler, false);
    });
  }

  // Handle Board click/touch for player ship placement
  function handleShipPlacement(event, elements) {
    event.preventDefault();
    elements = initializeHtmlElements();
    if (elements) {
      // check if html elements are rendered
      event.preventDefault();
      const target = event.target;

      if (currentShipIndex < shipSizes.length) {
        const index = parseInt(target.dataset.index);
        const size = shipSizes[currentShipIndex];
        const shipClass = shipNames[currentShipIndex];

        if (canPlaceShip(index, size, boards.humanBoard)) {
          boards.humanBoard.classList.remove("pending");
          boards.humanBoard.classList.add("outline");
          boards.humanBoard.classList.remove("waiting");
          placeShip(index, size, shipClass, boards.humanBoard);
          elements.message.classList.remove("alarm");
          elements.message.innerHTML = `${shipClass} added`;
          updateShipStatus(currentShipIndex);
          currentShipIndex++; // Move to the next ship
        } else {
          elements.message.classList.add("alarm");
          elements.message.innerHTML = `
      Try another location.
      `;
        }
      }

      // Check if all ships are placed
      if (currentShipIndex === shipSizes.length) {
        // Add a timeout to show the message after a brief delay
        setTimeout(() => {
          elements.message.innerHTML = `
      'Ready'</br> 
       "START" battle!
      `;
          elements.startButton.classList.add("ready");
          elements.startButton.disabled = false; // Enable start button
          elements.startButton.addEventListener("click", startGame);

          elements.interfaceContainer.classList.add("wrap");

          // Remove the rotate button after placing all ships
          // toggleRotateButton.style.display = "none"; // Hide the rotate button

          elements.rotateButton.classList.remove("ready");
        }, 1500); // 1500 milliseconds (1.5 seconds) delay
      }
    } // end check if html elements are rendered
  }

  // Check if a ship can be placed at the given index
  function canPlaceShip(startIndex, size, board) {
    for (let i = 0; i < size; i++) {
      const index = isHorizontal ? startIndex + i : startIndex + i * boardSize;
      // Check if the index is out of bounds or already occupied
      if (
        index >= boardSize * boardSize ||
        board.childNodes[index].classList.contains("ship")
      ) {
        return false; // Ship cannot be placed
      }
      // Check if the ship is being placed in the last row when horizontal
      if (isHorizontal && (startIndex % boardSize) + size > boardSize) {
        return false; // Ship goes out of bounds horizontally
      }
    }
    return true; // Ship can be placed
  }

  // Place the ship on the Board and track the ship's cells
  function placeShip(startIndex, size, shipClass, board) {
    const shipCells = [];
    for (let i = 0; i < size; i++) {
      const index = isHorizontal ? startIndex + i : startIndex + i * boardSize;
      //Board.childNodes[index].className = "";
      board.childNodes[index].classList.add("ship", shipClass);
      board.childNodes[index].classList.add(
        `${isHorizontal ? "horizontal" : "vertical"}`
      );
      shipCells.push(board.childNodes[index]);
    }

    // Track ships for both player and AI
    if (board === boards.humanBoard) {
      humanShips.push(...shipCells); // Track player ships
    } else if (board === boards.enemyBoard) {
      enemyShips.push(...shipCells); // Track AI ships
    }
  }

  // Update the ship status and strike-through ship name
  function updateShipStatus(shipIndex) {
    const shipId = `human-ship-${shipNames[shipIndex]}-status`;

    console.log(shipId);
    //const shipStatusIds = ['carrier-status', 'battleship-status', 'cruiser-status', 'submarine-status', 'destroyer-status'];
    const shipStatusCell = document.getElementById(shipId);

    shipStatusCell.textContent = ""; // Set status to "Placed" without strikethrough

    // Add the checkmark icon to the placed ship
    const img = document.createElement("img");
    img.src = `./images/checkmark-icon.svg`;
    img.alt = "checkmark";
    img.classList.add("checkmark");

    const shipStatusCellText = document.createElement("span");
    shipStatusCellText.textContent = "Placed";
    shipStatusCell.appendChild(shipStatusCellText);
    shipStatusCell.appendChild(img);

    shipStatusCell.classList.remove("placed"); // Ensure there's no strikethrough on the status

    //const shipNameCell = shipStatusCell.parentElement.firstElementChild; // Get the ship name cell
    //shipNameCell.style.textDecoration = "line-through"; // Apply strikethrough to ship name
  }

  // Start the game
  function startGame() {
    const htmlElements = initializeHtmlElements();
    boards.humanBoard.classList.remove("pending");
    boards.humanBoard.classList.add("outline");
    boards.enemyBoard.classList.add("outline");
    boards.enemyBoard.classList.remove("pending");
    boards.enemyBoard.classList.add("aim");
    preventClickHumanBoard(boards.humanBoard);
    if (currentShipIndex === shipSizes.length) {
      // Check if all ships are placed
      gameStarted = true;
      playerTurn = true; // Player starts
      htmlElements.message.innerHTML = `
     Game started!
     `;
      htmlElements.turnIndicator.classList.add("ready");
      updateTurnIndicator();

      placeEnemyShips(); // Place AI ships on the enemy's Board
      boards.enemyBoard.classList.remove("waiting");
      // Disable start button after game starts
      htmlElements.startButton.classList.remove("ready");
      //startButton.style.display = "none";
      htmlElements.interfaceContainer.classList.add("wrap");
      // Enable player to attack enemy's Board
      boards.enemyBoard.childNodes.forEach((cell, index) => {
        cell.classList.add("aim");
        cell.addEventListener("click", () => {
          if (
            playerTurn &&
            gameStarted &&
            !cell.classList.contains("hit") &&
            !cell.classList.contains("miss")
          ) {
            attack(
              cell,
              index,
              enemyShips,
              boards.enemyBoard,
              "player",
              htmlElements
            );
            if (!checkWin(enemyShips, "Player 1", htmlElements)) {
              playerTurn = false;
              updateTurnIndicator();
              setTimeout(enemyTurn(htmlElements), 1000); // enemy moves after a delay
            }
          }
        });
      });
    } else {
      htmlElements.message.textContent =
        "Please place all ships before starting the game!";
    }
  }

  // AI ship placement
  function placeEnemyShips() {
    for (let i = 0; i < shipSizes.length; i++) {
      let placed = false;
      while (!placed) {
        const randomIndex = Math.floor(Math.random() * boardSize * boardSize);
        const size = shipSizes[i];
        const shipClass = shipNames[i];
        const horizontal = Math.random() < 0.5;
        isHorizontal = horizontal;
        if (canPlaceShip(randomIndex, size, boards.enemyBoard)) {
          placeShip(randomIndex, size, shipClass, boards.enemyBoard);
          placed = true;
          const enemyShipNamesStatus = document.querySelector(
            `#enemy-ship-${shipNames[i]}-status`
          );

          enemyShipNamesStatus.textContent = ""; // Set status to "Placed" without strikethrough

          // Add the checkmark icon to the placed ship
          const img = document.createElement("img");
          img.src = `./images/checkmark-icon.svg`;
          img.alt = "checkmark";
          img.classList.add("checkmark");

          const shipStatusCellText = document.createElement("span");
          shipStatusCellText.textContent = "Placed";
          enemyShipNamesStatus.appendChild(shipStatusCellText);
          enemyShipNamesStatus.appendChild(img);
        }
      }
    }
  }

  // Attack function
  function attack(cell, index, ships, board, attacker, elements) {
    toggleClassWithTimeout(cell, "highlight", 1000);
    if (cell.classList.contains("ship")) {
      cell.classList.add("hit");
      elements.message.textContent = "Its a Hit!";
    } else {
      cell.classList.add("miss");
      elements.message.textContent = "You missed!";
    }
    checkShipDestroyed(ships);
  }

  // enemy's turn to attack
  function enemyTurn(elements) {
    let move;
    do {
      move = Math.floor(Math.random() * boardSize * boardSize);
    } while (enemyGuesses.includes(move));

    enemyGuesses.push(move);
    const targetCell = boards.humanBoard.childNodes[move];

    if (targetCell.classList.contains("ship")) {
      targetCell.classList.add("hit");
      toggleClassWithTimeout(targetCell, "highlight", 1000);
      elements.message.innerHTML = `
   Enemy hit</br> 
   your ship!'
    `;
    } else {
      targetCell.classList.add("miss");
      toggleClassWithTimeout(targetCell, "highlight", 1000);
      elements.message.textContent = "Enemy missed!";
    }
    checkShipDestroyed(humanShips);
    playerTurn = true; // Pass the turn back to the player
    updateTurnIndicator();
  }

  // Check if all ships are destroyed
  function checkWin(ships, player, elements) {
    const allShipsHit = ships.every((cell) => cell.classList.contains("hit"));
    if (allShipsHit) {
      elements.message.classList.add("win");
      elements.message.textContent = `${player} wins!`;
      // Remove the background image
      elements.interfaceContainer.style.backgroundImage = "none";
      elements.turnIndicator.classList.remove("ready");
      elements.restartButton.classList.add("ready");
      elements.interfaceContainer.classList.remove("wrap");
      gameStarted = false;
      return true;
    }
    return false;
  }

  // Update the turn indicator
  function updateTurnIndicator() {
    const htmlElements = initializeHtmlElements();
    htmlElements.turnIndicator.textContent = playerTurn
      ? "Your turn"
      : "AI's turn";
  }

  async function createGame(elements) {
    await createHeader();
    await createMain(elements);
    await createShipsTableContainer();
    await createBoardTitles();
    await createShipsTables();

    const htmlElements = initializeHtmlElements();

    if (htmlElements.turnIndicator)
      await htmlElements.turnIndicator.classList.remove("ready");
    await boards.humanBoard.classList.add("pending");
    await boards.enemyBoard.classList.add("pending");
    await boards.humanBoard.classList.remove("outline");
    await boards.enemyBoard.classList.remove("outline");
    await boards.humanBoard.classList.add("waiting");
    await boards.enemyBoard.classList.add("waiting");
  }

  // Initialize game
  async function initGame() {
    await placeHumanShips(htmlElements);
  }

  async function init() {
    await resetVariables(); // Reset all variables at the beginning of a new game
    const htmlElements = await initializeHtmlElements();
    htmlElements.body.innerHTML = await "";
    await createGame(htmlElements); // Create the game elements and set up the game
    await initGame(); // Initialize the game (placing ships, event listeners)
  }

  // Start the game
  init();
});
