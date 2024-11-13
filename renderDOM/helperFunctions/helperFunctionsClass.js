// Static Methods: Defining these methods as static 
// allows you to call them without needing to create an instance of helperFunctionsClass.
// If you want to be able to instantiatehelperFunctionsClass 
// you can remove the static keyword and call the methods on an instance of the class:
// consthelperFunctionsClass = new helperFunctionsClass();
// helperFunctionsClass.clearBoard(boardElement);
const { gameState } = await import ('../gameLogic/GameState.js');

export class helperFunctionsClass{
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

      // static selectBoardSelector(player) {
      //   gameState.boards[`${player}Board`] = document.getElementById(`${player}-board`);
      // }

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

}
