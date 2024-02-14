import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { jobMock } from '../../../../__mocks__/job';
import { ReadCompanyByIdService } from '../../../../application/company/services';
import { CreateJobDraftService } from '../../../../application/job/services';
import { CompanyDbRepository } from '../../../../infrastructure/access/repositories/company';
import { CompanyModel } from '../../../../infrastructure/access/repositories/company/models';
import { JobDbRepository } from '../../../../infrastructure/access/repositories/job';
import { JobModel } from '../../../../infrastructure/access/repositories/job/models';

describe('CreateJobDraftService', () => {
  let service: CreateJobDraftService;
  let repository: JobDbRepository;
  let readCompanyByIdService: ReadCompanyByIdService;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        CreateJobDraftService,
        {
          provide: getRepositoryToken(JobModel),
          useValue: { execute: jest.fn() },
        },
        JobDbRepository,
        {
          provide: getRepositoryToken(JobModel),
          useValue: { create: jest.fn() },
        },
        ReadCompanyByIdService,
        {
          provide: getRepositoryToken(CompanyModel),
          useValue: { execute: jest.fn() },
        },
        CompanyDbRepository,
        {
          provide: getRepositoryToken(CompanyModel),
          useValue: { readById: jest.fn() },
        },
      ],
    }).compile();

    service = moduleRef.get<CreateJobDraftService>(CreateJobDraftService);
    repository = moduleRef.get<JobDbRepository>(JobDbRepository);
    readCompanyByIdService = moduleRef.get<ReadCompanyByIdService>(
      ReadCompanyByIdService,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a job draft on success', async () => {
    jest.spyOn(service, 'create').mockResolvedValue(jobMock);
    const result = await service.create(jobMock);
    expect(result).toEqual(jobMock);
  });

  it('should return an error if service throws', async () => {
    jest.spyOn(service, 'create').mockRejectedValueOnce(new Error());
    await expect(service.create(jobMock)).rejects.toThrow(new Error());
  });

  it('should return 404 if not found company', async () => {
    const notFoundId = '40a5ccb7-850a-4a8c-bdc0-86bbd3ba3388';
    jest.spyOn(readCompanyByIdService, 'execute').mockResolvedValue(null);
    jest
      .spyOn(service, 'create')
      .mockRejectedValueOnce(
        new NotFoundException(`Empresa com ID ${notFoundId} não encontrada`),
      );
    expect(repository.create).not.toHaveBeenCalled;
    await expect(service.create).rejects.toThrow(
      new NotFoundException(`Empresa com ID ${notFoundId} não encontrada`),
    );
  });
});
