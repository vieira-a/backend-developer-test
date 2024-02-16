import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { jobMock } from '../../../../__mocks__/job';
import { DeleteJobController } from '../../../../api/controllers/job';
import { CompanyPresenter } from '../../../../api/presenters/company';
import { JobPresenter } from '../../../../api/presenters/job';
import { CompanyResponseMapper } from '../../../../api/transports/company/mappers';
import { ReadCompanyByIdService } from '../../../../application/company/services';
import {
  DeleteJobService,
  ReadJobByIdService,
} from '../../../../application/job/services';
import { CompanyDbRepository } from '../../../../infrastructure/access/repositories/company';
import { CompanyModel } from '../../../../infrastructure/access/repositories/company/models';
import { DbTypeOrmRepository } from '../../../../infrastructure/access/repositories/job';
import { JobDbModel } from '../../../../infrastructure/access/repositories/job/models';

describe('DeleteJobController', () => {
  let controller: DeleteJobController;
  let service: DeleteJobService;
  let presenter: JobPresenter;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [DeleteJobController],
      providers: [
        DeleteJobService,
        DbTypeOrmRepository,
        {
          provide: getRepositoryToken(JobDbModel),
          useValue: { delete: jest.fn() },
        },
        ReadJobByIdService,
        {
          provide: getRepositoryToken(JobDbModel),
          useValue: { readById: jest.fn() },
        },
        JobPresenter,
        {
          provide: getRepositoryToken(JobDbModel),
          useValue: { deleteJobResult: jest.fn() },
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

    service = app.get<DeleteJobService>(DeleteJobService);
    controller = app.get<DeleteJobController>(DeleteJobController);
    presenter = app.get<JobPresenter>(JobPresenter);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be define dependencies', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
    expect(presenter).toBeDefined();
  });

  it('should delete a job successfully', async () => {
    jest.spyOn(service, 'delete').mockResolvedValue(true);
    await controller.handle(jobMock.id);

    expect(await presenter.deleteJobResult(true)).toEqual({
      success: true,
      message: 'A publicação foi excluída com sucesso',
    });
  });

  it('should delete a job unsuccessfully', async () => {
    jest.spyOn(service, 'delete').mockResolvedValue(false);
    await controller.handle(jobMock.id);

    expect(await presenter.deleteJobResult(false)).toEqual({
      success: false,
      message: 'Houve uma falha ao excluir a publicação',
    });
  });
});
