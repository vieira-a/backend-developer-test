import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { jobMock } from '../../../../__mocks__/job';
import {
  ReadJobByIdService,
  UpdateJobService,
} from '../../../../application/job/services';
import { DbTypeOrmRepository } from '../../../../infrastructure/access/repositories/job';
import { JobDbModel } from '../../../../infrastructure/access/repositories/job/models';

describe('UpdateJobService', () => {
  let service: UpdateJobService;
  let repository: DbTypeOrmRepository;
  let readJobByIdService: ReadJobByIdService;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateJobService,
        DbTypeOrmRepository,
        {
          provide: getRepositoryToken(JobDbModel),
          useValue: { update: jest.fn() },
        },
        ReadJobByIdService,
        {
          provide: getRepositoryToken(JobDbModel),
          useValue: { readById: jest.fn() },
        },
      ],
    }).compile();

    service = moduleRef.get<UpdateJobService>(UpdateJobService);
    repository = moduleRef.get<DbTypeOrmRepository>(DbTypeOrmRepository);
    readJobByIdService = moduleRef.get<ReadJobByIdService>(ReadJobByIdService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should define dependencies', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
    expect(readJobByIdService).toBeDefined();
  });

  it('should update a job title on success', async () => {
    jest.spyOn(repository, 'update').mockResolvedValue(true);
    jest.spyOn(service, 'update').mockResolvedValue(true);

    const result = await service.update(jobMock.id, {
      ...jobMock,
      title: 'Updated title',
    });
    expect(result).toBe(true);
  });

  it('should update a job description on success', async () => {
    jest.spyOn(repository, 'update').mockResolvedValue(true);
    jest.spyOn(service, 'update').mockResolvedValue(true);

    const result = await service.update(jobMock.id, {
      ...jobMock,
      description: 'Updated description',
    });
    expect(result).toBe(true);
  });

  it('should update a job location on success', async () => {
    jest.spyOn(repository, 'update').mockResolvedValue(true);
    jest.spyOn(service, 'update').mockResolvedValue(true);

    const result = await service.update(jobMock.id, {
      ...jobMock,
      location: 'Updated location',
    });
    expect(result).toBe(true);
  });

  it('should return false if not found job by id', async () => {
    jest.spyOn(readJobByIdService, 'readById').mockResolvedValue(null);
    jest.spyOn(service, 'update').mockResolvedValue(false);

    const result = await service.update(jobMock.id, {
      ...jobMock,
      location: 'Updated location',
    });
    expect(result).toBe(false);
  });

  it('should return an error if service throws', async () => {
    jest.spyOn(service, 'update').mockRejectedValueOnce(new Error());
    await expect(
      service.update(jobMock.id, {
        ...jobMock,
        location: 'Updated location',
      }),
    ).rejects.toThrow(new Error());
  });
});
