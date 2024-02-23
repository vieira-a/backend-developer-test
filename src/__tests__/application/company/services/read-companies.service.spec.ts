import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { companiesMock } from '../../../../__mocks__/company';
import { ReadCompaniesService } from '../../../../application/company/services/read-companies.service';
import { DbTypeOrmCompanyRepository } from '../../../../infrastructure/database/access/repositories/company/db-typeorm-company.repository';
import { CompanyDbModel } from '../../../../infrastructure/database/access/repositories/company/models/company-db.model';

describe('ReadCompaniesService', () => {
  let service: ReadCompaniesService;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        ReadCompaniesService,
        DbTypeOrmCompanyRepository,
        {
          provide: getRepositoryToken(CompanyDbModel),
          useValue: {
            readAll: jest.fn(),
          },
        },
      ],
    }).compile();

    service = moduleRef.get<ReadCompaniesService>(ReadCompaniesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return all companies on success', async () => {
    jest.spyOn(service, 'readAll').mockResolvedValue(companiesMock);
    const result = await service.readAll();
    expect(result).toEqual(companiesMock);
  });

  it('should return an empty array if not found companies', async () => {
    jest.spyOn(service, 'readAll').mockResolvedValue([]);
    const result = await service.readAll();
    expect(result).toEqual([]);
  });

  it('should return an error if service throws', async () => {
    jest.spyOn(service, 'readAll').mockRejectedValueOnce(new Error());
    await expect(service.readAll()).rejects.toThrow(new Error());
  });
});
