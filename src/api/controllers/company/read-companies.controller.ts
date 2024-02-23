import { Controller, Get } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { ReadCompaniesResponse } from '../../../api/transports/company/responses';
import { ReadCompaniesService } from '../../../application/company/services';
import { CompanyPresenter } from '../../presenters/company';

@Controller('companies')
@ApiTags('company')
export class ReadCompaniesController {
  constructor(
    private readonly _readCompaniesService: ReadCompaniesService,
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
  @Get()
  async handle() {
    const output = await this._readCompaniesService.readAll();
    await this._companyPresenter.readCompaniesNotFound(output);
    return await this._companyPresenter.readCompaniesResult(output);
  }
}
