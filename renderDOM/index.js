import { helperFunctionsClass } from "./helperFunctions/helperFunctionsClass.js";
import { gameState } from "../renderDOM/gameLogic/GameState.js";
const { init } = await import("./initGame/init.js");
document.addEventListener("DOMContentLoaded", async () => {
  const htmlElements = await helperFunctionsClass.initializeHtmlElements();

  // Start the game
});
init();
