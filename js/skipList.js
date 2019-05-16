import ListItem from "./listItem.js";

export default class SkipList {
  constructor() {
    this.lanes = 10;
    this.head = new ListItem(Number.MIN_SAFE_INTEGER);
    this.terminator = new ListItem(Number.MAX_SAFE_INTEGER);

    this.head.next = this.terminator;
    this.current = this.head;
  }

  insert(element) {
    element = new ListItem(element);

    let current = this.head;
    while (current.next !== this.terminator) {
      if (current.lookAhead(element)) {
        break;
      } else {
        current = current.next;
      }
    }
    element.next = current.next;
    current.next = element;
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
