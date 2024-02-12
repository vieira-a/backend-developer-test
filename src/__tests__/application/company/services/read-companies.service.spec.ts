import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { companiesMock } from '../../../../__mocks__/company';
import { ReadCompaniesService } from '../../../../application/company/services/read-companies.service';
import { CompanyDbRepository } from '../../../../infrastructure/access/repositories/company/company-db.repository';
import { CompanyModel } from '../../../../infrastructure/access/repositories/company/models/company.model';

describe('ReadCompaniesService', () => {
  let service: ReadCompaniesService;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        ReadCompaniesService,
        CompanyDbRepository,
        {
          provide: getRepositoryToken(CompanyModel),
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

  it('should read all companies on success', async () => {
    jest.spyOn(service, 'readAll').mockResolvedValue(companiesMock);
    const result = await service.readAll();
    expect(result).toEqual(companiesMock);
  });
});
