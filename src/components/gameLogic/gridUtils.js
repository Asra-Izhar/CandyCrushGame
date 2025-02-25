
// Check for matches (3 or more in a row/column)

 export const checkForMatches = async (grid) => {
  const matches = [];

  // Check horizontal matches
  for (let r = 0; r < grid.length; r++) {
    let matchLength = 1;
    for (let c = 0; c < grid[r].length - 1; c++) {
      if (grid[r][c] !== null && grid[r][c] === grid[r][c + 1]) {
        matchLength++;
      } else {
        if (matchLength >= 3) {
          for (let i = 0; i < matchLength; i++) {
            matches.push({ row: r, col: c - i });
          }
        }
        matchLength = 1;
      }
    }
    if (matchLength >= 3) {
      for (let i = 0; i < matchLength; i++) {
        matches.push({ row: r, col: grid[r].length - 1 - i });
      }
    }
  }

  // Check vertical matches
  for (let c = 0; c < grid[0].length; c++) {
    let matchLength = 1;
    for (let r = 0; r < grid.length - 1; r++) {
      if (grid[r][c] !== null && grid[r][c] === grid[r + 1][c]) {
        matchLength++;
      } else {
        if (matchLength >= 3) {
          for (let i = 0; i < matchLength; i++) {
            matches.push({ row: r - i, col: c });
          }
        }
        matchLength = 1;
      }
    }
    if (matchLength >= 3) {
      for (let i = 0; i < matchLength; i++) {
        matches.push({ row: grid.length - 1 - i, col: c });
      }
    }
  }

  return matches;
};

//clear matches
 export const clearMatches = async (grid, matches) => {
  matches.forEach((match) => {
    grid[match.row][match.col] = 0;
  });
  return grid;
};


// shift down
 export const shiftDown = async (grid) => {
  for (let col = 0; col < grid[0].length; col++) {
    let emptyRow = grid.length - 1;
    for (let row = grid.length - 1; row >= 0; row--) {
      if (grid[row][col] !== null && grid[row][col] !== 0)  {
    
        if (emptyRow !== row) 
          {
            grid[emptyRow][col] = grid[row][col];
          grid[row][col] = 0;
          }
          emptyRow--;
          } else if(grid[row][col]===null){
            emptyRow =row-1;

          }
      
      }
    }
    return grid;
  }







//Fill random candies
 export const fillRandomCandies = async (grid) => {
  const candyTypes = [1, 2, 3, 4, 5];
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (grid[r][c] === 0) {
        const randomCandy =
          candyTypes[Math.floor(Math.random() * candyTypes.length)];
        grid[r][c] = randomCandy;
      }
    }
  }
  return grid;
};



// Check for possible moves
 export const hasPossibleMoves = async (grid) => {
  const rows = grid.length;
  const cols = grid[0].length;

  const swap = (r1, c1, r2, c2) => {
    const temp = grid[r1][c1];
    grid[r1][c1] = grid[r2][c2];
    grid[r2][c2] = temp;
  };

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === null) continue;
      //check for horizontal
      if (c + 1 < cols && grid[r][c + 1] !== null) {
        swap(r, c, r, c + 1);
        if ((await checkForMatches(grid)).length > 0) {
          swap(r, c, r, c + 1);
          return true;
        }
        swap(r, c, r, c + 1);
      }
         //check for vertically swipe
      if (r + 1 < rows && grid[r + 1][c] !== null) {
        swap(r, c, r + 1, c);
        if ((await checkForMatches(grid)).length > 0) {
          swap(r, c, r + 1, c);
          return true;
        }
        swap(r, c, r + 1, c);
      }
    }
  }

  console.log("No possible moves found");
  return false;
};

// Shuffle the grid
 export const shuffleGrid = (grid) => {
  console.log("Shuffling grid...");
  const candies = grid.flat().filter((cell) => cell !== null);
  const rows = grid.length;
  const cols = grid[0].length;

  for (let i = candies.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [candies[i], candies[j]] = [candies[j], candies[i]];
  }

  let index = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] !== null) {
        grid[r][c] = candies[index++];
      }
    }
  }
  return grid;
};

// Handle shuffle and clear
 export const handleShuffleAndClear = async (grid) => {
  console.log("Handling shuffle and clear...");
  let newGrid = shuffleGrid(grid);
  let totalClearedCandies = 0;
  let matches = await checkForMatches(newGrid);

  while (matches.length > 0) {
    totalClearedCandies += matches.length;
    newGrid = await clearMatches(newGrid, matches);
    newGrid = await shiftDown(newGrid);
    newGrid = await fillRandomCandies(newGrid);
    matches = await checkForMatches(newGrid);
  }

  return { grid: newGrid, clearedCandies: totalClearedCandies };
};





  