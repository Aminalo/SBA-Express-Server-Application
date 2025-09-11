// Adds ISO timestamp to request object
export default function requestTime(req, res, next) {
  req.requestTime = new Date().toISOString();
  next();
}