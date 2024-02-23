import 'dotenv/config';

import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

import { IJobCacheRepository } from '../../../application/job/usecases/job-cache-repository.interface';
import { S3Service } from '../../aws/s3/s3.service';

@Injectable()
export class RedisCacheRepository implements IJobCacheRepository {
  private readonly client: Redis;
  private readonly s3Service: S3Service;
  constructor(s3Service: S3Service) {
    this.client = new Redis({
      host: process.env.REDIS_URL,
      port: parseInt(process.env.REDIS_PORT),
    });

    this.s3Service = s3Service;
  }

  getClient(): Redis {
    return this.client;
  }

  async feed(): Promise<string> {
    const key = 'jobs';
    const cachedData = await this.client.get(key);

    if (!cachedData) {
      const s3Data = await this.s3Service.getFileFromS3();
      this.client.set(key, JSON.stringify(s3Data));
      return JSON.stringify(s3Data);
    }
    return cachedData;
  }
}
