// Used as a first-in, first-out datastructure.
export default class Queue {
    constructor() {
        this.queue = new DoublyLinkedList();
    }

    // Insert an element into the queue.
    enqueue(node) {
        this.queue.insert(new ListNode(node));
    }

    // Pop the first element from the queue.
    dequeue() {
        return this.queue.popHead();
    }

    // Returns true if the queue is has no elements.
    isEmpty() {
        return this.queue.isEmpty();
    }
}

class DoublyLinkedList {
    constructor(head = null) {
        this.head = head;
        this.tail = head;
    }

    // Returns the first element of the list.
    getHead() {
        return this.head.getData();
    }

    // Inserts an element onto the end of the list.
    insert(listNode) {
        if (this.tail !== null) {
            this.tail.setNext(listNode);
            this.tail = listNode;
        } else {
            this.head = listNode;
            this.tail = listNode;
        }
    }

    // Removes the first element from the list.
    popHead() {
        const listNode = this.head;
        console.log("list node:" + listNode);
        if (listNode !== null) {
            this.head = this.head.getNext();
        }
        if (this.head === null) {
            this.tail = null;
        }
        return listNode.getData();
    }

    // Returns true if there are no elements in the list.
    isEmpty() {
        return this.head === null;
    }
}

class ListNode {
    constructor(data) {
        this.data = data;
        this.next = null;
    }

    setNext(next) {
        this.next = next;
    }

    getNext() {
        return this.next;
    }

    getData() {
        return this.data;
    }
}