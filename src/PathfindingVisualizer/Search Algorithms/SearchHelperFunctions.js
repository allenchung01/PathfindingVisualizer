// Returns ALL neighbors of 'node', visited or not.
export function getNeighbors(node, numRows, numCols, grid) {
    const {row, col} = node;
    const neighbors = [];
    // North neighbor.
    if (isSafe(row + 1, col, numRows, numCols)) {
        neighbors.push(grid[row + 1][col]);
    }
    // South neighbor.
    if (isSafe(row - 1, col, numRows, numCols)) {
        neighbors.push(grid[row - 1][col]);
    }
    // East neighbor.
    if (isSafe(row, col + 1, numRows, numCols)) {
        neighbors.push(grid[row][col + 1]);
    }
    // West neighbor.
    if (isSafe(row, col - 1, numRows, numCols)) {
        neighbors.push(grid[row][col - 1]);
    }
    return neighbors;
}

// Returns true if row and col are on the board.
function isSafe(row, col, numRows, numCols) {
    if (row >= 0 && row < numRows &&
        col >= 0 && col < numCols) {
        return true;
    }
    return false;
}