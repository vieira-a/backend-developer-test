import 'dotenv/config';

import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  private readonly client: Redis;

  constructor() {
    this.client = new Redis({
      host: process.env.REDIS_URL,
      port: parseInt(process.env.REDIS_PORT),
    });
  }

  getClient(): Redis {
    return this.client;
  }
}
