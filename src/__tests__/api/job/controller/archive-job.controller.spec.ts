import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { jobMock } from '../../../../__mocks__/job';
import { ArchiveJobController } from '../../../../api/controllers/job';
import { JobPresenter } from '../../../../api/presenters/job';
import {
  ArchiveJobService,
  ReadJobByIdService,
} from '../../../../application/job/services';
import { DbTypeOrmJobRepository } from '../../../../infrastructure/database/access/repositories/job';
import { JobDbModel } from '../../../../infrastructure/database/access/repositories/job/models';

describe('ArchiveJobController', () => {
  let controller: ArchiveJobController;
  let service: ArchiveJobService;
  let presenter: JobPresenter;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ArchiveJobController],
      providers: [
        ArchiveJobService,
        DbTypeOrmJobRepository,
        {
          provide: getRepositoryToken(JobDbModel),
          useValue: { archive: jest.fn() },
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
      ],
    }).compile();

    service = app.get<ArchiveJobService>(ArchiveJobService);
    controller = app.get<ArchiveJobController>(ArchiveJobController);
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

  it('should archive a job successfully', async () => {
    jest.spyOn(service, 'archive').mockResolvedValue(true);
    await controller.handle(jobMock.id);

    expect(await presenter.archiveJobResult(true)).toEqual({
      success: true,
      message: 'A publicação foi arquivada com sucesso',
    });
  });

  it('should archive a job unsuccessfully', async () => {
    jest.spyOn(service, 'archive').mockResolvedValue(false);
    await controller.handle(jobMock.id);

    expect(await presenter.archiveJobResult(false)).toEqual({
      success: false,
      message: 'Houve uma falha ao arquivar a publicação',
    });
  });
});
