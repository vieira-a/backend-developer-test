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
});
