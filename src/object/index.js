// gb - good ball

function create(ctx, x, y, r) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2, false);
  ctx.fillStyle = "green";
  ctx.fill();
  ctx.closePath();
}
function clear(ctx) {
  ctx.clearRect(0, 0, 500, 500);
}

function stepx(x, dx, r) {
  if (x + dx > (500 - r) || (x + dx < r)) {
    dx = -dx;
  }
  return dx;
}
function stepy(y, dy, r) {
  if (y + dy > (500 - r) || (y + dy < r)) {
    dy = -dy;
  }
  return dy;
}

class GB {
  constructor(ctx, x = 240, y = 160, r = 10) {
    this.gb_x = x;
    this.gb_y = y;
    this.gb_r = r;
    this.vx = 3;
    this.vy = -3;
    create(ctx, this.gb_x, this.gb_y, this.gb_r);
  }
  move(ctx) {
    clear(ctx);
    create(ctx, this.gb_x, this.gb_y, this.gb_r);
    this.vx = stepx(this.gb_x, this.vx, this.gb_r);
    this.vy = stepy(this.gb_y, this.vy, this.gb_r);
    this.gb_x += this.vx;
    this.gb_y += this.vy;
  }
}

// mp - magic power

// bb - bad ball
class BB {
  constructor(ctx, x = 240, y = 160, r = 10) {
    this.bb_x = x;
    this.bb_y = y;
    this.bb_r = r;
    this.vx = 3;
    this.vy = -3;
    create(ctx, this.bb_x, this.bb_y, this.bb_r);
  }

  move(ctx) {
    clear(ctx);
    create(ctx, this.bb_x, this.bb_y, this.bb_r);
    this.vx = stepx(this.bb_x, this.vx, this.bb_r);
    this.vy = stepy(this.bb_y, this.vy, this.bb_r);
    this.bb_x += this.vx;
    this.bb_y += this.vy;
  }
}

export { GB, BB };
