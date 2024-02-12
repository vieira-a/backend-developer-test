import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { companiesMock } from '../../../../__mocks__/company';
import { CompanyController } from '../../../../api/controllers/company';
import { CompanyPresenter } from '../../../../api/presenters/company';
import { CompanyResponseMapper } from '../../../../api/transports/company/mappers';
import { ReadCompaniesService } from '../../../../application/company/services';
import { CompanyDbRepository } from '../../../../infrastructure/access/repositories/company';
import { CompanyModel } from '../../../../infrastructure/access/repositories/company/models';

describe('LoadAllCustomersController', () => {
  let controller: CompanyController;
  let service: ReadCompaniesService;
  let mapper: CompanyResponseMapper;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CompanyController],
      providers: [
        ReadCompaniesService,
        CompanyDbRepository,
        CompanyPresenter,
        CompanyResponseMapper,
        {
          provide: getRepositoryToken(CompanyModel),
          useValue: {
            load: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = app.get<CompanyController>(CompanyController);
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

  it('should returns an empty array if not found companies', async () => {
    jest.spyOn(service, 'readAll').mockResolvedValue([]);
    const companiesMappedMock = mapper.readCompaniesResponse([]);
    const output = controller.readAll();

    expect(output).toEqual(companiesMappedMock);
  });
});
