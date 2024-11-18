// Static Methods: Defining these methods as static
// allows you to call them without needing to create an instance of helperFunctionsClass.
// If you want to be able to instantiatehelperFunctionsClass
// you can remove the static keyword and call the methods on an instance of the class:
// consthelperFunctionsClass = new helperFunctionsClass();
// helperFunctionsClass.clearBoard(boardElement);

const { gameState } = await import("../gameLogic/GameState.js");

const images = [
  "aim.svg",
  "backgroundimage.svg",
  "battleship-icon.svg",
  "battleship.svg",
  "carrier-icon.svg",
  "carrier.svg",
  "checkmark-icon.svg",
  "cruiser-icon.svg",
  "cruiser.svg",
  "destroyer-icon.svg",
  "destroyer.svg",
  "enemy-board.svg",
  "flames.svg",
  "hit.svg",
  "human-board.svg",
  "logo.svg",
  "miss.svg",
  "no-pointer.png",
  "page-background.svg",
  "papyrus-turn.svg",
  "papyrus.svg",
  "rotate.png",
  "shipwreck.jpg",
  "submarine-icon.svg",
  "submarine.svg",
  "sunken-shipwreck-ocean-depths.jpg",
  "sunken-shipwreck.jpg",
  "table-background.svg",
  "wood-cursor.png",
  "wood-pointer.png",
];

const sounds = [
  "hit.mp3",
  "miss.mp3",
  "placeship.mp3",
  "rotate.mp3",
  "shot.mp3",
  "start.mp3",
];

// Map for storing pre-imported image URLs
const fileMap = {};

export class helperFunctionsClass {
  static toggleClassWithTimeout(element, className, timeout) {
    // Add the class
    element.classList.add(className);

    // Remove the class after the specified timeout
    setTimeout(() => {
      element.classList.remove(className);
    }, timeout);
  }

  static clearBoard(boardElement) {
    boardElement.innerHTML = "";
  }

  static removeElements(elements) {
    document.querySelectorAll(elements).forEach((el) => {
      el.remove();
    });
  }

  static selectBoardSelector(player) {
    gameState.boards[`${player}Board`] = document.getElementById(
      `${player}-board`
    );
  }

  static initializeHtmlElements() {
    return {
      body: document.querySelector("body"),
      buttonsContainer: document.getElementById("buttons-container"),
      startButton: document.getElementById("start-button"),
      restartButton: document.getElementById("restart-button"),
      rotateButton: document.getElementById("rotate-button"),
      interfaceContainer: document.getElementById("interface-container"),
      message: document.getElementById("message"),
      turnIndicator: document.getElementById("turn-indicator"),
    };
  }

  static async resetVariables() {
    // Reset the properties of gameState directly
    gameState.humanShips = [];
    gameState.enemyShips = [];
    gameState.enemyMoves = [];
    gameState.gameStarted = false;
    gameState.currentShipIndex = 0;
    gameState.playerTurn = true;
    gameState.isHorizontal = true;
    gameState.enemyGuesses = [];
    gameState.humanGuesses = [];
  }

  // Preload all images dynamically
  static async preloadFiles(fileType) {
    const files = fileType === 'images' ? images : sounds;
    const fileMap = {};

    const promises = files.map(fileName => {
    //for (const fileName of files) {
      const fileUrl = new URL(
        `../../../assets/${fileType}/${fileName}`,
        import.meta.url
      ).href;
      fileMap[fileName] = fileUrl; // Store the resolved URL
    //}

     });
    await Promise.all(promises);
    return fileMap; // Return the preloaded file map
  }
}
