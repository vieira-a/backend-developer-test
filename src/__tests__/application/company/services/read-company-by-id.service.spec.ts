import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { companiesMock } from '../../../../__mocks__/company';
import { ReadCompanyByIdService } from '../../../../application/company/services';
import { DbTypeOrmCompanyRepository } from '../../../../infrastructure/database/access/repositories/company';
import { CompanyDbModel } from '../../../../infrastructure/database/access/repositories/company/models';

describe('ReadCompanyByIdService', () => {
  let service: ReadCompanyByIdService;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        ReadCompanyByIdService,
        DbTypeOrmCompanyRepository,
        {
          provide: getRepositoryToken(CompanyDbModel),
          useValue: {
            execute: jest.fn(),
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

  it('should return null if not found company by id', async () => {
    jest.spyOn(service, 'readById').mockResolvedValue(null);
    const result = await service.readById('non-existent-uuid');
    expect(result).toEqual(null);
  });

  it('should return an error if service throws', async () => {
    jest.spyOn(service, 'readById').mockRejectedValueOnce(new Error());
    await expect(service.readById(companiesMock[0].id)).rejects.toThrow(
      new Error(),
    );
  });
});
