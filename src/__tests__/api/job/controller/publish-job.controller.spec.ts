import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { jobMock } from '../../../../__mocks__/job';
import { PublishJobController } from '../../../../api/controllers/job';
import { JobPresenter } from '../../../../api/presenters/job';
import {
  PublishJobService,
  ReadJobByIdService,
} from '../../../../application/job/services';
import { DbTypeOrmRepository } from '../../../../infrastructure/access/repositories/job';
import { JobDbModel } from '../../../../infrastructure/access/repositories/job/models';
import { SqsService } from '../../../../infrastructure/aws/sqs/sqs.service';

describe('PublishJobController', () => {
  let controller: PublishJobController;
  let service: PublishJobService;
  let presenter: JobPresenter;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PublishJobController],
      providers: [
        PublishJobService,
        DbTypeOrmRepository,
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
        SqsService,
      ],
    }).compile();

    service = app.get<PublishJobService>(PublishJobService);
    controller = app.get<PublishJobController>(PublishJobController);
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

  it('should publish a job successfully', async () => {
    jest.spyOn(service, 'publish').mockResolvedValue(true);
    await controller.handle(jobMock.id);

    expect(await presenter.publishJobResult(true)).toEqual({
      success: true,
      message: 'A postagem foi publicada com sucesso',
    });
  });

  it('should publish a job unsuccessfully', async () => {
    jest.spyOn(service, 'publish').mockResolvedValue(false);
    await controller.handle(jobMock.id);

    expect(await presenter.publishJobResult(false)).toEqual({
      success: false,
      message: 'Houve uma falha ao publicar a postagem',
    });
  });
});
