import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { jobMock } from '../../../../__mocks__/job';
import { ReadCompanyByIdService } from '../../../../application/company/services';
import { CreateJobService } from '../../../../application/job/services';
import { CompanyDbRepository } from '../../../../infrastructure/access/repositories/company';
import { CompanyModel } from '../../../../infrastructure/access/repositories/company/models';
import { DbTypeOrmRepository } from '../../../../infrastructure/access/repositories/job/db-typeorm.repository';
import { JobDbModel } from '../../../../infrastructure/access/repositories/job/models/job-db.model';

describe('CreateJobService', () => {
  let service: CreateJobService;
  let repository: DbTypeOrmRepository;
  let readCompanyByIdService: ReadCompanyByIdService;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        CreateJobService,
        DbTypeOrmRepository,
        {
          provide: getRepositoryToken(JobDbModel),
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

    service = moduleRef.get<CreateJobService>(CreateJobService);
    repository = moduleRef.get<DbTypeOrmRepository>(DbTypeOrmRepository);
    readCompanyByIdService = moduleRef.get<ReadCompanyByIdService>(
      ReadCompanyByIdService,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be define dependencies', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
    expect(readCompanyByIdService).toBeDefined();
  });

  it('should create a job draft on success', async () => {
    jest.spyOn(service, 'create').mockResolvedValue(true);
    const result = await service.create(jobMock);
    expect(result).toEqual(true);
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
