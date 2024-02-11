import { Injectable } from '@nestjs/common';

import { Company } from '../../../domain/entities/company';
import { IReadCompaniesUseCase } from '../../../domain/usecases/read-companies.interface';

@Injectable()
export class ReadCompaniesService implements IReadCompaniesUseCase {
  async readAll(): Promise<Company[]> {
    return null;
  }
}
