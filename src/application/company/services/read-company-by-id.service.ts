import { Injectable } from '@nestjs/common';

import { Company } from '../../../domain/entities/company';
import { IReadCompanyByIdUseCase } from '../../../domain/usecases/company';
import { CompanyDbRepository } from '../../../infrastructure/access/repositories/company';

@Injectable()
export class ReadCompanyByIdService implements IReadCompanyByIdUseCase {
  constructor(private readonly _companyDbRepository: CompanyDbRepository) {}
  async execute(id: string): Promise<Company> {
    return await this._companyDbRepository.readById(id);
  }
}
