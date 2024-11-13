export function createBoardPattern(cell, row, column) {
    //cell.classList.add("blue");

    if (cell.dataset.index.length === 1) {
      if (row % 2 === 1) {
        cell.classList.add("stripe");
      } else {
        cell.classList.add("white");
      }
    } else if (row % 2 === 1) {
      // If the group is odd
      if (column % 2 === 1) {
        // If the index is odd
        //console.log(`if the group ${group} is odd and index ${j} is odd`)
        cell.classList.add("blue"); // Add the "blue" class
        // div.classList.remove('white', 'stripe'); // Remove the "white" and "stripe" classes
      } else {
        // If the index is even
        //console.log(`if the group ${group} is odd and index ${j} is even`)
        cell.classList.add("stripe"); // Add the "stripe" class
        //div.classList.remove('blue', 'white'); // Remove the "blue" and "white" classes
      }
    } else {
      // If the group is even
      if (column % 2 === 1) {
        // If the index is odd
        // console.log(`if the group ${group} is even and index ${j} is odd`)
        cell.classList.add("stripe"); // Add the "stripe" class
        //div.classList.remove('blue', 'white'); // Remove the "blue" and "white" classes
      } else {
        // If the index is even
        cell.classList.add("white"); // Add the "white" class
        //console.log(`if the group ${group} is even and index ${j} is even`)
        // div.classList.remove('blue', 'stripe'); // Remove the "blue" and "stripe" classes
      }
    }
  }
