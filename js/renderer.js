export default class Renderer {
  constructor(skipList) {
    this.skipList = skipList;
    this.canvas = document.getElementById("listCanvas");
  }

  render() {
    let node = this.skipList.head;

    for (let i = this.skipList.maxLanes - 1; i >= 0; i--) {
      this.draw(node, i);
    }
  }

  draw(node, lane) {
    if (node.next[lane] === this.skipList.terminator) {
      this.paint(node.value);
      this.paint("END");
    } else {
      this.paint(node.value);
      this.draw(node.next[lane], lane);
    }
  }

  paint(value) {
    let box = document.createElement("div");
    box.classList.add("node");
    box.innerText = value === this.skipList.head.value ? "HEAD" : value;
    this.canvas.appendChild(box);
  }
}
