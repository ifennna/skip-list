import SkipList from "./skipList.js";
import Renderer from "./renderer.js";

let skipList = new SkipList();

skipList.insert(5);
skipList.insert(15);
skipList.insert(12);
skipList.insert(14);
skipList.insert(1);
skipList.insert(13);

const renderer = new Renderer(skipList);

renderer.render();
