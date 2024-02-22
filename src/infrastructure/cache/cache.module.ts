import { Module } from '@nestjs/common';

import { S3Service } from '../aws/s3/s3.service';
import { RedisCacheRepository } from './redis/redis-cache.repository';

@Module({
  providers: [RedisCacheRepository, S3Service],
  exports: [RedisCacheRepository],
})
export class CacheModule {}
