import { gameState } from './GameState.js';
import { helperFunctionsClass } from '../helperFunctions/helperFunctionsClass.js';

export async function restartGame() {
  const { init } = await import("../initGame/init.js");
  await init();
}
