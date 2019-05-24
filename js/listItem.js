export default class ListItem {
  constructor(value) {
    this.value = value;
    this.next = [];
  }

  lookAhead(value, index) {
    return this.next[index] ? this.next[index].value > value : true;
  }
}
