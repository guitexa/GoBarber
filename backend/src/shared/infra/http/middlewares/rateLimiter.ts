import { Request, Response, NextFunction } from 'express';
import redis from 'redis';
import AppError from '@shared/errors/AppError';
import { RateLimiterRedis } from 'rate-limiter-flexible';

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASS || undefined,
});

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'ratelimit',
  points: 50,
  duration: 10,
  inmemoryBlockOnConsumed: 51, // After 50 points consumed
  inmemoryBlockDuration: 60, // IP will be blocked for 60 seconds
});

export default async function rateLimiter(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    await limiter.consume(req.ip);

    return next();
  } catch {
    throw new AppError('Too many requests', 429);
  }
}
