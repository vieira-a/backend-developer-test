import { Injectable } from '@nestjs/common';

import { ReadCompanyOutput } from '../../../../application/company/outputs/read-companies.output';

@Injectable()
export class CompanyResponseMapper {
  async readCompaniesResponse(output: ReadCompanyOutput[]) {
    return output.map((company) => ({ id: company.id, name: company.name }));
  }
}
