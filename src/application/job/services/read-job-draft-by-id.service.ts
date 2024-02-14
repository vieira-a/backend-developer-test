import { Injectable } from '@nestjs/common';

import { Job } from '../../../domain/entities/job';
import { IReadJobDraftById } from '../../../domain/usecases/job';
import { JobDbRepository } from '../../../infrastructure/access/repositories/job';

@Injectable()
export class ReadJobDraftByIdService implements IReadJobDraftById {
  constructor(private readonly _companyDbRepository: JobDbRepository) {}
  async execute(id: string): Promise<Job> {
    return await this._companyDbRepository.readById(id);
  }
}
