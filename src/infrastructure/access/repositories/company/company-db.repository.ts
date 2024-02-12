import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ReadCompanyOutput } from '../../../../application/company/outputs';
import { IReadCompanyDbUseCase } from '../../../../application/company/usecases';
import { CompanyModel } from './models';

@Injectable()
export class CompanyDbRepository implements IReadCompanyDbUseCase {
  constructor(
    @InjectRepository(CompanyModel)
    private readonly _companyRepository: Repository<CompanyModel>,
  ) {}

  async readAll(): Promise<ReadCompanyOutput[]> {
    return await this._companyRepository.find();
  }

  async readById(id: string): Promise<ReadCompanyOutput | null> {
    return await this._companyRepository.findOne({ where: { id } });
  }
}
