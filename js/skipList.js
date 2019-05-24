import ListItem from "./listItem.js";

export default class SkipList {
  constructor() {
    this.maxLanes = 0;
    this.head = new ListItem(Number.MIN_SAFE_INTEGER);
    this.terminator = new ListItem(Number.MAX_SAFE_INTEGER);

    this.head.next = Array(this.maxLanes).fill(this.terminator);
    this.current = this.head;
  }

  insert(element) {
    let lanes = 0;
    while (Math.floor(Math.random() * 2) === 1) {
      lanes++;
      while (lanes > this.maxLanes) {
        this.maxLanes++;
      }
    }

    let node = new ListItem(element);
    node.next = Array(lanes).fill(element);

    let current = this.head;

    for (let i = lanes; i >= 0; i--) {
      while (current.next[i] !== this.terminator) {
        if (current.lookAhead(node.value, i)) {
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

  find(element) {
    let current = this.head;

    return this.seek(element, current, this.maxLanes);
  }

  seek(element, current, lane) {
    if (current.value === element) {
      return { match: true, value: current };
    } else {
      if (current.lookAhead(element, lane)) {
        return lane === 0 ? { match: false, value: current } : this.seek(element, current, lane - 1);
      } else {
        return this.seek(element, current.next[lane], lane);
      }
    }
  }

  render() {
    let canvas = document.getElementById("listCanvas");
    let dom = "";
    for (let node of this) {
      node.next[0].number = node.next.length;
      if (node !== this.head && node !== this.terminator) {
        dom += `<div class="nodeGroup">` + `<div class="node">${node.value}</div>`.repeat(node.number) + `</div>`;
      }
    }
    canvas.innerHTML = dom;
  }

  [Symbol.iterator]() {
    return {
      next: () => {
        if (this.current === this.terminator) {
          return { done: true };
        } else if (!this.current.next[0]) {
          return { value: this.current, done: true };
        } else {
          const item = this.current;
          this.current = this.current.next[0];
          return { value: item, done: false };
        }
      }
    };
  }
}
