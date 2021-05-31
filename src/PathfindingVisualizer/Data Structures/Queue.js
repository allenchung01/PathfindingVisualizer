// Used as a first-in, first-out datastructure.
export default class Queue {
    constructor() {
        this.queue = new DoublyLinkedList();
    }

    enqueue(node) {
        this.queue.insert(new ListNode(node));
    }

    dequeue() {
        return this.queue.popHead();
    }

    isEmpty() {
        return this.queue.isEmpty();
    }
}

class DoublyLinkedList {
    constructor(head = null) {
        this.head = head;
        this.tail = head;
    }

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
        if (listNode !== null) {
            this.head = this.head.getNext();
        }
        if (this.head === null) {
            this.tail = null;
        }
        return listNode.getData();
    }

    isEmpty() {
        return this.head === null;
    }
}

// The node to be used in the LinkedList.
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