import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { jobMock } from '../../../../__mocks__/job';
import { DeleteJobDraftController } from '../../../../api/controllers/job';
import { CompanyPresenter } from '../../../../api/presenters/company';
import { JobPresenter } from '../../../../api/presenters/job';
import { CompanyResponseMapper } from '../../../../api/transports/company/mappers';
import { JobResponseMapper } from '../../../../api/transports/job/mapper';
import { ReadCompanyByIdService } from '../../../../application/company/services';
import {
  DeleteJobDraftService,
  ReadJobDraftByIdService,
} from '../../../../application/job/services';
import { CompanyDbRepository } from '../../../../infrastructure/access/repositories/company';
import { CompanyModel } from '../../../../infrastructure/access/repositories/company/models';
import { JobDbRepository } from '../../../../infrastructure/access/repositories/job';
import { JobModel } from '../../../../infrastructure/access/repositories/job/models';

describe('UpdateJobDraftController', () => {
  let controller: DeleteJobDraftController;
  let service: DeleteJobDraftService;
  let presenter: JobPresenter;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [DeleteJobDraftController],
      providers: [
        JobResponseMapper,
        ReadJobDraftByIdService,
        DeleteJobDraftService,
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

    service = app.get<DeleteJobDraftService>(DeleteJobDraftService);
    controller = app.get<DeleteJobDraftController>(DeleteJobDraftController);
    presenter = app.get<JobPresenter>(JobPresenter);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should delete a job successfully', async () => {
    jest.spyOn(service, 'delete').mockResolvedValue(true);
    const output = await controller.handle(jobMock.id);

    jest
      .spyOn(presenter, 'deletedDraftSuccess')
      .mockResolvedValue({ message: 'Registro excluído com sucesso' });

    expect(output).toEqual({ message: 'Registro excluído com sucesso' });
  });

  it('should delete a job unsuccessfully', async () => {
    jest.spyOn(service, 'delete').mockResolvedValue(false);
    const output = await controller.handle(jobMock.id);

    jest
      .spyOn(presenter, 'deletedDraftNotSuccess')
      .mockResolvedValue({ message: 'Registro não excluído' });

    expect(output).toEqual({ message: 'Registro não excluído' });
  });
});
