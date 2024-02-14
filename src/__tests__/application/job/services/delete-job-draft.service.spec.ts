import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { jobMock } from '../../../../__mocks__/job';
import {
  DeleteJobDraftService,
  ReadJobDraftByIdService,
} from '../../../../application/job/services';
import { JobDbRepository } from '../../../../infrastructure/access/repositories/job';
import { JobModel } from '../../../../infrastructure/access/repositories/job/models';

describe('DeleteJobDraftService', () => {
  let service: DeleteJobDraftService;
  let repository: JobDbRepository;
  let readJobDraftByIdService: ReadJobDraftByIdService;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteJobDraftService,
        JobDbRepository,
        {
          provide: getRepositoryToken(JobModel),
          useValue: { delete: jest.fn() },
        },
        ReadJobDraftByIdService,
        {
          provide: getRepositoryToken(JobModel),
          useValue: { readById: jest.fn() },
        },
      ],
    }).compile();

    service = moduleRef.get<DeleteJobDraftService>(DeleteJobDraftService);
    repository = moduleRef.get<JobDbRepository>(JobDbRepository);
    readJobDraftByIdService = moduleRef.get<ReadJobDraftByIdService>(
      ReadJobDraftByIdService,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('ensure delete a job draft successfully', async () => {
    jest.spyOn(readJobDraftByIdService, 'readById').mockResolvedValue(jobMock);
    jest.spyOn(repository, 'update').mockResolvedValue(true);
    jest.spyOn(service, 'delete').mockResolvedValue(true);

    const result = await service.delete(jobMock.id);
    expect(result).toBe(true);
  });

  it('ensure delete uncessfully if not found job draft', async () => {
    jest.spyOn(readJobDraftByIdService, 'readById').mockResolvedValue(null);
    jest.spyOn(repository, 'update').mockResolvedValue(false);
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
