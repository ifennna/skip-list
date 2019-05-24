import ListItem from "./listItem.js";

export default class SkipList {
  constructor() {
    this.maxLanes = 1;
    this.head = new ListItem(Number.MIN_SAFE_INTEGER);
    this.terminator = new ListItem(Number.MAX_SAFE_INTEGER);

    this.head.next = Array(this.maxLanes).fill(this.terminator);
    this.current = this.head;
  }

  insert(element) {
    let lanes = 1;
    while (Math.floor(Math.random() * 2) === 1) {
      lanes++;
      while (lanes > this.maxLanes) {
        this.maxLanes++;
        this.head.next.push(null);
      }
    }

    let node = new ListItem(element);
    node.next = Array(lanes).fill(element);

    let current = this.head;

    for (let i = lanes; i >= 0; i--) {
      while (current.next[i] !== this.terminator) {
        if (current.lookAhead(node, i)) {
          break;
        } else {
          current = current.next[i];
        }
      }
      node.next[i] = current.next[i];
      current.next[i] = node;
    }
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
          this.current = this.current.next[0];
          return { value: item, done: false };
        }
      }
    };
  }
}
