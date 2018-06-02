import { isballcollide } from "../helpers/movehelpers";
export function xyrValidate(...args) {
  const [x, y, r] = args;
  let message = null;
  if (typeof (x) === "Number" && typeof (y) === "Number" && typeof (z) === "Number")
    message = "Must be Number";
  if (x < 0 || y < 0)
    message = "Number must be Positive";
  if (x < r || y < r)
    message = "Initial position error";


  if (message !== null)
    throw new BaseError(message);
}

export function ballstickyValidate(source, target) {
  //detected
  if (isballcollide(source, target)) {
    throw new BaseError(`Initial position error: source:${source.ballid}; target: ${target.ballid}; they are sticky`);
  }
}


//SyntaxError
class BaseError extends Error {
  constructor(...args) {
    super(...args);
    Error.captureStackTrace(this, BaseError)
  }
}
