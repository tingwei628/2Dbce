import { GB, BB } from "./object";
import "./style/canvas.css";
import { clear } from "./utils/opt";
document.getElementById("root").innerHTML = "gm5 - A ball collision game";
const canvas = document.getElementById("gm5");
const ctx = canvas.getContext("2d");

let gb1 = new GB(ctx, 100, 50);
let gb2 = new GB(ctx, 80, 40);
let bb1 = new BB(ctx, 50, 100);

//simple time
let cancelId = null;

function start() {
  clear(ctx);
  gb1.render(ctx);
  gb2.render(ctx);
  bb1.render(ctx);
  cancelId = requestAnimationFrame(start);
}

start();

// when to end?
// cancelAnimationFrame(cancelId);
