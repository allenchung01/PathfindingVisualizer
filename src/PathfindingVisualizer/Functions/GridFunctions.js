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
