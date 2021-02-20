export function create(ctx, x, y, r) {
  ctx.moveTo(x, y);
  ctx.arc(x, y, r, 0, Math.PI * 2, false);
}

export function clear(ctx) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

export function transaction(ctx, move, ...args) {
  //ctx.restore();
  /* 
    include all you want
    create and move
  */
  create(ctx, ...args);
  move();
  //ctx.save();
}
