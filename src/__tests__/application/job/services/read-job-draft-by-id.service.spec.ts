import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { jobMock } from '../../../../__mocks__/job';
import { ReadJobDraftByIdService } from '../../../../application/job/services';
import { JobDbRepository } from '../../../../infrastructure/access/repositories/job';
import { JobModel } from '../../../../infrastructure/access/repositories/job/models';

describe('ReadJobDraftByIdService', () => {
  let service: ReadJobDraftByIdService;
  let repository: JobDbRepository;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        ReadJobDraftByIdService,
        JobDbRepository,
        {
          provide: getRepositoryToken(JobModel),
          useValue: { readById: jest.fn() },
        },
      ],
    }).compile();

    service = moduleRef.get<ReadJobDraftByIdService>(ReadJobDraftByIdService);
    repository = moduleRef.get<JobDbRepository>(JobDbRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should read a job draft by id', async () => {
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
