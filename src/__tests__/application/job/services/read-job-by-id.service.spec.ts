import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { jobMock } from '../../../../__mocks__/job';
import { ReadJobByIdService } from '../../../../application/job/services';
import { DbTypeOrmRepository } from '../../../../infrastructure/access/repositories/job';
import { JobDbModel } from '../../../../infrastructure/access/repositories/job/models';

describe('ReadJobByIdService', () => {
  let service: ReadJobByIdService;
  let repository: DbTypeOrmRepository;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        ReadJobByIdService,
        DbTypeOrmRepository,
        {
          provide: getRepositoryToken(JobDbModel),
          useValue: { readById: jest.fn() },
        },
      ],
    }).compile();

    service = moduleRef.get<ReadJobByIdService>(ReadJobByIdService);
    repository = moduleRef.get<DbTypeOrmRepository>(DbTypeOrmRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be define dependencies', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  it('should read a job by id', async () => {
    const jobId = 'd9b8203c-e87e-4366-b162-66bf0cecb429';
    jest.spyOn(repository, 'readById').mockResolvedValue(jobMock);
    const result = await service.readById(jobId);
    expect(result).toEqual(jobMock);
  });

  it('should return null if not found a job by id', async () => {
    const notFoundId = '4499a351-1861-49bb-9189-40fff3d1398c';
    jest.spyOn(repository, 'readById').mockResolvedValue(null);
    expect(await service.readById(notFoundId)).toEqual(null);
  });

  it('should return an error if service throws', async () => {
    const jobId = 'd9b8203c-e87e-4366-b162-66bf0cecb429';
    jest.spyOn(service, 'readById').mockRejectedValueOnce(new Error());
    await expect(service.readById(jobId)).rejects.toThrow(new Error());
  });
});
