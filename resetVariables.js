
import { initializeHtmlElements } from "./htmlElements.js";

export function resetVariables(humanShips, enemyShips, enemyMoves, gameStarted, currentShipIndex, playerTurn, isHorizontal, enemyGuesses, humanGuesses
) {
    const htmlElements = initializeHtmlElements();

    humanShips = [];
    enemyShips = [];
    enemyMoves = [];
    gameStarted = false;
    currentShipIndex = 0; // Tracks which ship you're placing
    playerTurn = true; // True if it's human's turn, false for enemy
    isHorizontal = true; // Track ship orientation
    enemyGuesses = [];
    humanGuesses = [];
  }