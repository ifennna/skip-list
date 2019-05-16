import ListItem from "listItem";

export default class SkipList {
  constructor() {
    this.head = new ListItem(Number.MIN_SAFE_INTEGER);
    this.terminator = new ListItem(Number.MAX_SAFE_INTEGER);
    this.current = this.head;
  }

  insert(element) {}

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
