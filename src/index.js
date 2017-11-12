import { GB, BB } from "./object";
import "./style/canvas.css";
document.getElementById("root").innerHTML = "gm5 - A ball collision game";
const canvas = document.getElementById("gm5");
const ctx = canvas.getContext("2d");

let gb1 = new GB(ctx, 100, 50);
let bb1 = new BB(ctx, 50, 100);

//simple time
let cancelId = null;

function start() {
  gb1.move(ctx);
  bb1.move(ctx);
  cancelId = requestAnimationFrame(start);
}

start();

// when to end?
// cancelAnimationFrame(cancelId);
