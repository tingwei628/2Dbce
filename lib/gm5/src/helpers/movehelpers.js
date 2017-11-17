export function step(d, v, dirVal, r, dirKey, obj) {
  // total height = 500
  if (iscollide(d, v, dirVal, r)) {
    dirVal = -dirVal;
    obj[dirKey] = dirVal;
  }
  return dirVal * v;
}

// width = height = 500
export function iscollide(d, v, dir, r) {
  let dd = d + v * dir;
  return (dd >= (500 - r)) || (dd <= r);
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