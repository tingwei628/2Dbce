export function create(ctx, x, y, r) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2, false);
  ctx.fillStyle = "green";
  ctx.fill();
  ctx.closePath();
}

export function clear(ctx) {
  ctx.clearRect(0, 0, 500, 500);
}

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

export function transaction(ctx, move, ...args) {
  ctx.restore();
  create(ctx, ...args);
  move();
  ctx.save();
}