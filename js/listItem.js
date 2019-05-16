export default class ListItem {
  constructor(value, levels) {
    this.levels = levels;
    this.value = this.addToLanes(value);
    this.next = [];
  }

  addToLanes(value) {
    return Array(this.levels).fill(value);
  }

  lookAhead(element, level) {
    return this.next.value[level] > element.value[level];
  }
}
