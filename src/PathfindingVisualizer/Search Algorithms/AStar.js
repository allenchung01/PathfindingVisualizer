import {getNeighbors} from './SearchHelperFunctions'

export function aStar(grid, startNode, targetNode, numRows, numCols) {
    const priorityQueue = new MinHeap(targetNode);
    const visitedNodesInOrder = [];
    const shortestPathReversed = [];
    // Start the algorithm at the startNode.
    startNode.distance = 0;
    startNode.isVisited = true;
    priorityQueue.insert(startNode, targetNode);
    // Traverse nodes until priority queue is empty.
    while (!priorityQueue.isEmpty()) {
        const node = priorityQueue.pop();
        visitedNodesInOrder.push(node);
        if (node === targetNode) {
            // The target Node was discovered.
            let pathNode = node;
            while (pathNode !== startNode) {
                shortestPathReversed.push(pathNode);
                pathNode = pathNode.previousNode;
            }
            shortestPathReversed.push(pathNode);
            return {visitedNodesInOrder, shortestPathReversed};
        }
        // Get neighboring nodes and add to priority queue if unvisited.
        const neighbors = getNeighbors(node, numRows, numCols, grid);
        for (const neighbor of neighbors) {
            if (!neighbor.isVisited) {
                // Update the neighbor's distance.
                neighbor.distance = node.distance + 1;
                neighbor.previousNode = node;
                priorityQueue.insert(neighbor, targetNode);
                neighbor.isVisited = true;
            } else {
                // Update neighbor's distance to minimum of possible routes to that neighbor.
                if (node.distance + 1 < neighbor.distance) {
                    neighbor.distance = node.distance + 1;
                    neighbor.previousNode = node;
                    // Insert the neighbor into the queue again.
                    priorityQueue.insert(neighbor, targetNode);
                }
            }
        }
    }
    // The target node could not be reached.
    return {visitedNodesInOrder, shortestPathReversed};
}

// G function for aStar that returns distance it took to get to specified node.
function g(node) {
    return node.distance;
}

// Heuristic function for aStar using Manhattan distance.
function h(node, targetNode) {
    const dx = Math.abs(targetNode.row - node.row);
    const dy = Math.abs(targetNode.col - node.col);
    return dx + dy;
}

function f(node, targetNode) {
    return h(node, targetNode) + g(node);
}

// Used to put nodes in a priority queue based on f score (g + h). This priority queue does
// not support reprioritizing. Instead, nodes in the queue with updated distances are inserted
// into the queue a second time. This is okay because it won't really affect runtime.
class MinHeap {
    constructor(targetNode) {
        this.heap = [null];
        this.targetNode = targetNode;
    }

    // Insert an element into the heap and fix the heap.
    insert(node, targetNode) {
        this.heap.push(node);
        let currIndex = this.heap.length - 1;
        let parentIndex = Math.floor(currIndex / 2);
        while (currIndex > 1 && f(node, targetNode) <= f(this.heap[parentIndex], targetNode)) {
            [this.heap[parentIndex], this.heap[currIndex]] = [this.heap[currIndex], this.heap[parentIndex]];
            currIndex = parentIndex;
            parentIndex = Math.floor(currIndex / 2);
        }
    }

    // Pop minimum element from the front of the heap and fix the heap.
    pop() {
        if (this.heap.length > 2) {
            const head = this.heap[1];
            const tail = this.heap.splice(this.heap.length - 1)[0];
            this.heap[1] = tail;

            let currIndex = 1;
            let leftChildIndex = currIndex * 2;
            let rightChildIndex = currIndex * 2 + 1;
            // While there are two child nodes, swap currNode with minChild if minChild is smaller.
            while (this.heap[leftChildIndex] && this.heap[rightChildIndex]) {
                let minChild = this.heap[leftChildIndex];
                let minIndex = leftChildIndex;
                if (f(this.heap[rightChildIndex], this.targetNode) < f(minChild, this.targetNode)) {
                    minChild = this.heap[rightChildIndex];
                    minIndex = rightChildIndex
                }
                if (f(this.heap[currIndex], this.targetNode) > f(minChild, this.targetNode)) {
                    [this.heap[currIndex], this.heap[minIndex]] = [this.heap[minIndex], this.heap[currIndex]];
                    currIndex = minIndex;
                } else {
                    break;
                }
                leftChildIndex = currIndex * 2;
                rightChildIndex = currIndex * 2 + 1;
            }
            // If there is one child node, swap it with currNode if currNode is smaller.
            if (this.heap[leftChildIndex] && (f(this.heap[currIndex], this.targetNode) > f(this.heap[leftChildIndex], this.targetNode))) {
                [this.heap[currIndex], this.heap[leftChildIndex]] = [this.heap[leftChildIndex], this.heap[currIndex]];
            } else if (this.heap[rightChildIndex] && (f(this.heap[currIndex], this.targetNode) > f(this.heap[rightChildIndex], this.targetNode))) {
                [this.heap[currIndex], this.heap[rightChildIndex]] = [this.heap[rightChildIndex], this.heap[currIndex]];
            }
            return head;
        } else if (this.heap.length === 2) {
            return this.heap.splice(1, 1)[0];
        } else {
            return null;
        }
    }

    // Returns true if the minheap is empty.
    isEmpty() {
        if (this.heap.length < 2) {
            return true;
        }
        return false;
    }
}