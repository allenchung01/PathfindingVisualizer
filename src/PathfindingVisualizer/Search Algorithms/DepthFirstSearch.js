import {getNeighbors} from './SearchHelperFunctions';

// Use depth first search to find a path from 'startNode' to 'targetNode'
// in 'grid'. The path is not guaranteed to be the shortest path. Return 
// an array of the visited nodes in order as well as an array of the path 
// discovered in reversed order.
export function depthFirstSearch(grid, startNode, targetNode, numRows, numCols) {
    const visitedNodesInOrder = [];
    const pathReversed = [];
    startNode.isVisited = true;
    dfs(grid, startNode, targetNode, numRows, numCols, visitedNodesInOrder, pathReversed);
    pathReversed.push(startNode);
    return {visitedNodesInOrder, pathReversed};
}

// Recursive function to be used for depth first search.
function dfs(grid, node, targetNode, numRows, numCols, visitedNodesInOrder, pathReversed) {
    if (node === targetNode) {
        // Target node was discovered.
        pathReversed.push(node);
        return true;
    }
    const neighbors = getNeighbors(node, numRows, numCols, grid);
    for (const neighbor of neighbors) {
        if (!neighbor.isVisited) {
            neighbor.isVisited = true;
            neighbor.previousNode = node;
            visitedNodesInOrder.push(neighbor);
            if (dfs(grid, neighbor, targetNode, numRows, numCols, visitedNodesInOrder, pathReversed)) {
                pathReversed.push(neighbor);
                return true;
            }
        }
    }
    // Target node not found.
    return false;
}