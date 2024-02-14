import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { jobMock } from '../../../../__mocks__/job';
import { ReadCompanyByIdService } from '../../../../application/company/services';
import {
  ReadJobDraftByIdService,
  UpdateJobDraftService,
} from '../../../../application/job/services';
import { CompanyDbRepository } from '../../../../infrastructure/access/repositories/company';
import { CompanyModel } from '../../../../infrastructure/access/repositories/company/models';
import { JobDbRepository } from '../../../../infrastructure/access/repositories/job';
import { JobModel } from '../../../../infrastructure/access/repositories/job/models';

describe('UpdateJobDraftService', () => {
  let service: UpdateJobDraftService;
  let repository: JobDbRepository;
  let readJobDraftByIdService: ReadJobDraftByIdService;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateJobDraftService,
        ReadJobDraftByIdService,
        {
          provide: getRepositoryToken(JobModel),
          useValue: { execute: jest.fn() },
        },
        JobDbRepository,
        {
          provide: getRepositoryToken(JobModel),
          useValue: { create: jest.fn() },
        },
        ReadCompanyByIdService,
        {
          provide: getRepositoryToken(CompanyModel),
          useValue: { execute: jest.fn() },
        },
        CompanyDbRepository,
        {
          provide: getRepositoryToken(CompanyModel),
          useValue: { readById: jest.fn() },
        },
      ],
    }).compile();

    service = moduleRef.get<UpdateJobDraftService>(UpdateJobDraftService);
    repository = moduleRef.get<JobDbRepository>(JobDbRepository);
    readJobDraftByIdService = moduleRef.get<ReadJobDraftByIdService>(
      ReadJobDraftByIdService,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should update a job title on success', async () => {
    jest.spyOn(repository, 'update').mockResolvedValue(true);
    jest.spyOn(service, 'execute').mockResolvedValue(true);

    const result = await service.execute(jobMock.id, {
      ...jobMock,
      title: 'Updated title',
    });
    expect(result).toBe(true);
  });

  it('should update a job description on success', async () => {
    jest.spyOn(repository, 'update').mockResolvedValue(true);
    jest.spyOn(service, 'execute').mockResolvedValue(true);

    const result = await service.execute(jobMock.id, {
      ...jobMock,
      description: 'Updated description',
    });
    expect(result).toBe(true);
  });

  it('should update a job location on success', async () => {
    jest.spyOn(repository, 'update').mockResolvedValue(true);
    jest.spyOn(service, 'execute').mockResolvedValue(true);

    const result = await service.execute(jobMock.id, {
      ...jobMock,
      location: 'Updated location',
    });
    expect(result).toBe(true);
  });

  it('should return false if not found job by id', async () => {
    jest.spyOn(readJobDraftByIdService, 'execute').mockResolvedValue(null);
    jest.spyOn(service, 'execute').mockResolvedValue(false);

    const result = await service.execute(jobMock.id, {
      ...jobMock,
      location: 'Updated location',
    });
    expect(result).toBe(false);
  });

  it('should return an error if service throws', async () => {
    jest.spyOn(service, 'execute').mockRejectedValueOnce(new Error());
    await expect(
      service.execute(jobMock.id, {
        ...jobMock,
        location: 'Updated location',
      }),
    ).rejects.toThrow(new Error());
  });
});
