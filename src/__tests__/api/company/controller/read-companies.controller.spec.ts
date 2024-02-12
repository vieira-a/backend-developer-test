import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { companiesMock } from '../../../../__mocks__/company';
import { ReadCompaniesController } from '../../../../api/controllers/company';
import { CompanyPresenter } from '../../../../api/presenters/company';
import { CompanyResponseMapper } from '../../../../api/transports/company/mappers';
import { ReadCompaniesService } from '../../../../application/company/services';
import { CompanyDbRepository } from '../../../../infrastructure/access/repositories/company';
import { CompanyModel } from '../../../../infrastructure/access/repositories/company/models';

describe('ReadCompaniesController', () => {
  let controller: ReadCompaniesController;
  let service: ReadCompaniesService;
  let mapper: CompanyResponseMapper;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ReadCompaniesController],
      providers: [
        ReadCompaniesService,
        CompanyDbRepository,
        CompanyPresenter,
        CompanyResponseMapper,
        {
          provide: getRepositoryToken(CompanyModel),
          useValue: {
            readAll: jest.fn(),
            readById: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = app.get<ReadCompaniesController>(ReadCompaniesController);
    service = app.get<ReadCompaniesService>(ReadCompaniesService);
    mapper = app.get<CompanyResponseMapper>(CompanyResponseMapper);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should returns all mapped companies on success', async () => {
    jest.spyOn(service, 'readAll').mockResolvedValue(companiesMock);
    const companiesMappedMock = mapper.readCompaniesResponse(companiesMock);
    const output = controller.readAll();

    expect(output).toEqual(companiesMappedMock);
  });

  it('should returns 404 if not found companies', async () => {
    jest.spyOn(service, 'readAll').mockResolvedValue([]);
    const output = controller.readAll();

    expect(output).rejects.toThrow(
      new NotFoundException('Registros não encontrados'),
    );
  });

  it('should return an error if service throws', async () => {
    jest.spyOn(service, 'readAll').mockRejectedValueOnce(new Error());
    await expect(controller.readAll()).rejects.toThrow(new Error());
  });
});
