import SkipList from "./skipList.js";

let skipList = new SkipList();

skipList.insert(5);
skipList.insert(15);
skipList.insert(12);
skipList.insert(14);
skipList.insert(1);
skipList.insert(13);

for (let number of skipList) {
  console.log(number);
}
