import { GB, BB } from "./object";
import "./style/main.css";
import { clear } from "./utils/ctxhelpers";

const canvas = document.getElementById("gm5");
const ctx = canvas.getContext("2d");
let cancelId = null;




// record ball position states


let gb1 = new GB(ctx, 100, 50);
let gb2 = new GB(ctx, 80, 40);
let bb1 = new BB(ctx, 50, 100, 20, "red", 300, true);
let bb2 = new BB(ctx, 150, 40, 20, "red", 200, true);
let mybb1 = new BB(ctx, 30, 30, 30, "yellow", 100);

document.onkeydown = function (evt) {
  switch (evt.keyCode) {
    case 37:
      left();
      break;
    case 38:
      up();
      break;
    case 39:
      right();
      break;
    case 40:
      down();
      break;
    // case 32: //SPACE (stop)
    //   stop();
    //   break;
    // case 13: //ENTER (start)
    //   start();
    //   break;
  }
}

//keybinding

function left() { return -2 }
function up() { return -2; }
function right() { return 2; }
function down() { return 2; }



// let state = {
//   gb1: { x: gb1.gb_x, y: gb1.gb_y, r: gb1.gb_r },
//   gb2: { x: gb2.gb_x, y: gb2.gb_y, r: gb2.gb_r },
//   bb1: { x: bb1.bb_x, y: bb1.bb_y, r: bb1.bb_r, hp: bb1.hp },
//   mybb1: { x: mybb1.bb_x, y: mybb1.bb_y, r: mybb1.bb_r, hp: mybb1.hp },
// };
// function stop(cancelId) {
//   cancelAnimationFrame(cancelId);
// }



function start() {
  clear(ctx);
  gb1.render(ctx);
  gb2.render(ctx);
  bb1.hp > 0 ? bb1.render(ctx, gb1) : null;
  bb2.hp > 0 ? bb2.render(ctx, gb1) : null;
  mybb1.hp > 0 ? mybb1.render(ctx) : null;
  cancelId = requestAnimationFrame(start);
}

start();

// when to end?
// cancelAnimationFrame(cancelId);
// hp  100 -> 150 => win
// hp  100 -> 0  => lose