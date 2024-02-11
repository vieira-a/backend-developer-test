import { Injectable } from '@nestjs/common';

import { Company } from '../../../domain/entities/company';
import { IReadCompaniesUseCase } from '../../../domain/usecases/read-companies.interface';
import { CompanyDbRepository } from '../../../infrastructure/access/repositories/company/company-db.repository';

@Injectable()
export class ReadCompaniesService implements IReadCompaniesUseCase {
  constructor(private readonly _companyDbRepository: CompanyDbRepository) {}
  async readAll(): Promise<Company[]> {
    return await this._companyDbRepository.readAll();
  }
}
