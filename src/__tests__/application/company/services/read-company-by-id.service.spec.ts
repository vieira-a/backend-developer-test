import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { companiesMock } from '../../../../__mocks__/company';
import { ReadCompanyByIdService } from '../../../../application/company/services';
import { CompanyDbRepository } from '../../../../infrastructure/access/repositories/company';
import { CompanyModel } from '../../../../infrastructure/access/repositories/company/models';

describe('ReadCompaniesService', () => {
  let service: ReadCompanyByIdService;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        ReadCompanyByIdService,
        CompanyDbRepository,
        {
          provide: getRepositoryToken(CompanyModel),
          useValue: {
            readAll: jest.fn(),
          },
        },
      ],
    }).compile();

    service = moduleRef.get<ReadCompanyByIdService>(ReadCompanyByIdService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return a company by id on success', async () => {
    jest.spyOn(service, 'readById').mockResolvedValue(companiesMock[0]);
    const result = await service.readById(companiesMock[0].id);
    expect(result).toEqual(companiesMock[0]);
  });
});
