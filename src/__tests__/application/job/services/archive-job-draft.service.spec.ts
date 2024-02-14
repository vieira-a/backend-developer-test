import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { jobMock } from '../../../../__mocks__/job';
import { ArchiveJobDraftRequest } from '../../../../api/transports/job/requests/archive-job-draft.request';
import { ArchiveJobDraftService } from '../../../../application/job/services';
import { JobDbRepository } from '../../../../infrastructure/access/repositories/job';
import { JobModel } from '../../../../infrastructure/access/repositories/job/models';

describe('ArchiveJobDraftService', () => {
  let service: ArchiveJobDraftService;
  let repository: JobDbRepository;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        ArchiveJobDraftService,
        JobDbRepository,
        {
          provide: getRepositoryToken(JobModel),
          useValue: { archive: jest.fn() },
        },
      ],
    }).compile();

    service = moduleRef.get<ArchiveJobDraftService>(ArchiveJobDraftService);
    repository = moduleRef.get<JobDbRepository>(JobDbRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should archive a job on success', async () => {
    const archiveRequest = new ArchiveJobDraftRequest();
    const archiveStatus = archiveRequest.setArchiveStatus();

    jest.spyOn(repository, 'archive').mockResolvedValue(true);
    jest.spyOn(service, 'archive').mockResolvedValue(true);

    const result = await service.archive(jobMock.id, archiveStatus);
    expect(result).toBe(true);
  });
});
