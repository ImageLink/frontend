import { rateLimit } from 'express-rate-limit';
import { NextApiResponse } from 'next';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL!,
  token: process.env.UPSTASH_REDIS_TOKEN!,
});

export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: { error: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
  store: {
    incr: async (key: string) => {
      const result = await redis.incr(key);
      return result;
    },
    decr: async (key: string) => {
      const result = await redis.decr(key);
      return result;
    },
    resetKey: async (key: string) => {
      await redis.del(key);
    },
  },
});