export default class ListItem {
  constructor(value) {
    this.value = value;
    this.next = [];
  }

  lookAhead(element, index) {
    return this.next[index].value > element.value;
  }
}
