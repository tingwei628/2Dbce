import {
  step,
} from "../helpers/movehelpers";
import {
  create,
  clear,
  transaction
} from "../helpers/ctxhelpers";
import { xyrValidate, ballstickyValidate } from "../errors/error";


// mp - magic power
/////////////
// bb - bad ball
class BB {
  constructor(
    ctx,
    x = 240,
    y = 160,
    r = 10,
    color = "red",
    ballid = "",
    dirx = 1,
    diry = 1,
    hp = 100,
    detected = false
  ) {
    xyrValidate(x, y, r);
    this.bb_x = x;
    this.bb_y = y;
    this.bb_r = r;
    this.dirx = dirx;
    this.diry = diry;
    this.vx = 8;
    this.vy = 8;
    this.color = color;
    this.hp = hp;
    this.detected = detected;
    this.ballid = ballid;
    create(ctx, this.bb_x, this.bb_y, this.bb_r, this.color);
  }

  move(targets) {
    step(this, targets);
  }
  render(ctx, targets) {
    transaction(
      ctx,
      this.move.bind(this, targets),
      this.bb_x,
      this.bb_y,
      this.bb_r,
      this.color
    );
  }
}
function generateballs(ctx, states) {
  let balls = [];
  for (let i = 0; i < states.length; i++) {
    let state_i = states[i];
    let newball = new BB(ctx,
      state_i.x,
      state_i.y,
      state_i.r,
      state_i.color,
      `ball_level_${i}`, state_i.dirx, state_i.diry);
    // check initial position between balls, and exclude no sticky balls around
    balls.push(newball);
    for (let j = 1; j < balls.length; j++) {
      ballstickyValidate(balls[j - 1], newball);
    }
  }
  return balls;
}



export { BB, generateballs };
