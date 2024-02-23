import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { jobMock } from '../../../../__mocks__/job';
import { CreateJobController } from '../../../../api/controllers/job';
import { CompanyPresenter } from '../../../../api/presenters/company';
import { JobPresenter } from '../../../../api/presenters/job';
import { ReadCompanyByIdService } from '../../../../application/company/services';
import { CreateJobService } from '../../../../application/job/services';
import { DbTypeOrmCompanyRepository } from '../../../../infrastructure/database/access/repositories/company';
import { CompanyDbModel } from '../../../../infrastructure/database/access/repositories/company/models';
import { DbTypeOrmJobRepository } from '../../../../infrastructure/database/access/repositories/job';
import { JobDbModel } from '../../../../infrastructure/database/access/repositories/job/models';

describe('CreateJobController', () => {
  let controller: CreateJobController;
  let service: CreateJobService;
  let repository: DbTypeOrmJobRepository;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CreateJobController],
      providers: [
        JobPresenter,
        CreateJobService,
        {
          provide: getRepositoryToken(JobDbModel),
          useValue: { execute: jest.fn() },
        },
        DbTypeOrmJobRepository,
        {
          provide: getRepositoryToken(JobDbModel),
          useValue: { create: jest.fn() },
        },
        ReadCompanyByIdService,
        DbTypeOrmCompanyRepository,
        CompanyPresenter,
        {
          provide: getRepositoryToken(CompanyDbModel),
          useValue: { readById: jest.fn() },
        },
      ],
    }).compile();

    controller = app.get<CreateJobController>(CreateJobController);
    service = app.get<CreateJobService>(CreateJobService);
    repository = app.get<DbTypeOrmJobRepository>(DbTypeOrmJobRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should load module dependencies', () => {
    expect(service).toBeDefined();
    expect(controller).toBeDefined();
    expect(repository).toBeDefined();
  });

  it('should create a job with correct values', async () => {
    jest.spyOn(service, 'create').mockResolvedValue(true);
    const output = controller.handle(jobMock);

    expect(await output).toEqual({
      success: true,
      message: 'A publicação foi criada com sucesso',
    });
  });

  it('should return an error if service throws', async () => {
    jest.spyOn(service, 'create').mockRejectedValueOnce(new Error());
    await expect(controller.handle(jobMock)).rejects.toThrow(new Error());
  });
});
