import {
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
    this.vy = 3;
    this.dirx = 1;
    this.diry = 1;
    this.hp = hp;
    create(ctx, this.gb_x, this.gb_y, this.gb_r);
  }
  move() {
    this.gb_x += step(this.gb_x, this.vx, this.dirx, this.gb_r, "dirx", this);
    this.gb_y += step(this.gb_y, this.vy, this.diry, this.gb_r, "diry", this);
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

  move() {
    this.bb_x += step(this.bb_x, this.vx, this.dirx, this.bb_r, "dirx", this);
    this.bb_y += step(this.bb_y, this.vy, this.diry, this.bb_r, "diry", this);
  }
  render(ctx, target = null) {
    transaction(
      ctx,
      this.move.bind(this),
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
