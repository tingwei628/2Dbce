import { BB, generateballs } from "./objects";
import "./styles/main.css";
import { clear } from "./helpers/ctxhelpers";
import { iscollide } from "./helpers/movehelpers";


const canvas = document.getElementById("gm5");
const scoreHtml = document.getElementById("score");
const ctx = canvas.getContext("2d");
let cancelId = null;



// set js monitor
let stats = new Stats();
stats.showPanel(1); // 0: fps, 1: ms, 2: mb, 3+: custom
stats.dom.style.position = 'absolute';
stats.dom.style.right = 0;
stats.dom.style.top = 0;
document.body.appendChild(stats.dom);

// record ball position states
////
function random_int_range(min, max) {
  if (max <= min && (min !== 0 && max !== 0))
    throw new TypeError("max must be larger than min");
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function generate_states() {
  let colors = ["blue", "red", "green", "pink"];
  //let colors = ["blue", "red"];
  //let colors = ["white"];
  let stateMap = new Map();
  let dirs = [1, -1];
  let r = 15;
  let y = 0;
  let x = 0;
  let boundry = 500;
  let num = Math.floor(boundry / r - 1);
  //let num = 5;
  for (let i = 1; i <= num; i++) {
    x = r + (2 * i - 1) * r;
    for (let j = 1; j <= num; j++) {
      y = r + (2 * j - 1) * r;
      // color is style, so it needs to be batched.
      let ballColor = colors[random_int_range(0, colors.length - 1)];
      let ballObj = {
        x: x,
        y: y,
        r: r,
        color: ballColor,
        dirx: dirs[random_int_range(0, 1)],
        diry: dirs[random_int_range(0, 1)]
      };
      if (stateMap.has(ballColor)) {
        let ballObjs = stateMap.get(ballColor);
        ballObjs.push(ballObj);
      } else {
        stateMap.set(ballColor, [ballObj]);
      }
    }
  }
  return stateMap;
}
// var states = [
//   { x: 30, y: 160, r: 20, color: "blue" },
//   { x: 70, y: 60, r: 20, color: "red" },
//   { x: 150, y: 60, r: 20, color: "green" },
//   { x: 50, y: 100, r: 20, color: "pink" }
// ];
var stateMap = generate_states();
var ballMap = generateballs(ctx, stateMap);
//let mybb1 = new BB(ctx, 30, 30, 30, "yellow", 100);

let isRegistered = false;
//maxVx
//maxVy
//define its a(acceleration)

//original a = 0
//keybinding
function isdiffdir(fdir, selfdir) {
  return fdir * selfdir < 0;
}




// f=ma; m=1 ...
// f=a
function setvx(self, fdir, fx, maxVx) {
  let dv = fx;
  console.log(self.vx);
  // check if collided first
  if (!isdiffdir(fdir, self.dirx) &&
    iscollide(self.bb_x, self.vx, self.dirx, self.bb_r)) {
    self.dirx = -self.dirx;
    return;
  }
  ///
  if (isdiffdir(fdir, self.dirx)) {
    self.dirx = fdir;
    if (self.vx - dv >= 0) {
      self.vx -= dv;
    }
    return;
  }
  if (self.vx + dv <= maxVx) {
    self.vx += dv;
  }
}

function setvy(self, fdir, fy, maxVy) {
  let dv = fy;

  if (!isdiffdir(fdir, self.diry) &&
    iscollide(self.bb_y, self.vy, self.diry, self.bb_r)) {
    self.diry = -self.diry;
    return;
  }

  if (isdiffdir(fdir, self.diry)) {
    self.diry = fdir;
    if (self.vy - dv >= 0) {
      self.vy -= dv;
    }
    return;
  }
  if (self.vy + dv <= maxVy) {
    self.vy += dv;
  }
}


function controller(obj) {
  let self = obj;

  // scalr
  let fx = 1;
  let fy = 1;
  let maxVx = 5;
  let maxVy = 5;
  return {
    left: setvx.bind(self, self, -1, fx, maxVx),
    right: setvx.bind(self, self, 1, fx, maxVx),
    up: setvy.bind(self, self, -1, fy, maxVy),
    down: setvy.bind(self, self, 1, fy, maxVy)
  }
}
//const mybb1controller = controller(mybb1);
/////
function register() {
  //if (!isRegistered) {
  window.addEventListener("keydown", function (evt) {
    //console.log(e.keyCode);
    // when keydown event emit, stepx(), stepy() should change direction
    // as the keydown arrow key
    // note: it should follow the boundary rule.
    switch (evt.keyCode) {
      case 37:
        mybb1controller.left();
        break;
      case 38:
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
//   bb1: { x: bb1.bb_x, y: bb1.bb_y, r: bb1.bb_r, hp: bb1.hp },
//   mybb1: { x: mybb1.bb_x, y: mybb1.bb_y, r: mybb1.bb_r, hp: mybb1.hp },
// };
// function stop(cancelId) {
//   cancelAnimationFrame(cancelId);
// }

//////////RELOAD
//HP: 100/ Red: 2
/////////

function start() {
  stats.begin();
  clear(ctx);
  let allBalls = [];
  // ballMap.forEach((balls) => {
  //   allBalls = allBalls.concat(balls);
  // });
  ballMap.forEach((balls, key_color) => {
    ctx.beginPath();
    for (let num = 0; num < balls.length; num++) {
      balls[num].render(ctx, balls);
    }

    ctx.fillStyle = key_color;
    ctx.fill();
  });

  //mybb1.render(ctx, null);
  // bb1.hp > 0 ? bb1.render(ctx, gb1) : null;
  // bb2.hp > 0 ? bb2.render(ctx, gb1) : null;
  // mybb1.hp > 0 ? mybb1.render(ctx, null) : null;
  //let red = 2 - (bb1.hp > 0 ? 0 : 1) - (bb2.hp > 0 ? 0 : 1);
  //if (red === 0) red += "\nDONE! PLEASE REFRESH(F5)"
  //scoreHtml.innerHTML = `HP: ${bb1.hp + bb2.hp}/ RED: ${red}`;

  stats.end();

  cancelId = requestAnimationFrame(start);
}

register();
//start();
setTimeout(start, 500);

// when to end?
// cancelAnimationFrame(cancelId);
// hp  100 -> 150 => win
// hp  100 -> 0  => lose