import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { jobMock } from '../../../../__mocks__/job';
import {
  DeleteJobService,
  ReadJobByIdService,
} from '../../../../application/job/services';
import { DbTypeOrmRepository } from '../../../../infrastructure/access/repositories/job';
import { JobDbModel } from '../../../../infrastructure/access/repositories/job/models';

describe('DeleteJobService', () => {
  let service: DeleteJobService;
  let readJobByIdService: ReadJobByIdService;
  let repository: DbTypeOrmRepository;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteJobService,
        DbTypeOrmRepository,
        {
          provide: getRepositoryToken(JobDbModel),
          useValue: { delete: jest.fn() },
        },
        ReadJobByIdService,
        {
          provide: getRepositoryToken(JobDbModel),
          useValue: { readById: jest.fn() },
        },
      ],
    }).compile();

    service = moduleRef.get<DeleteJobService>(DeleteJobService);
    repository = moduleRef.get<DbTypeOrmRepository>(DbTypeOrmRepository);
    readJobByIdService = moduleRef.get<ReadJobByIdService>(ReadJobByIdService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be define dependencies', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
    expect(readJobByIdService).toBeDefined();
  });

  it('ensure delete a job successfully', async () => {
    jest.spyOn(readJobByIdService, 'readById').mockResolvedValue(jobMock);
    jest.spyOn(repository, 'delete').mockResolvedValue(true);
    jest.spyOn(service, 'delete').mockResolvedValue(true);

    const result = await service.delete(jobMock.id);
    expect(result).toBe(true);
  });

  it('ensure delete uncessfully if not found job', async () => {
    jest.spyOn(readJobByIdService, 'readById').mockResolvedValue(null);
    jest.spyOn(repository, 'delete').mockResolvedValue(false);
    jest.spyOn(service, 'delete').mockResolvedValue(false);

    const result = await service.delete(jobMock.id);
    expect(result).toBe(false);
  });

  it('should return an error if service throws', async () => {
    const jobId = 'd9b8203c-e87e-4366-b162-66bf0cecb429';
    jest.spyOn(service, 'delete').mockRejectedValueOnce(new Error());
    await expect(service.delete(jobId)).rejects.toThrow(new Error());
  });
});
