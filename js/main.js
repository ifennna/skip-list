import SkipList from "./skipList.js";

let inputElement = document.getElementById("input");
let buildTrigger = document.getElementById("button");
let searchInput = document.getElementById("searchInput");
let searchTrigger = document.getElementById("searchButton");
let searchResult = document.getElementById("searchResult");

let skipList;

buildTrigger.onclick = event => {
  event.preventDefault();

  let input = inputElement.value.split(" ");
  skipList = new SkipList();

  input.forEach(value => {
    skipList.insert(Number(value));
  });

  skipList.render();
};

searchTrigger.onclick = event => {
  event.preventDefault();
  let input = Number(searchInput.value);

  if (!(skipList instanceof SkipList)) return;

  let result = skipList.find(input);
  console.log(result);

  searchResult.innerText = result.match ? `This node exists in the list` : `This node doesn't exist in the list`;
};
