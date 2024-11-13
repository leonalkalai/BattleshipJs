  // Generate Board titles
  export function createBoardTitles() {
    const boards = document.querySelectorAll(".boardh2container");
    boards.forEach((board, index) => {
      const boardType = board.querySelector("p");
      const boardTitle = board.querySelector("h2");
      boardType.textContent = `${index === 1 ? "AI" : "human"}`;
      boardTitle.textContent = `Player ${index + 1}`;
      boardTitle.classList.add(`${index === 1 ? "ai" : "human"}`);
    });
  }