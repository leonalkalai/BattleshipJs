 // function to generate boards selectors
 const { helperFunctionsClass } = await import("./helperFunctionsClass.js");
 const { gameState } = await import("../gameLogic/GameState.js");

 export function selectBoardSelector(player) {
    gameState.boards[`${player}Board`] = document.getElementById(`${player}-board`);
  }
