import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { companiesMock } from '../../../../__mocks__/company';
import { ReadCompaniesController } from '../../../../api/controllers/company';
import { CompanyPresenter } from '../../../../api/presenters/company';
import { companiesResponseMapper } from '../../../../api/transports/company/mappers';
import { ReadCompaniesService } from '../../../../application/company/services';
import { DbTypeOrmCompanyRepository } from '../../../../infrastructure/database/access/repositories/company';
import { CompanyDbModel } from '../../../../infrastructure/database/access/repositories/company/models';

describe('ReadCompaniesController', () => {
  let controller: ReadCompaniesController;
  let service: ReadCompaniesService;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ReadCompaniesController],
      providers: [
        ReadCompaniesService,
        DbTypeOrmCompanyRepository,
        CompanyPresenter,
        {
          provide: getRepositoryToken(CompanyDbModel),
          useValue: {
            execute: jest.fn(),
            readById: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = app.get<ReadCompaniesController>(ReadCompaniesController);
    service = app.get<ReadCompaniesService>(ReadCompaniesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should returns all mapped companies on success', async () => {
    jest.spyOn(service, 'readAll').mockResolvedValue(companiesMock);
    const companiesMappedMock = companiesResponseMapper(companiesMock);
    const output = controller.handle();

    expect(await output).toEqual({
      success: true,
      data: companiesMappedMock,
    });
  });

  it('should returns 404 if not found companies', async () => {
    jest.spyOn(service, 'readAll').mockResolvedValue([]);
    const output = controller.handle();

    expect(output).rejects.toThrow(
      new NotFoundException('Registros não encontrados'),
    );
  });

  it('should return an error if service throws', async () => {
    jest.spyOn(service, 'readAll').mockRejectedValueOnce(new Error());
    await expect(controller.handle()).rejects.toThrow(new Error());
  });
});
