import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { jobMock } from '../../../../__mocks__/job';
import { CreateJobController } from '../../../../api/controllers/job';
import { CompanyPresenter } from '../../../../api/presenters/company';
import { JobPresenter } from '../../../../api/presenters/job';
import { CompanyResponseMapper } from '../../../../api/transports/company/mappers';
import { ReadCompanyByIdService } from '../../../../application/company/services';
import { CreateJobService } from '../../../../application/job/services';
import { CompanyDbRepository } from '../../../../infrastructure/access/repositories/company';
import { CompanyModel } from '../../../../infrastructure/access/repositories/company/models';
import { DbTypeOrmRepository } from '../../../../infrastructure/access/repositories/job';
import { JobDbModel } from '../../../../infrastructure/access/repositories/job/models';

describe('CreateJobController', () => {
  let controller: CreateJobController;
  let service: CreateJobService;
  let repository: DbTypeOrmRepository;

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
        DbTypeOrmRepository,
        {
          provide: getRepositoryToken(JobDbModel),
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

    controller = app.get<CreateJobController>(CreateJobController);
    service = app.get<CreateJobService>(CreateJobService);
    repository = app.get<DbTypeOrmRepository>(DbTypeOrmRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should load module dependencies', () => {
    expect(service).toBeDefined();
    expect(controller).toBeDefined();
    expect(repository).toBeDefined();
  });

  it('should create a job draft with correct values', async () => {
    jest.spyOn(service, 'create').mockResolvedValue(true);
    const output = controller.handle(jobMock);

    expect(await output).toEqual({
      message: 'Publicação criada com sucesso',
    });
  });

  it('should return an error if service throws', async () => {
    jest.spyOn(service, 'create').mockRejectedValueOnce(new Error());
    await expect(controller.handle(jobMock)).rejects.toThrow(new Error());
  });
});
