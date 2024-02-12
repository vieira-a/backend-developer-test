import { Controller, Get } from '@nestjs/common';

import { CompanyPresenter } from '../../../api/presenters/company';
import { ReadCompaniesService } from '../../../application/company/services';

@Controller('companies')
export class CompanyController {
  constructor(
    private readonly _readCompaniesService: ReadCompaniesService,
    private readonly _companyPresenter: CompanyPresenter,
  ) {}
  @Get()
  async readAll() {
    const output = await this._readCompaniesService.readAll();
    await this._companyPresenter.readCompaniesNotFound(output);
    return await this._companyPresenter.readCompaniesSuccess(output);
  }
}
