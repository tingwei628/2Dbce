export function stepx(x, dx, r) {
  if (x + dx > (500 - r) || (x + dx < r)) {
    dx = -dx;
  }
  return dx;
}

export function stepy(y, dy, r) {
  if (y + dy > (500 - r) || (y + dy < r)) {
    dy = -dy;
  }
  return dy;
}


export function mutualcollision(source, target, state = null) {
  let bb1 = source;
  let gb1 = target;
  let dx2 = Math.pow(gb1.gb_x - bb1.bb_x, 2);
  let dy2 = Math.pow(gb1.gb_y - bb1.bb_y, 2);
  let d = Math.sqrt(dx2 + dy2);
  let hp = bb1.hp;

  //detected collision
  if (d < gb1.gb_r + bb1.bb_r) {
    hp -= 10;
  }
  return hp;
}