 // function to generate boards selectors
 const { gameState } = await import ('../gameState.js');
 export function selectBoardSelector(player) {
    gameState.boards[`${player}Board`] = document.getElementById(`${player}-board`);
  }
