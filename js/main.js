import SkipList from "./skipList.js";
import Renderer from "./renderer.js";

let inputElement = document.getElementById("input");
let button = document.getElementById("button");

button.onclick = event => {
  event.preventDefault();

  let input = inputElement.value.split(" ");
  let skipList = new SkipList();

  input.forEach(value => {
    skipList.insert(Number(value));
  });

  let renderer = new Renderer(skipList);
  renderer.render();
};
