import { GB, BB } from "./object";
import "./style/main.css";
import { clear } from "./utils/ctxhelpers";

const canvas = document.getElementById("gm5");
const ctx = canvas.getContext("2d");

// record ball position states


let gb1 = new GB(ctx, 100, 50);
let gb2 = new GB(ctx, 80, 40);
let bb1 = new BB(ctx, 50, 100, 20, "red", 100, true);
let mybb1 = new BB(ctx, 30, 30, 30, "yellow", 100);

//simple time
let cancelId = null;

// let state = {
//   gb1: { x: gb1.gb_x, y: gb1.gb_y, r: gb1.gb_r },
//   gb2: { x: gb2.gb_x, y: gb2.gb_y, r: gb2.gb_r },
//   bb1: { x: bb1.bb_x, y: bb1.bb_y, r: bb1.bb_r, hp: bb1.hp },
//   mybb1: { x: mybb1.bb_x, y: mybb1.bb_y, r: mybb1.bb_r, hp: mybb1.hp },
// };




function start() {
  clear(ctx);
  gb1.render(ctx);
  gb2.render(ctx);
  bb1.hp > 0 ? bb1.render(ctx, gb1) : null;
  mybb1.hp > 0 ? mybb1.render(ctx) : null;
  cancelId = requestAnimationFrame(start);
}

start();

// when to end?
// cancelAnimationFrame(cancelId);
// hp  100 -> 150 => win
// hp  100 -> 0  => lose