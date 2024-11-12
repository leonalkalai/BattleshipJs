const { gameState } = await import ('../gameState.js');

// Place the ship on the Board and track the ship's cells
  export function placeShip(startIndex, size, shipClass, board) {
    const {
        boards,
        boardSize,
        humanShips,
        enemyShips,
        isHorizontal,
      } = gameState;
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