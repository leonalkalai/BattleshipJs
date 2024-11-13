//const { gameState } = await import ('../gameState.js');
import { helperFunctionsClass } from '../../helperFunctions/helperFunctionsClass.js';
import { gameState } from '../../gameLogic/GameState.js';
const { canPlaceShip } = await import("./canPlaceShip.js");
const { placeShip } = await import("./placeShip.js");
const { updateShipStatus } = await import("../updateShipStatus.js");
const { startGame } = await import("../startGame.js");

  // Handle Board click/touch for player ship placement
  export function handleShipPlacement(event, elements) {
    event.preventDefault();
   // elements = initializeHtmlElements();
   const {
    boards,
    shipSizes,
    shipNames,
  } = gameState;

    if (elements) {
      // check if html elements are rendered
      event.preventDefault();
      const target = event.target;
      if (gameState.currentShipIndex < shipSizes.length) {
        const index = parseInt(target.dataset.index);
        const size = shipSizes[gameState.currentShipIndex];
        const shipClass = shipNames[gameState.currentShipIndex];

        if (canPlaceShip(index, size, boards.humanBoard)) {
          boards.humanBoard.classList.remove("pending");
          boards.humanBoard.classList.add("outline");
          boards.humanBoard.classList.remove("waiting");
          placeShip(index, size, shipClass, boards.humanBoard);
          elements.message.classList.remove("alarm");
          elements.message.innerHTML = `${shipClass} added`;
          updateShipStatus(gameState.currentShipIndex);
          gameState.currentShipIndex++; // Move to the next ship
        } else {
          elements.message.classList.add("alarm");
          elements.message.innerHTML = `
      Try another location.
      `;
        }
      }

      // Check if all ships are placed
      if (gameState.currentShipIndex === shipSizes.length) {
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

          elements.rotateButton.classList.remove("ready");
        }, 1500); // 1500 milliseconds (1.5 seconds) delay
      }
    } // end check if html elements are rendered
  }