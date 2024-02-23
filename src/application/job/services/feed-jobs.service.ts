import { Injectable } from '@nestjs/common';

import { FeedJobs } from '../../../domain/job/usecases';
import { RedisCacheRepository } from '../../../infrastructure/cache/redis/redis-cache.repository';

@Injectable()
export class FeedJobsService implements FeedJobs {
  constructor(private readonly _redisCacheRepository: RedisCacheRepository) {}

  async feed(): Promise<string> {
    return await this._redisCacheRepository.feed();
  }
}
