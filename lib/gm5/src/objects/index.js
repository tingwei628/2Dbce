import {
  stepx,
  stepy,
  step,
  mutualcollision
} from "../helpers/movehelpers";
import {
  create,
  clear,
  transaction
} from "../helpers/ctxhelpers";
import { xyrError } from "../errors/error";

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
  constructor(
    ctx,
    x = 240,
    y = 160,
    r = 10,
    color = "red",
    hp = 100,
    detected = false
  ) {
    xyrError(x, y, r);
    this.bb_x = x;
    this.bb_y = y;
    this.bb_r = r;
    this.dirx = -1;
    this.diry = 1;
    this.vx = 1;
    this.vy = 1;
    this.color = color;
    this.hp = hp;
    this.detected = detected;
    create(ctx, this.bb_x, this.bb_y, this.bb_r, this.color);
  }

  move(controller) {
    //arrow key
    if (controller != null) {
      // this.bb_x += controller.left();
      // this.bb_x += controller.right();
      // this.bb_y += controller.up();
      // this.bb_y += controller.down();
    }

    this.bb_x += step(this.bb_x, this.vx, this.dirx, this.bb_r);
    this.bb_y += step(this.bb_y, this.vy, this.diry, this.bb_r);
  }
  render(ctx, target = null, controller = null) {
    transaction(
      ctx,
      this.move.bind(this, controller),
      this.bb_x,
      this.bb_y,
      this.bb_r,
      this.color
    );
    this.collision(this, target);
  }
  collision(source, target) {
    if (this.detected && target !== null) {
      this.hp = mutualcollision(source, target);
    }
  }
}



export { GB, BB };
