import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { companiesMock } from '../../../../__mocks__/company';
import { ReadCompanyByIdController } from '../../../../api/controllers/company';
import { CompanyPresenter } from '../../../../api/presenters/company';
import { CompanyResponseMapper } from '../../../../api/transports/company/mappers';
import { ReadCompanyByIdService } from '../../../../application/company/services';
import { CompanyDbRepository } from '../../../../infrastructure/access/repositories/company';
import { CompanyModel } from '../../../../infrastructure/access/repositories/company/models';

describe('ReadCompanyByIdController', () => {
  let controller: ReadCompanyByIdController;
  let service: ReadCompanyByIdService;
  let mapper: CompanyResponseMapper;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ReadCompanyByIdController],
      providers: [
        ReadCompanyByIdService,
        CompanyDbRepository,
        CompanyPresenter,
        CompanyResponseMapper,
        {
          provide: getRepositoryToken(CompanyModel),
          useValue: {
            readById: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = app.get<ReadCompanyByIdController>(ReadCompanyByIdController);
    service = app.get<ReadCompanyByIdService>(ReadCompanyByIdService);
    mapper = app.get<CompanyResponseMapper>(CompanyResponseMapper);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should returns a company by id on success', async () => {
    jest.spyOn(service, 'readById').mockResolvedValue(companiesMock[0]);
    const companiesMappedMock = mapper.readCompanyById(companiesMock[0]);
    const output = controller.handle(companiesMock[0].id);

    expect(output).toEqual(companiesMappedMock);
  });
});
