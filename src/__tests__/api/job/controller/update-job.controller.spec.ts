import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { jobMock } from '../../../../__mocks__/job';
import { UpdateJobController } from '../../../../api/controllers/job';
import { JobPresenter } from '../../../../api/presenters/job';
import {
  ReadJobByIdService,
  UpdateJobService,
} from '../../../../application/job/services';
import { DbTypeOrmCompanyRepository } from '../../../../infrastructure/access/repositories/company';
import { CompanyDbModel } from '../../../../infrastructure/access/repositories/company/models';
import { DbTypeOrmRepository } from '../../../../infrastructure/access/repositories/job';
import { JobDbModel } from '../../../../infrastructure/access/repositories/job/models';

describe('UpdateJobController', () => {
  let controller: UpdateJobController;
  let service: UpdateJobService;
  let presenter: JobPresenter;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UpdateJobController],
      providers: [
        UpdateJobService,
        {
          provide: getRepositoryToken(JobDbModel),
          useValue: { update: jest.fn() },
        },
        ReadJobByIdService,
        {
          provide: getRepositoryToken(JobDbModel),
          useValue: { readById: jest.fn() },
        },
        JobPresenter,
        {
          provide: getRepositoryToken(JobDbModel),
          useValue: { updateJobResult: jest.fn() },
        },
        DbTypeOrmRepository,
        {
          provide: getRepositoryToken(JobDbModel),
          useValue: { update: jest.fn() },
        },
        DbTypeOrmCompanyRepository,
        {
          provide: getRepositoryToken(CompanyDbModel),
          useValue: { readAll: jest.fn(), readById: jest.fn() },
        },
      ],
    }).compile();

    service = app.get<UpdateJobService>(UpdateJobService);
    controller = app.get<UpdateJobController>(UpdateJobController);
    presenter = app.get<JobPresenter>(JobPresenter);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should define dependencies', () => {
    expect(service).toBeDefined();
    expect(controller).toBeDefined();
    expect(presenter).toBeDefined();
  });

  it('should update a job title successfully', async () => {
    jest.spyOn(service, 'update').mockResolvedValue(true);
    await controller.handle(jobMock.id, {
      ...jobMock,
      title: 'Upated title',
    });

    expect(await presenter.updateJobResult(true)).toEqual({
      success: true,
      message: 'A publicação foi atualizada com sucesso',
    });
  });

  it('should update a job description successfully', async () => {
    jest.spyOn(service, 'update').mockResolvedValue(true);
    await controller.handle(jobMock.id, {
      ...jobMock,
      description: 'Upated description',
    });

    expect(await presenter.updateJobResult(true)).toEqual({
      success: true,
      message: 'A publicação foi atualizada com sucesso',
    });
  });

  it('should update a job location successfully', async () => {
    jest.spyOn(service, 'update').mockResolvedValue(true);
    await controller.handle(jobMock.id, {
      ...jobMock,
      location: 'Upated location',
    });

    expect(await presenter.updateJobResult(true)).toEqual({
      success: true,
      message: 'A publicação foi atualizada com sucesso',
    });
  });

  it('should not update if data is not provided', async () => {
    jest.spyOn(service, 'update').mockResolvedValue(false);
    await controller.handle(jobMock.id, {
      title: '',
      description: '',
      location: '',
    });

    expect(await presenter.updateJobResult(false)).toEqual({
      success: false,
      message: 'Não há dados para atualizar',
    });
  });
});
