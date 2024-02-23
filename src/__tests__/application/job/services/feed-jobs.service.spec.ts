import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { feedMock } from '../../../../__mocks__/job';
import { FeedJobsService } from '../../../../application/job/services';
import { S3Service } from '../../../../infrastructure/aws/s3/s3.service';
import { RedisCacheRepository } from '../../../../infrastructure/cache/redis';
import { JobDbModel } from '../../../../infrastructure/database/access/repositories/job/models';

describe('ReadJobByIdService', () => {
  let service: FeedJobsService;
  let repository: RedisCacheRepository;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        FeedJobsService,
        RedisCacheRepository,
        {
          provide: getRepositoryToken(JobDbModel),
          useValue: { feed: jest.fn() },
        },
        S3Service,
      ],
    }).compile();

    service = moduleRef.get<FeedJobsService>(FeedJobsService);
    repository = moduleRef.get<RedisCacheRepository>(RedisCacheRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be define dependencies', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  it('should read a job feed from redis cache', async () => {
    jest.spyOn(repository, 'feed').mockResolvedValue(feedMock);
    const result = await service.feed();
    expect(result).toEqual(feedMock);
  });
});
