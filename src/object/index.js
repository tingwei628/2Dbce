// gb - good ball
const vx = 2;
const vy = 2;

function create(ctx, x, y) {
  ctx.beginPath();
  ctx.arc(x, y, 20, 0, Math.PI * 2, false);
  ctx.fillStyle = "green";
  ctx.fill();
  ctx.closePath();
}
function clear(ctx) {
  ctx.clearRect(0, 0, 500, 500);
}

class GB {
  constructor(ctx, x = 240, y = 160) {
    this.gb_x = x;
    this.gb_y = y;
    create(ctx, this.gb_x, this.gb_y);
  }
  move(ctx, dt) {
    clear(ctx);
    create(ctx, this.gb_x, this.gb_y);
    this.gb_x += vx * dt;
    console.log("exe");
    //this.gb_y += vy;
  }
}

// mp - magic power

// bb - bad ball
class BB {
  constructor(ctx, x = 240, y = 160) {
    this.bb_x = x;
    this.bb_y = y;
    create(ctx, this.bb_x, this.bb_y);
  }

  move(ctx, dt) {
    clear(ctx);
    create(ctx, this.bb_x, this.bb_y);
    this.bb_x += vx * dt;
    this.bb_y += vy * dt;
  }
}

export { GB, BB };
