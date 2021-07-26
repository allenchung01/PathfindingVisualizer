function NodeObj(col, row) {
  this.col = col;
  this.row = row;
  this.isStart = false;
  this.isTarget = false;
  this.isVisited = false;
  this.isTargetReached = false;
  this.isWall = false;
  this.isWeight = false;
  this.distance = Infinity;
  this.previousNode = null;
  this.direction = null;
}

/*----- These functions modify the grid AND set the state. -----*/

// Creates anitial 2D array of node objects and sets state.
export function createInitialGrid(numRows, numCols) {
  const grid = [];
  for (let r = 0; r < numRows; r++) {
    const row = [];
    for (let c = 0; c < numCols; c++) {
      const node = new NodeObj(c, r);
      node.isStart =
        r === this.state.startNodeRow && c === this.state.startNodeCol;
      node.isTarget =
        r === this.state.targetNodeRow && c === this.state.targetNodeCol;
      row.push(node);
    }
    grid.push(row);
  }
  this.setState({ grid: grid });
}

// Clears all weights on grid and set state.
export function clearWeights() {
  const grid = copyGrid(this.state.grid);
  for (const row of grid) {
    for (const node of row) {
      if (node.isWeight) {
        node.isWeight = false;
      }
    }
  }
  this.setState({ grid: grid });
}

// Clears all path nodes on grid and set state.
export function clearPath() {
  const grid = copyGrid(this.state.grid);
  this.resetNodes(grid);
  this.setState({ grid: grid });
}

// Clears all walls on grid and set state.
export function clearWalls() {
  const grid = copyGrid(this.state.grid);
  for (const row of grid) {
    for (const node of row) {
      if (node.isWall) {
        node.isWall = false;
      }
    }
  }
  this.setState({ grid: grid });
}

/*----- These functions return a modified grid. -----*/

// Creates and returns a deep copy of the current grid.
export function copyGrid() {
  const { grid } = this.state;
  const gridCopy = [];
  for (const row of grid) {
    const rowCopy = row.map((node) => {
      const nodeCopy = Object.assign({}, node);
      return nodeCopy;
    });
    gridCopy.push(rowCopy);
  }
  return gridCopy;
}

// Returns a grid with all nodes set to !visited and !isPath.
export function resetNodes(grid) {
  for (const row of grid) {
    for (const node of row) {
      // We have to reset isVisited, and isPath of nodes the same way we set them.
      if (!node.isWall && !node.isStart && !node.isTarget && !node.isWeight) {
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node";
      } else if (node.isWeight) {
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-weight unvisited";
      }
      node.isVisited = false;
      node.isPath = false;
      node.previousNode = null;
      node.distance = Infinity;
      node.isStart =
        node.row === this.state.startNodeRow &&
        node.col === this.state.startNodeCol;
      node.isTarget =
        node.row === this.state.targetNodeRow &&
        node.col === this.state.targetNodeCol;
      node.isTargetReached = false;
    }
  }
}
