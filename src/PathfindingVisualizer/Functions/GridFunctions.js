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

// Returns the initial 2D array of node objects.
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

// Creates a deep copy of the given grid.
export function copyGrid(grid) {
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

// Clears all weights on the grid.
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

// Clears all path nodes on the grid.
export function clearPath() {
  const grid = copyGrid(this.state.grid);
  this.resetNodes(grid);
  this.setState({ grid: grid });
}

// Clears all walls on the grid.
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
