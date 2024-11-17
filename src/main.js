document.addEventListener("DOMContentLoaded", async () => {
  const { helperFunctionsClass } = await import("./js/renderDOM/helperFunctions/helperFunctionsClass.js");
  const { gameState } = await import("./js/renderDOM/gameLogic/GameState.js");
  const { init } = await import("./js/renderDOM/initGame/init.js");

  // Initialize the game
  const htmlElements = await helperFunctionsClass.initializeHtmlElements();
  await init();

  console.log("Game initialized and DOM rendered!");
});
