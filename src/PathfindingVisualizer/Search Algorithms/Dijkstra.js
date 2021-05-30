// Use dijkstra's algorithm to find a path from 'startNode' to 'targetNode' 
// in 'grid'. Return an array of the visited nodes in order as well as the
// shortest path in reversed order.
export function dijkstra (grid, startNode, targetNode, numRows, numCols) {
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
            let n = node.previousNode;
            while (n != startNode) {
                shortestPathReversed.push(n);
                n = n.previousNode;
            }
            return {visitedNodesInOrder, shortestPathReversed};
        }
        const neighbors = getNeighbors(node, numRows, numCols, grid);
        for (const neighbor of neighbors) {
            // Only update distance of neighbors if path results in lower distance.
            if (node.distance + 1 < neighbor.distance) {
                neighbor.distance = node.distance + 1;
                neighbor.previousNode = node;
            }
            // Only add unvisited nodes to the priority queue.
            if (!neighbor.isVisited) {
                neighbor.isVisited = true;
                priorityQueue.insert(neighbor);
            }
        }
    }    
    // The target node could not be reached.
    return {visitedNodesInOrder, shortestPathReversed};
}

// Returns true if row and col are on the board.
function isSafe(row, col, numRows, numCols) {
    if (row >= 0 && row < numRows &&
        col >= 0 && col < numCols) {
        return true;
    }
    return false;
}

// Returns ALL neighbors of 'node', visited or not.
function getNeighbors(node, numRows, numCols, grid) {
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

// Used to put nodes in a priority queue based on distance.
class MinHeap {
    constructor() {
        this.heap = [null];
    }

    // Insert an element into the heap and fix the heap.
    insert(node) {
        this.heap.push(node);
        let currIndex = this.heap.length - 1;
        let parentIndex = Math.floor(currIndex / 2);
        while (currIndex > 1 && node.distance < this.heap[parentIndex].distance) {
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
                if (this.heap[rightChildIndex].distance < minChild.distance) {
                    minChild = this.heap[rightChildIndex];
                    minIndex = rightChildIndex
                }
                if (this.heap[currIndex].distance > minChild.distance) {
                    [this.heap[currIndex], this.heap[minIndex]] = [this.heap[minIndex], this.heap[currIndex]];
                    currIndex = minIndex;
                } else {
                    break;
                }
                leftChildIndex = currIndex * 2;
                rightChildIndex = currIndex * 2 + 1;
            }
            // If there is one child node, swap it with currNode if currNode is smaller.
            if (this.heap[leftChildIndex] && (this.heap[currIndex].distance > this.heap[leftChildIndex].distance)) {
                [this.heap[currIndex], this.heap[leftChildIndex]] = [this.heap[leftChildIndex], this.heap[currIndex]];
            } else if (this.heap[rightChildIndex] && (this.heap[currIndex].distance > this.heap[rightChildIndex].distance)) {
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

