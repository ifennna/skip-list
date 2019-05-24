export default class Renderer {
  constructor(skipList) {
    this.skipList = skipList;
    this.dom = "<tr>";
    this.canvas = document.getElementById("listCanvas");
  }

  render() {
    let node = this.skipList.head;

    for (let i = this.skipList.maxLanes; i >= 0; i--) {
      this.draw(node, i);
    }

    this.canvas.innerHTML = this.dom;
  }

  draw(node, lane) {
    if (node.next[lane] === this.skipList.terminator || !node.next[lane]) {
      this.paint(node.value);
      this.endRow();
    } else {
      this.paint(node.value);
      this.draw(node.next[lane], lane);
    }
  }

  paint(value) {
    this.dom += value === this.skipList.head.value ? "<tr>" : `<td>${value}</td>`;
  }

  endRow() {
    this.dom += "</tr>";
  }
}
