import { Controller, Get, Param } from '@nestjs/common';

import { ReadCompanyByIdService } from '../../../application/company/services';
import { CompanyPresenter } from '../../presenters/company';

@Controller('companies')
export class ReadCompanyByIdController {
  constructor(
    private readonly _readCompanyByIdService: ReadCompanyByIdService,
    private readonly _companyPresenter: CompanyPresenter,
  ) {}

  @Get(':company_id')
  async handle(@Param('company_id') company_id: string) {
    const output = await this._readCompanyByIdService.readById(company_id);
    await this._companyPresenter.readCompanyNotFound(output);
    return await this._companyPresenter.readCompanyResult(output);
  }
}
