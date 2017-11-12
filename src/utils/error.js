export function xyrError(x, y, r) {
  if (typeof (x) === "Number" && typeof (y) === "Number" && typeof (z) === "Number")
    throw new Error("Must be Number");
  if (x < 0 || y < 0)
    throw new Error("Number must be Positive");
  if (x < r || y < r)
    throw new Error("Initial position error");
}