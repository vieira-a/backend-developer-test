import { Injectable } from '@nestjs/common';

import { CompanyResponseMapper } from '../../../api/transports/company/mappers';
import { ReadCompanyOutput } from '../../../application/company/outputs';

@Injectable()
export class CompanyPresenter {
  constructor(private readonly _companyResponseMapper: CompanyResponseMapper) {}

  async readCompaniesSuccess(output: ReadCompanyOutput[]) {
    return await this._companyResponseMapper.readCompaniesResponse(output);
  }
}
