import { Controller, Get, Param } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { ReadCompaniesResponse } from '../../../api/transports/company/responses';
import { ReadCompanyByIdService } from '../../../application/company/services';
import { CompanyPresenter } from '../../presenters/company';

@ApiTags('company')
@Controller('companies')
export class ReadCompanyByIdController {
  constructor(
    private readonly _readCompanyByIdService: ReadCompanyByIdService,
    private readonly _companyPresenter: CompanyPresenter,
  ) {}

  @ApiOkResponse({
    type: ReadCompaniesResponse,
  })
  @ApiNotFoundResponse({
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: false },
        data: { type: 'array', items: { type: 'string' }, example: [] },
      },
    },
  })
  @Get(':company_id')
  async handle(@Param('company_id') company_id: string) {
    const output = await this._readCompanyByIdService.readById(company_id);
    await this._companyPresenter.readCompanyNotFound(output);
    return await this._companyPresenter.readCompanyResult(output);
  }
}
