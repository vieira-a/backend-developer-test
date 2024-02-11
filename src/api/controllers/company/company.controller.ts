import { Controller, Get } from '@nestjs/common';

import { CompanyPresenter } from '../../../api/presenters/company/read-companies.presenter';
import { ReadCompaniesService } from '../../../application/company/services/read-companies.service';

@Controller('companies')
export class CompanyController {
  constructor(
    private readonly _readCompaniesService: ReadCompaniesService,
    private readonly _companyPresenter: CompanyPresenter,
  ) {}
  @Get()
  async readAll() {
    const output = await this._readCompaniesService.readAll();
    return await this._companyPresenter.readCompaniesSuccess(output);
  }
}
