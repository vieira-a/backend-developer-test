import { Injectable } from '@nestjs/common';

import { Company } from '../../../domain/entities';
import { IReadCompanyByIdUseCase } from '../../../domain/usecases';
import { CompanyDbRepository } from '../../../infrastructure/access/repositories/company';

@Injectable()
export class ReadCompanyByIdService implements IReadCompanyByIdUseCase {
  constructor(private readonly _companyDbRepository: CompanyDbRepository) {}
  async readById(id: string): Promise<Company> {
    return await this._companyDbRepository.readById(id);
  }
}
