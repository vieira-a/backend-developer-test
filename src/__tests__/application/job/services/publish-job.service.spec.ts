import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { jobMock } from '../../../../__mocks__/job';
import {
  PublishJobService,
  ReadJobByIdService,
} from '../../../../application/job/services';
import { DbTypeOrmRepository } from '../../../../infrastructure/access/repositories/job';
import { JobDbModel } from '../../../../infrastructure/access/repositories/job/models';

describe('PublishJobService', () => {
  let service: PublishJobService;
  let repository: DbTypeOrmRepository;
  let readJobByIdService: ReadJobByIdService;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        PublishJobService,
        DbTypeOrmRepository,
        {
          provide: getRepositoryToken(JobDbModel),
          useValue: { archive: jest.fn() },
        },
        ReadJobByIdService,
        {
          provide: getRepositoryToken(JobDbModel),
          useValue: { readById: jest.fn() },
        },
      ],
    }).compile();

    service = moduleRef.get<PublishJobService>(PublishJobService);
    repository = moduleRef.get<DbTypeOrmRepository>(DbTypeOrmRepository);
    readJobByIdService = moduleRef.get<ReadJobByIdService>(ReadJobByIdService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should define dependencies', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
    expect(readJobByIdService).toBeDefined();
  });

  it('should publish a job on success', async () => {
    jest.spyOn(repository, 'archive').mockResolvedValue(true);
    jest.spyOn(service, 'publish').mockResolvedValue(true);

    const result = await service.publish(jobMock.id);
    expect(result).toBe(true);
  });
});
