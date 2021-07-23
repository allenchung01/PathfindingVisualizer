import MinHeap from "../Data Structures/MinHeap";
import { getNeighbors } from "./SearchHelperFunctions";

// Use dijkstra's algorithm to find the shortest path from 'startNode' to
//'targetNode' in 'grid'. Return an array of the visited nodes in order as
// well as the shortest path in reversed order.
export function dijkstra(
  grid,
  startNode,
  targetNode,
  numRows,
  numCols,
  weightValue
) {
  startNode.distance = 0;
  const priorityQueue = new MinHeap();
  const visitedNodesInOrder = [];
  const shortestPathReversed = [];
  priorityQueue.insert(startNode);
  while (!priorityQueue.isEmpty()) {
    const node = priorityQueue.pop();
    visitedNodesInOrder.push(node);
    if (node === targetNode) {
      // The target node was discovered.
      let pathNode = node;
      while (pathNode !== startNode) {
        shortestPathReversed.push(pathNode);
        pathNode = pathNode.previousNode;
      }
      shortestPathReversed.push(pathNode);
      return { visitedNodesInOrder, shortestPathReversed };
    }
    const neighbors = getNeighbors(node, numRows, numCols, grid);
    for (const neighbor of neighbors) {
      const weight = neighbor.isWeight ? weightValue : 1;
      // Only update distance of neighbors if path results in lower distance.
      if (node.distance + weight < neighbor.distance) {
        neighbor.distance = node.distance + weight;
        neighbor.previousNode = node;
      }
      // Only add unvisited nodes to the priority queue.
      if (!neighbor.isVisited) {
        neighbor.isVisited = true;
        priorityQueue.insert(neighbor);
      }
      //priorityQueue.insert(neighbor);
    }
  }
  // The target node could not be reached.
  return { visitedNodesInOrder, shortestPathReversed };
}
