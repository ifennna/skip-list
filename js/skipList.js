import ListItem from "./listItem.js";

export default class SkipList {
  constructor() {
    this.maxLanes = 0;
    this.head = new ListItem(Number.MIN_SAFE_INTEGER);
    this.terminator = new ListItem(Number.MAX_SAFE_INTEGER);

    this.head.next = [this.terminator];
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

    let current = this.head;

    for (let i = lanes; i >= 0; i--) {
      while (current.next[i] !== this.terminator) {
        if (current.lookAhead(node.value, i)) {
          break;
        } else {
          current = current.next[i];
        }
      }
      node.next[i] = current.next[i] || this.terminator;
      current.next[i] = node;
    }
  }

  delete(element) {
    let deleteComparison = (element, current, lane) =>
      current.next[lane] ? current.next[lane].value === element : false;
    let deleteCallback = current => (current.next = current.next[0].next);

    return this._seek({
      element,
      current: this.head,
      lane: this.maxLanes,
      comparison: deleteComparison,
      callback: deleteCallback
    });
  }

  find(element) {
    let equalityComparison = (element, current, ...rest) => current.value === element;

    return this._seek({ element, current: this.head, lane: this.maxLanes, comparison: equalityComparison });
  }

  _seek({ element, current, lane, comparison, callback = () => {} }) {
    if (comparison(element, current, lane)) {
      callback(current);
      return { match: true, value: current };
    } else {
      if (current.lookAhead(element, lane)) {
        return lane === 0
          ? { match: false, value: current }
          : this._seek({ element, current, lane: lane - 1, comparison, callback });
      } else {
        return this._seek({ element, current: current.next[lane], lane, comparison, callback });
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
          this.current = this.head;
          return { done: true };
        } else {
          const item = this.current;
          this.current.next[0] = this.current.next[0] || this.terminator;
          this.current = this.current.next[0];
          return { value: item, done: false };
        }
      }
    };
  }
}
