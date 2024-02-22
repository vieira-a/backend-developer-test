import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ReadCompaniesOutput } from '../../../../application/company/outputs';
import { CompanyDbRepository } from '../../../../application/company/usecases';
import { CompanyDbModel } from './models';

@Injectable()
export class DbTypeOrmCompanyRepository implements CompanyDbRepository {
  constructor(
    @InjectRepository(CompanyDbModel)
    private readonly _repository: Repository<CompanyDbModel>,
  ) {}

  async readAll(): Promise<ReadCompaniesOutput[]> {
    return await this._repository.find();
  }

  async readById(id: string): Promise<ReadCompaniesOutput | null> {
    return await this._repository.findOne({ where: { id } });
  }
}
