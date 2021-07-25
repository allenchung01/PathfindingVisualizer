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
