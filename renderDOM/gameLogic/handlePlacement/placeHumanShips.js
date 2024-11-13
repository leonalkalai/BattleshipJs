const { gameState } = await import ('../gameState.js');
const { handleShipPlacement } = await import ('./handleShipPlacement.js');

// Allow Player to place ships
  export function placeHumanShips(elements) {
    gameState.boards.humanBoard.childNodes.forEach((cell) => {
      // Store the handler functions on each cell for later removal
      cell.clickHandler = (event) => handleShipPlacement(event, elements);
      cell.touchHandler = (event) => handleShipPlacement(event, elements);

      // Add event listeners using the stored handler functions
      cell.addEventListener("click", cell.clickHandler, false);
      cell.addEventListener("touchstart", cell.touchHandler, false);
    });
  }