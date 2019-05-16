import ListItem from "./listItem.js";

export default class SkipList {
  constructor() {
    this.maxLane = 10;
    this.head = new ListItem(Number.MIN_SAFE_INTEGER, this.maxLane);
    this.terminator = new ListItem(Number.MAX_SAFE_INTEGER, this.maxLane);

    this.head.next = this.terminator;
    this.current = this.head;
  }

  insert(element) {
    element = new ListItem(element, 5);
    let currentLane = this.maxLane;

    let currentNode = this.head;
    while (currentNode.next !== this.terminator) {
      if (currentNode.lookAhead(element, currentLane)) {
        break;
      } else {
        currentNode = currentNode.next;
      }
    }
    element.next = currentNode.next;
    currentNode.next = element;
  }

  delete(element) {}

  find(element) {}

  match(element) {}

  [Symbol.iterator]() {
    return {
      next: () => {
        if (this.current === this.terminator) {
          return { done: true };
        } else {
          const item = this.current;
          this.current = this.current.next;
          return { value: item, done: false };
        }
      }
    };
  }
}
