document.addEventListener("DOMContentLoaded", async () => {
  const { initializeHtmlElements } = await import ("./htmlElements.js"); // Importing the function from htmlElements.js

  // start variables
  const { gameState } = await import ('./gameState.js');
  const htmlElements = await initializeHtmlElements();

  const {
    boards,
    playersList,
    boardSize,
    shipSizes,
    shipNames,
    humanShips,
    enemyShips,
    enemyMoves,
    gameStarted,
    currentShipIndex,
    playerTurn,
    isHorizontal,
    enemyGuesses,
    humanGuesses
  } = gameState;
  
  // end variables

  const { init } = await import ("./init.js");
const { createContainer } = await import ("./createContainer.js");

const { createButtons } = await import ("./createButtons.js");
const { toggleShipRotation } = await import ("./toggleShipRotation.js");
const { resetVariables } = await import ("./resetVariables.js");



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


  async function restartGame(elements) {
    await init();
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
    const destroyedShipStatusObject = {};

    // Object to hold the destruction status of each ship
 const playerName = playerBoardString.replace("-board", "");

    shipNames.forEach((name) => {
      ships[name] = shipsArray.filter((element) =>
        element.classList.contains(name)
      );
      destroyedShipStatusObject[`${name}`] = ships[name].every((cell) =>
        cell.classList.contains("hit")
      );
      if (destroyedShipStatusObject[name]) {
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

    //check if all ships are destroyed
    let destroyedShipStatusResult = {};


    destroyedShipStatusResult[playerName] = Object.values(
        destroyedShipStatusObject
    ).every((value) => value === true);
 
    // console.log("destroyedShipStatusObject =>: ", destroyedShipStatusObject);
    // console.log("destroyedShipStatusResult =>: ", destroyedShipStatusResult);

    return [destroyedShipStatusObject, destroyedShipStatusResult];
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

    // check if enemy wins
    if (!checkWin(humanShips, "enemy", elements)) {
      playerTurn = true; // Pass the turn back to the player
      updateTurnIndicator();
    }

    let checkHumanShipsDestroyed = checkShipDestroyed(humanShips)[1].human;
    //console.log("checkHumanShipsDestroyed =>", checkHumanShipsDestroyed);
    if (checkHumanShipsDestroyed) {
      console.log("enemy wins");
    }
  }


  // Start the game
  init();
});
