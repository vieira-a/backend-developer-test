import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { jobMock } from '../../../../__mocks__/job';
import { UpdateJobDraftController } from '../../../../api/controllers/job';
import { CompanyPresenter } from '../../../../api/presenters/company';
import { JobPresenter } from '../../../../api/presenters/job';
import { CompanyResponseMapper } from '../../../../api/transports/company/mappers';
import { JobResponseMapper } from '../../../../api/transports/job/mapper';
import { ReadCompanyByIdService } from '../../../../application/company/services';
import {
  ReadJobDraftByIdService,
  UpdateJobDraftService,
} from '../../../../application/job/services';
import { CompanyDbRepository } from '../../../../infrastructure/access/repositories/company';
import { CompanyModel } from '../../../../infrastructure/access/repositories/company/models';
import { JobDbRepository } from '../../../../infrastructure/access/repositories/job';
import { JobModel } from '../../../../infrastructure/access/repositories/job/models';

describe('UpdateJobDraftController', () => {
  let controller: UpdateJobDraftController;
  let service: UpdateJobDraftService;
  let presenter: JobPresenter;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UpdateJobDraftController],
      providers: [
        JobResponseMapper,
        ReadJobDraftByIdService,
        UpdateJobDraftService,
        {
          provide: getRepositoryToken(JobModel),
          useValue: { execute: jest.fn() },
        },
        JobPresenter,
        {
          provide: getRepositoryToken(JobModel),
          useValue: { updatedDraftSuccess: jest.fn() },
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

    service = app.get<UpdateJobDraftService>(UpdateJobDraftService);
    controller = app.get<UpdateJobDraftController>(UpdateJobDraftController);
    presenter = app.get<JobPresenter>(JobPresenter);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should update a job draft title successfully', async () => {
    jest.spyOn(service, 'execute').mockResolvedValue(true);
    const output = await controller.handle(jobMock.id, {
      ...jobMock,
      title: 'Upated title',
    });

    jest
      .spyOn(presenter, 'updatedDraftSuccess')
      .mockResolvedValue({ message: 'Registro atualizado com sucesso' });

    expect(output).toEqual({ message: 'Registro atualizado com sucesso' });
  });

  it('should update a job draft description successfully', async () => {
    jest.spyOn(service, 'execute').mockResolvedValue(true);
    const output = await controller.handle(jobMock.id, {
      ...jobMock,
      description: 'Upated description',
    });

    jest
      .spyOn(presenter, 'updatedDraftSuccess')
      .mockResolvedValue({ message: 'Registro atualizado com sucesso' });

    expect(output).toEqual({ message: 'Registro atualizado com sucesso' });
  });
});
