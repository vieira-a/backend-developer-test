import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { jobMock } from '../../../../__mocks__/job';
import { ArchiveJobDraftRequest } from '../../../../api/transports/job/requests/archive-job-draft.request';
import {
  ArchiveJobDraftService,
  ReadJobDraftByIdService,
} from '../../../../application/job/services';
import { JobDbRepository } from '../../../../infrastructure/access/repositories/job';
import { JobModel } from '../../../../infrastructure/access/repositories/job/models';

const archiveRequest = new ArchiveJobDraftRequest();
const archiveStatus = archiveRequest.setArchiveStatus();

describe('ArchiveJobDraftService', () => {
  let service: ArchiveJobDraftService;
  let repository: JobDbRepository;
  let readJobDraftByIdService: ReadJobDraftByIdService;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        ArchiveJobDraftService,
        JobDbRepository,
        {
          provide: getRepositoryToken(JobModel),
          useValue: { archive: jest.fn() },
        },
        ReadJobDraftByIdService,
        {
          provide: getRepositoryToken(JobModel),
          useValue: { readById: jest.fn() },
        },
      ],
    }).compile();

    service = moduleRef.get<ArchiveJobDraftService>(ArchiveJobDraftService);
    repository = moduleRef.get<JobDbRepository>(JobDbRepository);
    readJobDraftByIdService = moduleRef.get<ReadJobDraftByIdService>(
      ReadJobDraftByIdService,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should archive a job on success', async () => {
    jest.spyOn(repository, 'archive').mockResolvedValue(true);
    jest.spyOn(service, 'archive').mockResolvedValue(true);

    const result = await service.archive(jobMock.id, archiveStatus);
    expect(result).toBe(true);
  });

  it('should return false if not found job by id', async () => {
    jest.spyOn(readJobDraftByIdService, 'readById').mockResolvedValue(null);
    jest.spyOn(service, 'archive').mockResolvedValue(false);

    const result = await service.archive(jobMock.id, archiveStatus);
    expect(result).toBe(false);
  });

  it('should return an error if service throws', async () => {
    jest.spyOn(service, 'archive').mockRejectedValueOnce(new Error());
    expect(service.archive(jobMock.id, archiveStatus)).rejects.toThrow(
      new Error(),
    );
  });
});
