import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { jobMock } from '../../../../__mocks__/job';
import { ReadCompanyByIdService } from '../../../../application/company/services';
import { CreateJobDraftService } from '../../../../application/job/services';
import { CompanyDbRepository } from '../../../../infrastructure/access/repositories/company';
import { CompanyModel } from '../../../../infrastructure/access/repositories/company/models';
import { JobDbRepository } from '../../../../infrastructure/access/repositories/job';
import { JobModel } from '../../../../infrastructure/access/repositories/job/models';

describe('CreateJobDraftService', () => {
  let service: CreateJobDraftService;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        CreateJobDraftService,
        JobDbRepository,
        ReadCompanyByIdService,
        CompanyDbRepository,
        {
          provide: getRepositoryToken(JobModel),
          useValue: {
            create: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(CompanyModel),
          useValue: {
            readById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = moduleRef.get<CreateJobDraftService>(CreateJobDraftService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a job draft on success', async () => {
    jest.spyOn(service, 'create').mockResolvedValue(jobMock);
    const result = await service.create(jobMock);
    expect(result).toEqual(jobMock);
  });
});
