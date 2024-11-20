//const { gameState } = await import ('../gameState.js');
import { gameState } from '../../gameLogic/GameState.js';
import { helperFunctionsClass } from '../../../renderDOM/helperFunctions/helperFunctionsClass.js';
const { canPlaceShip } = await import ('./canPlaceShip.js');
const { placeShip } = await import ('./placeShip.js');

  // AI ship placement
  export async function placeEnemyShips() {

    const {
        boards,
        boardSize,
        shipSizes,
        shipNames,
        playersList
      } = gameState;

    //await helperFunctionsClass.preloadFiles(images); // Ensure images are preloaded before DOM manipulation
    

    for (let i = 0; i < shipSizes.length; i++) {
      let placed = false;
      while (!placed) {
        const randomIndex = Math.floor(Math.random() * boardSize * boardSize);
        const size = shipSizes[i];
        const shipClass = shipNames[i];
        const horizontal = Math.random() < 0.5;
        gameState.isHorizontal  = horizontal;
        if (canPlaceShip(randomIndex, size, boards.enemyBoard)) {
          placeShip(randomIndex, size, shipClass, boards.enemyBoard);
          placed = true;
          const enemyShipNamesStatus = document.querySelector(
            `#enemy-ship-${shipNames[i]}-status`
          );

          enemyShipNamesStatus.textContent = ""; // Set status to "Placed" without strikethrough

          // Add the checkmark icon to the placed ship
          const img = document.createElement("img");
          // Importing the image in your JavaScript or HTML
          const imagePath = './assets/images/checkmark-icon.avif';
          img.src = imagePath;
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