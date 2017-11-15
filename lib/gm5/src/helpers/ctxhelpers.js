export function create(ctx, x, y, r, color = "green") {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2, false);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
}

export function clear(ctx) {
  ctx.clearRect(0, 0, 500, 500);
}

export function transaction(ctx, move, ...args) {
  ctx.restore();
  /* 
    include all you want
     create and move
  */
  create(ctx, ...args);
  move();
  ctx.save();
}
