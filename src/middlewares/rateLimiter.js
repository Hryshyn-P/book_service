import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour in milliseconds
  max: 1000, // limit each IP to 1000 requests per windowMs
  message: "Too many requests from this IP, please try again in an hour",
});

export default limiter;
