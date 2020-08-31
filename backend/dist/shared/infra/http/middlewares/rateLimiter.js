"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = rateLimiter;

var _redis = _interopRequireDefault(require("redis"));

var _AppError = _interopRequireDefault(require("../../../errors/AppError"));

var _rateLimiterFlexible = require("rate-limiter-flexible");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const redisClient = _redis.default.createClient({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASS || undefined
});

const limiter = new _rateLimiterFlexible.RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'ratelimit',
  points: 50,
  duration: 10,
  inmemoryBlockOnConsumed: 51,
  // After 50 points consumed
  inmemoryBlockDuration: 60 // IP will be blocked for 60 seconds

});

async function rateLimiter(req, res, next) {
  try {
    await limiter.consume(req.ip);
    return next();
  } catch {
    throw new _AppError.default('Too many requests', 429);
  }
}