import { Controller, Get } from '@nestjs/common';

import { ReadCompaniesService } from '../../../application/company/services';
import { CompanyPresenter } from '../../presenters/company';

@Controller('companies')
export class ReadCompaniesController {
  constructor(
    private readonly _readCompaniesService: ReadCompaniesService,
    private readonly _companyPresenter: CompanyPresenter,
  ) {}
  @Get()
  async handle() {
    const output = await this._readCompaniesService.execute();
    await this._companyPresenter.readCompaniesNotFound(output);
    return await this._companyPresenter.readCompaniesSuccess(output);
  }
}
