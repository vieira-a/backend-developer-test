import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ReadCompanyOutput } from '../../../../application/company/outputs';
import { IReadCompaniesDbUseCase } from '../../../../application/company/usecases';
import { CompanyModel } from './models';

@Injectable()
export class CompanyDbRepository implements IReadCompaniesDbUseCase {
  constructor(
    @InjectRepository(CompanyModel)
    private readonly _companyRepository: Repository<CompanyModel>,
  ) {}
  async readAll(): Promise<ReadCompanyOutput[]> {
    return await this._companyRepository.find();
  }
}
