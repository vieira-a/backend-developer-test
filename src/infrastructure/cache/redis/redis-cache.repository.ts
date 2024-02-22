import 'dotenv/config';

import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

import { FeedJobsOutput } from '../../../application/job/outputs';
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

  async feed(): Promise<FeedJobsOutput[]> {
    try {
      const key = 'jobs';
      const cachedData = await this.client.get(key);

      if (!cachedData) {
        console.log('Redis is empty. Fetching from S3');
        const s3Data = await this.s3Service.getFileFromS3();
        console.log('S3 data', s3Data);
        await this.client.set(key, JSON.stringify(s3Data));
      }
      return JSON.parse(cachedData);
    } catch (error) {
      console.log('cacheFromS3', error);
    }
  }
}
