import { GB, BB } from "./objects";
import "./styles/main.css";
import { clear } from "./helpers/ctxhelpers";

const canvas = document.getElementById("gm5");
const scoreHtml = document.getElementById("score");
const ctx = canvas.getContext("2d");
let cancelId = null;




// record ball position states


let gb1 = new GB(ctx, 100, 50);
let gb2 = new GB(ctx, 80, 40);
let bb1 = new BB(ctx, 50, 100, 20, "red", 300, true);
let bb2 = new BB(ctx, 150, 40, 20, "red", 200, true);
let mybb1 = new BB(ctx, 30, 30, 30, "yellow", 100);

let isRegistered = false;

//keybinding
function controller(obj) {
  const self = obj;
  return {
    left: () => {
      self.bb_x -= 8;
    },
    right: () => {
      self.bb_x += 8;
    },
    up: () => {
      self.bb_y -= 8;
    },
    down: () => {
      self.bb_y += 8;
    }
  }
}
const mybb1controller = controller(mybb1);

function register() {
  //if (!isRegistered) {
  window.addEventListener("keydown", function (evt) {
    //console.log(e.keyCode);
    //e.preventDefault();
    switch (evt.keyCode) {
      case 37:
        mybb1controller.left();
        break;
      //case 38:
      case 87:
        mybb1controller.up();
        break;
      case 39:
        mybb1controller.right();
        break;
      case 40:
        mybb1controller.down();
        break;
      // case 32: //SPACE (stop)
      //   stop();
      //   break;
      // case 13: //ENTER (start)
      //   start();
      //   break;
    }
  }, false);

  //isRegistered = true;

  // stop recover isRegistered false
  //}
}



// let state = {
//   gb1: { x: gb1.gb_x, y: gb1.gb_y, r: gb1.gb_r },
//   gb2: { x: gb2.gb_x, y: gb2.gb_y, r: gb2.gb_r },
//   bb1: { x: bb1.bb_x, y: bb1.bb_y, r: bb1.bb_r, hp: bb1.hp },
//   mybb1: { x: mybb1.bb_x, y: mybb1.bb_y, r: mybb1.bb_r, hp: mybb1.hp },
// };
// function stop(cancelId) {
//   cancelAnimationFrame(cancelId);
// }


//HP: 100/ Red: 2

function start() {
  clear(ctx);
  gb1.render(ctx);
  gb2.render(ctx);
  bb1.hp > 0 ? bb1.render(ctx, gb1) : null;
  bb2.hp > 0 ? bb2.render(ctx, gb1) : null;
  mybb1.hp > 0 ? mybb1.render(ctx, null, mybb1controller) : null;
  //let red = 2 - (bb1.hp > 0 ? 0 : 1) - (bb2.hp > 0 ? 0 : 1);
  //if (red === 0) red += "\nDONE! PLEASE REFRESH(F5)"
  //scoreHtml.innerHTML = `HP: ${bb1.hp + bb2.hp}/ RED: ${red}`;
  cancelId = requestAnimationFrame(start);
}

register();
start();

// when to end?
// cancelAnimationFrame(cancelId);
// hp  100 -> 150 => win
// hp  100 -> 0  => lose