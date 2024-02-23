import { Injectable } from '@nestjs/common';

import { CompanyEntity } from '../../../domain/company/entities';
import { ReadCompanyById } from '../../../domain/company/usecases';
import { DbTypeOrmCompanyRepository } from '../../../infrastructure/database/access/repositories/company';

@Injectable()
export class ReadCompanyByIdService implements ReadCompanyById {
  constructor(private readonly _repository: DbTypeOrmCompanyRepository) {}

  async readById(id: string): Promise<CompanyEntity> {
    return await this._repository.readById(id);
  }
}
