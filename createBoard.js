const { gameState } = await import ('./gameState.js');
const { createBoardPattern } = await import ("./createBoardPattern.js");

  // Generate a Board for players
  export function createBoard(boardElement) {
    for (let index = 0; index < gameState.boardSize * gameState.boardSize; index++) {
      const cell = document.createElement("div");
      cell.dataset.index = index; // Store the index for reference

      cell.classList.add("square");
      let row = cell.dataset.index[0];
      let column =
        cell.dataset.index < 10 ? cell.dataset.index[0] : cell.dataset.index[1];
      // start applying pattern
      createBoardPattern(cell, row, column);
      // end applying pattern
      boardElement.appendChild(cell);
    }

    const gameBoardContainer = document.createElement("div");
    gameBoardContainer.classList.add("game-board-container");
    gameBoardContainer.classList.add("board-container");
    boardElement.parentElement.prepend(gameBoardContainer);

    // Create Board labels - letters
    const boardLabels = document.createElement("div");
    boardLabels.classList.add("board-labels");
    boardLabels.classList.add("board");

    for (let i = 0; i < 10; i++) {
      const label = document.createElement("div");
      label.classList.add("board-label");
      label.textContent = String.fromCharCode(65 + i); // A-J
      boardLabels.appendChild(label);
    }

    // Create row labels - numbers
    const rowLabels = document.createElement("div");
    rowLabels.classList.add("row-labels");

    for (let i = 0; i < 11; i++) {
      const label = document.createElement("div");
      label.classList.add("board-label");
      label.textContent = i === 0 ? "" : i;
      rowLabels.appendChild(label);
    }

    const columnContainer = document.createElement("div");
    columnContainer.classList.add("column-container");
    columnContainer.classList.add("container");

    boardElement.parentElement.prepend(boardLabels);
    gameBoardContainer.appendChild(columnContainer);
    gameBoardContainer.appendChild(boardElement);

    columnContainer.appendChild(rowLabels);

    // Create board title
    const boardh2container = document.createElement("div");
    boardh2container.classList.add("boardh2container");

    const playerType = document.createElement("p");

    const boardh2image = document.createElement("img");
    boardh2image.src = `./images/${boardElement.id}.svg`;
    boardh2image.classList.add("boardh2image");

    const boardTitle = document.createElement("h2");
    boardh2container.appendChild(playerType);
    boardh2container.appendChild(boardh2image);
    boardh2container.appendChild(boardTitle);
    if (boardElement === gameState.boards.humanBoard) {
      gameBoardContainer.prepend(boardh2container);
    } else {
      gameBoardContainer.appendChild(boardh2container);
    }
  }