export default class ListItem {
  constructor(value) {
    this.value = value;
    this.next = { value: 10 };
  }

  lookAhead() {
    return this.value > this.next.value;
  }
}
