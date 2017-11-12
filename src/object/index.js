import {
  create,
  clear,
  stepx,
  stepy,
  transaction
} from "../utils/opt";
import { xyrError } from "../utils/error";

// gb - good ball
class GB {
  constructor(ctx, x = 240, y = 160, r = 10, hp = 100) {
    xyrError(x, y, r);
    this.gb_x = x;
    this.gb_y = y;
    this.gb_r = r;
    this.vx = 3;
    this.vy = -3;
    this.hp = hp;
    create(ctx, this.gb_x, this.gb_y, this.gb_r);
  }
  move() {
    this.vx = stepx(this.gb_x, this.vx, this.gb_r);
    this.vy = stepy(this.gb_y, this.vy, this.gb_r);
    this.gb_x += this.vx;
    this.gb_y += this.vy;
  }
  render(ctx) {
    transaction(ctx, this.move.bind(this), this.gb_x, this.gb_y, this.gb_r);
  }
}

// mp - magic power

// bb - bad ball
class BB {
  constructor(ctx, x = 240, y = 160, r = 10, color = "red", hp = 100) {
    xyrError(x, y, r);
    this.bb_x = x;
    this.bb_y = y;
    this.bb_r = r;
    this.vx = -3;
    this.vy = 3;
    this.color = color;
    this.hp = hp;
    create(ctx, this.bb_x, this.bb_y, this.bb_r, this.color);
  }

  move() {
    this.vx = stepx(this.bb_x, this.vx, this.bb_r);
    this.vy = stepy(this.bb_y, this.vy, this.bb_r);
    this.bb_x += this.vx;
    this.bb_y += this.vy;
  }
  render(ctx) {
    transaction(ctx, this.move.bind(this), this.bb_x, this.bb_y, this.bb_r, this.color);
  }
  collision(detected, b, target) {
    if (detected) {
      this.hp = mutualcollision(b, target);
      console.log("xxxxxx", this.hp);
    }
  }
}


function mutualcollision(b, target, state = null) {
  let bb1 = b;
  let gb1 = target;
  let dx2 = Math.pow(gb1.x - bb1.x, 2);
  let dy2 = Math.pow(gb1.y - bb1.y, 2);
  let d = Math.sqrt(dx2 + dy2);
  let hp = bb1.hp;
  if (d < gb1.r + bb1.r) {
    console.log("撞到惹");
    hp = hp - 10;
    console.log("----> after collision ", state.bb1.hp);
  }
  console.log("dfdfdfdffdfdfdf", hp);
  return hp;

}
export { GB, BB };
