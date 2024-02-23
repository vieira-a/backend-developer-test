import { Injectable } from '@nestjs/common';

import { CompanyEntity } from '../../../domain/company/entities';
import { ReadCompanies } from '../../../domain/company/usecases';
import { DbTypeOrmCompanyRepository } from '../../../infrastructure/database/access/repositories/company';

@Injectable()
export class ReadCompaniesService implements ReadCompanies {
  constructor(private readonly _repository: DbTypeOrmCompanyRepository) {}

  async readAll(): Promise<CompanyEntity[]> {
    return await this._repository.readAll();
  }
}
