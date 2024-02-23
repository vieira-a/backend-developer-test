import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { jobMock } from '../../../../__mocks__/job';
import {
  PublishJobService,
  ReadJobByIdService,
} from '../../../../application/job/services';
import { SqsService } from '../../../../infrastructure/aws/sqs/sqs.service';
import { DbTypeOrmRepository } from '../../../../infrastructure/database/access/repositories/job';
import { JobDbModel } from '../../../../infrastructure/database/access/repositories/job/models';

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
        SqsService,
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

  it('should return false if not found job by id', async () => {
    jest.spyOn(readJobByIdService, 'readById').mockResolvedValue(null);
    jest.spyOn(service, 'publish').mockResolvedValue(false);

    const result = await service.publish(jobMock.id);
    expect(result).toBe(false);
  });

  it('should return an error if service throws', async () => {
    jest.spyOn(service, 'publish').mockRejectedValueOnce(new Error());
    expect(service.publish(jobMock.id)).rejects.toThrow(new Error());
  });
});
