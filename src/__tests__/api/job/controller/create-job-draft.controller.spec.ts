import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { jobMock } from '../../../../__mocks__/job';
import { CreateJobDraftController } from '../../../../api/controllers/job';
import { CompanyPresenter } from '../../../../api/presenters/company';
import { JobPresenter } from '../../../../api/presenters/job';
import { CompanyResponseMapper } from '../../../../api/transports/company/mappers';
import { JobResponseMapper } from '../../../../api/transports/job/mapper';
import { ReadCompanyByIdService } from '../../../../application/company/services';
import { CreateJobDraftService } from '../../../../application/job/services';
import { CompanyDbRepository } from '../../../../infrastructure/access/repositories/company';
import { CompanyModel } from '../../../../infrastructure/access/repositories/company/models';
import { JobDbRepository } from '../../../../infrastructure/access/repositories/job';
import { JobModel } from '../../../../infrastructure/access/repositories/job/models';

describe('CreateJobDraftController', () => {
  let controller: CreateJobDraftController;
  let service: CreateJobDraftService;
  let repository: JobDbRepository;
  let mapper: JobResponseMapper;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CreateJobDraftController],
      providers: [
        JobPresenter,
        JobResponseMapper,
        CreateJobDraftService,
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
        CompanyDbRepository,
        CompanyPresenter,
        CompanyResponseMapper,
        {
          provide: getRepositoryToken(CompanyModel),
          useValue: { readById: jest.fn() },
        },
      ],
    }).compile();

    service = app.get<CreateJobDraftService>(CreateJobDraftService);
    controller = app.get<CreateJobDraftController>(CreateJobDraftController);
    repository = app.get<JobDbRepository>(JobDbRepository);
    mapper = app.get<JobResponseMapper>(JobResponseMapper);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should load module dependencies', () => {
    expect(service).toBeDefined();
    expect(controller).toBeDefined();
    expect(mapper).toBeDefined();
    expect(repository).toBeDefined();
  });

  it('should create a job draft with correct values', async () => {
    jest.spyOn(service, 'create').mockResolvedValue(jobMock);
    const jobMappedMock = mapper.jobDraftResponse(jobMock);
    const output = controller.handle(jobMock);

    expect(output).toEqual(jobMappedMock);
  });

  it('should return an error if service throws', async () => {
    jest.spyOn(service, 'create').mockRejectedValueOnce(new Error());
    await expect(controller.handle(jobMock)).rejects.toThrow(new Error());
  });
});
