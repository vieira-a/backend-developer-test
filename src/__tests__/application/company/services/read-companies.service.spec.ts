import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

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

  it('should read all companies on success', async () => {
    const companies = [
      {
        id: 'uuid_1',
        name: 'name_1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'uuid_2',
        name: 'name_2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    jest.spyOn(service, 'readAll').mockResolvedValue(companies);
    const result = await service.readAll();
    expect(result).toEqual(companies);
  });
});
