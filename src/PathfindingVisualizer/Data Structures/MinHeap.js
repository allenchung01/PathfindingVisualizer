// Used to put nodes in a priority queue based on distance.
export default class MinHeap {
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