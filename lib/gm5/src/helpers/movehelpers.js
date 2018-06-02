// export function step(d, v, dirVal, r, dirKey, obj, target) {
//   // total height = 500
//   if (iscollide(d, v, dirVal, r)) {
//     dirVal = -dirVal;
//     obj[dirKey] = dirVal;
//   }
//   if (target != null && target instanceof Array) {
//     var targetlen = target.length
//     for (let num = 0; num < targetlen; num++) {
//       if (obj.ballid === target[num].ballid) continue;
//       mutualcollision(obj, target[num]);
//     }
//   }

//   return dirVal * v;
// }

export function step(obj, target) {
  // total height = 500


  if (target != null && target instanceof Array) {
    var targetlen = target.length
    for (let num = 0; num < targetlen; num++) {
      if (obj.ballid === target[num].ballid) continue;
      mutualcollision(obj, target[num]);
    }
  }

  /// check collide with wall
  if (iscollide(obj.bb_x, obj.vx, obj.dirx, obj.bb_r)) {
    obj.dirx = -obj.dirx;
  }
  if (iscollide(obj.bb_y, obj.vy, obj.diry, obj.bb_r)) {
    obj.diry = -obj.diry;
  }
  obj.bb_x += obj.dirx * obj.vx;
  obj.bb_y += obj.diry * obj.vy;
  //return dirVal * v;
  // return obj;
}

// width = height = 500
export function iscollide(d, v, dir, r) {
  let dd = d + v * dir;
  return (dd >= (500 - r)) || (dd <= r);
}

export function isballcollide(source, target) {
  let s = source;
  let t = target;
  let dx2 = Math.pow(s.bb_x - t.bb_x, 2);
  let dy2 = Math.pow(s.bb_y - t.bb_y, 2);
  let d = Math.sqrt(dx2 + dy2);
  return d < (s.bb_r + t.bb_r);
}
export function mutualcollision(source, target, state = null) {
  //detected collision
  if (isballcollide(source, target)) {
    //hp -= 10;
    exchange(source, target);
  }
  //return hp;
}
//ELASTIC and obj1 and obj2 mass are equal
function exchange(obj1, obj2) {
  var temp1 = obj2.vx;
  var temp2 = obj2.vy;
  var tempdirx = obj2.dirx;
  var tempdiry = obj2.diry;
  obj2.vx = obj1.vx;
  obj2.vy = obj1.vy;
  obj2.dirx = obj1.dirx;
  obj2.diry = obj1.diry;

  obj1.vx = temp1;
  obj1.vy = temp2;
  obj1.dirx = tempdirx;
  obj1.diry = tempdiry;
}