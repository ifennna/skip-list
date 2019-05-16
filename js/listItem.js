export default class ListItem {
  constructor(value) {
    this.value = value;
    this.next = { value: 10 };
  }

  lookAhead(element) {
    return this.next.value > element.value;
  }
}
