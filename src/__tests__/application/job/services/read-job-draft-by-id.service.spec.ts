import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { jobMock } from '../../../../__mocks__/job';
import { ReadCompanyByIdService } from '../../../../application/company/services';
import { ReadJobDraftByIdService } from '../../../../application/job/services';
import { CompanyDbRepository } from '../../../../infrastructure/access/repositories/company';
import { CompanyModel } from '../../../../infrastructure/access/repositories/company/models';
import { JobDbRepository } from '../../../../infrastructure/access/repositories/job';
import { JobModel } from '../../../../infrastructure/access/repositories/job/models';

describe('ReadJobDraftByIdService', () => {
  let service: ReadJobDraftByIdService;
  let repository: JobDbRepository;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
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

    service = moduleRef.get<ReadJobDraftByIdService>(ReadJobDraftByIdService);
    repository = moduleRef.get<JobDbRepository>(JobDbRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should read a job draft by id', async () => {
    const jobId = 'd9b8203c-e87e-4366-b162-66bf0cecb429';
    jest.spyOn(repository, 'readById').mockResolvedValue(jobMock);
    const result = await service.execute(jobId);
    expect(result).toEqual(jobMock);
  });
});
