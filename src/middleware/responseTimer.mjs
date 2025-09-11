// Logs duration and status of each response
export default function responseTimer(req, res, next) {
  const start = Date.now();
  res.on("finish", () => {
    const ms = Date.now() - start;
    if (process.env.NODE_ENV !== "test") {
      console.log(`⏱ ${req.method} ${req.originalUrl} -> ${res.statusCode} in ${ms}ms`);
    }
  });
  next();
}