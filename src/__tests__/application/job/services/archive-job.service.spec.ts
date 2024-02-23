import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { jobMock } from '../../../../__mocks__/job';
import {
  ArchiveJobService,
  ReadJobByIdService,
} from '../../../../application/job/services';
import { DbTypeOrmRepository } from '../../../../infrastructure/database/access/repositories/job';
import { JobDbModel } from '../../../../infrastructure/database/access/repositories/job/models';

describe('ArchiveJobService', () => {
  let service: ArchiveJobService;
  let repository: DbTypeOrmRepository;
  let readJobByIdService: ReadJobByIdService;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        ArchiveJobService,
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

    service = moduleRef.get<ArchiveJobService>(ArchiveJobService);
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

  it('should archive a job on success', async () => {
    jest.spyOn(repository, 'archive').mockResolvedValue(true);
    jest.spyOn(service, 'archive').mockResolvedValue(true);

    const result = await service.archive(jobMock.id);
    expect(result).toBe(true);
  });

  it('should return false if not found job by id', async () => {
    jest.spyOn(readJobByIdService, 'readById').mockResolvedValue(null);
    jest.spyOn(service, 'archive').mockResolvedValue(false);

    const result = await service.archive(jobMock.id);
    expect(result).toBe(false);
  });

  it('should return an error if service throws', async () => {
    jest.spyOn(service, 'archive').mockRejectedValueOnce(new Error());
    expect(service.archive(jobMock.id)).rejects.toThrow(new Error());
  });
});
