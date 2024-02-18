import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { companiesMock } from '../../../../__mocks__/company';
import { ReadCompanyByIdController } from '../../../../api/controllers/company';
import { CompanyPresenter } from '../../../../api/presenters/company';
import { companyResponseMapper } from '../../../../api/transports/company/mappers';
import { ReadCompanyByIdService } from '../../../../application/company/services';
import { DbTypeOrmCompanyRepository } from '../../../../infrastructure/access/repositories/company';
import { CompanyDbModel } from '../../../../infrastructure/access/repositories/company/models';

describe('ReadCompanyByIdController', () => {
  let controller: ReadCompanyByIdController;
  let service: ReadCompanyByIdService;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ReadCompanyByIdController],
      providers: [
        ReadCompanyByIdService,
        DbTypeOrmCompanyRepository,
        CompanyPresenter,
        {
          provide: getRepositoryToken(CompanyDbModel),
          useValue: {
            readById: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = app.get<ReadCompanyByIdController>(ReadCompanyByIdController);
    service = app.get<ReadCompanyByIdService>(ReadCompanyByIdService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should returns a company by id on success', async () => {
    jest.spyOn(service, 'readById').mockResolvedValue(companiesMock[0]);
    const companiesMappedMock = companyResponseMapper(companiesMock[0]);
    const output = controller.handle(companiesMock[0].id);

    expect(await output).toEqual({
      success: true,
      data: companiesMappedMock,
    });
  });

  it('should returns 404 if not found company by id', async () => {
    jest.spyOn(service, 'readById').mockResolvedValue(null);
    const output = controller.handle('non-existent-uuid');

    expect(output).rejects.toThrow(
      new NotFoundException('Registro não encontrado'),
    );
  });

  it('should returns 404 if uuid is invalid', async () => {
    jest
      .spyOn(service, 'readById')
      .mockImplementationOnce(() =>
        Promise.reject(new NotFoundException('ID com formato inválido')),
      );
    const output = controller.handle('non-existent-uuid');

    expect(output).rejects.toThrow(
      new NotFoundException('ID com formato inválido'),
    );
  });

  it('should return an error if service throws', async () => {
    jest
      .spyOn(service, 'readById')
      .mockRejectedValueOnce(
        new InternalServerErrorException(
          'Houve um erro interno ao processar solicitação',
        ),
      );
    await expect(controller.handle(companiesMock[0].id)).rejects.toThrow(
      new InternalServerErrorException(
        'Houve um erro interno ao processar solicitação',
      ),
    );
  });
});
