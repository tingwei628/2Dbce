export function stepx(x, dx, dirx, r) {
  // total width = 500

  if ((x + dx > (500 - r)) || (x + dx < r)) {
    dirx = -dirx;
  }
  return dirx * dx;
}

export function stepy(y, dy, diry, r) {
  // total height = 500

  if ((y + dy > (500 - r)) || (y + dy < r)) {
    diry = -diry;
  }
  return diry * dy;
}

export function step(d, dd, dir, r) {
  // total height = 500

  if ((d + dd > (500 - r)) || (d + dd < r)) {
    dir = -dir;
  }
  return dir * dd;
}

export function iscollide(d, dd, dir, r) {
  if ((d + dd > (500 - r)) || (d + dd < r)) {
    dir = -dir;
  }
  return dir;
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