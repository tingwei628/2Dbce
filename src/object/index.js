import {
  create,
  clear,
  stepx,
  stepy,
  transaction
} from "../utils/opt";

// gb - good ball
class GB {
  constructor(ctx, x = 240, y = 160, r = 10) {
    this.gb_x = x;
    this.gb_y = y;
    this.gb_r = r;
    this.vx = 3;
    this.vy = -3;
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
  constructor(ctx, x = 240, y = 160, r = 10) {
    this.bb_x = x;
    this.bb_y = y;
    this.bb_r = r;
    this.vx = -3;
    this.vy = 3;
    create(ctx, this.bb_x, this.bb_y, this.bb_r);
  }

  move() {
    this.vx = stepx(this.bb_x, this.vx, this.bb_r);
    this.vy = stepy(this.bb_y, this.vy, this.bb_r);
    this.bb_x += this.vx;
    this.bb_y += this.vy;
  }
  render(ctx) {
    transaction(ctx, this.move.bind(this), this.bb_x, this.bb_y, this.bb_r);
  }
}

export { GB, BB };
