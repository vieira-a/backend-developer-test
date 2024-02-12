import { Injectable, NotFoundException } from '@nestjs/common';

import { CompanyResponseMapper } from '../../../api/transports/company/mappers';
import { ReadCompanyOutput } from '../../../application/company/outputs';

@Injectable()
export class CompanyPresenter {
  constructor(private readonly _companyResponseMapper: CompanyResponseMapper) {}

  async readCompaniesSuccess(output: ReadCompanyOutput[]) {
    return await this._companyResponseMapper.readCompaniesResponse(output);
  }

  async readCompanySuccess(output: ReadCompanyOutput) {
    return await this._companyResponseMapper.readCompanyById(output);
  }

  async readCompaniesNotFound(output: ReadCompanyOutput[]) {
    if (output.length === 0) {
      throw new NotFoundException('Registros não encontrados');
    }
  }
}
