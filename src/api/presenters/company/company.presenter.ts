import { Injectable, NotFoundException } from '@nestjs/common';

import {
  companiesResponseMapper,
  companyResponseMapper,
} from '../../../api/transports/company/mappers';
import { ReadCompaniesResponse } from '../../../api/transports/company/responses';
import {
  ReadCompaniesOutput,
  ReadCompanyOutput,
} from '../../../application/company/outputs';

@Injectable()
export class CompanyPresenter {
  async readCompaniesResult(
    output: ReadCompaniesOutput[],
  ): Promise<ReadCompaniesResponse> {
    return {
      success: true,
      data: companiesResponseMapper(output),
    };
  }

  async readCompanyResult(output: ReadCompanyOutput) {
    if (output) {
      return {
        success: true,
        data: companyResponseMapper(output),
      };
    }
  }

  async readCompaniesNotFound(output: ReadCompaniesOutput[]) {
    if (output.length === 0) {
      throw new NotFoundException('Registros não encontrados');
    }
  }

  async readCompanyNotFound(output: ReadCompaniesOutput) {
    if (!output) {
      throw new NotFoundException('Registro não encontrado');
    }
  }
}
