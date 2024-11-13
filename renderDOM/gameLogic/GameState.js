// game state Class

class GameState {
  boards = {}; // Object to store board elements
  playersList = ["human", "enemy"];
  boardSize = 10;
  shipSizes = [5, 4, 3, 3, 2]; // Carrier, Battleship, Cruiser, Submarine, Destroyer
  shipNames = ["carrier", "battleship", "cruiser", "submarine", "destroyer"];
  humanShips = [];
  enemyShips = [];
  enemyMoves = [];
  gameStarted = false;
  currentShipIndex = 0; // Tracks which ship is being placed
  playerTurn = true; // True if it's the human's turn, false for enemy
  isHorizontal = true; // Track ship orientation
  enemyGuesses = [];
  humanGuesses = [];
}
export const gameState = new GameState();