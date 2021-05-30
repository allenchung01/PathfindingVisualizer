import Queue from '../Data Structures/Queue';
import { getNeighbors } from './SearchHelperFunctions';

// Use breadth first search to find the shortest path from 'startNode' to 'targetNode'
// in 'grid'. Return an array of the visited nodes in order as well as an array
// of the shortest path in reversed order.
export function breadthFirstSearch(grid, startNode, targetNode, numRows, numCols) {
    const visitedNodesInOrder = [];
    const shortestPathReversed = [];
    const q = new Queue();
    q.enqueue(startNode);
    startNode.isVisited = true;
    while (!q.isEmpty()) {
        const node = q.dequeue();
        visitedNodesInOrder.push(node);
        if (node === targetNode) {
            // The target node was discovered.
            let pathNode = node.previousNode;
            while (pathNode !== startNode) {
                shortestPathReversed.push(pathNode);
                pathNode = pathNode.previousNode;
            }
            return {visitedNodesInOrder, shortestPathReversed};
        }
        const neighbors = getNeighbors(node, numRows, numCols, grid);
        for (const neighbor of neighbors) {
            if (!neighbor.isVisited) {
                q.enqueue(neighbor);
                neighbor.isVisited = true;
                neighbor.previousNode = node;
            }
        }
    }
    // The target node could not be reached.
    return {visitedNodesInOrder, shortestPathReversed};
}

// Add walls that can be placed.
// Add bridges that take you from one node to another in shorter time.
// Add weights that slow you down.