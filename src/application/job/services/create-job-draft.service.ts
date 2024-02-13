import { Injectable } from '@nestjs/common';
import { ReadCompanyByIdService } from 'src/application/company/services';
import { JobDbRepository } from 'src/infrastructure/access/repositories/job';

import { Job } from '../../../domain/entities/job';
import { ICreateJobDraft } from '../../../domain/usecases/job';

@Injectable()
export class CreateJobDraftService implements ICreateJobDraft {
  constructor(
    private readonly _jobDbRepository: JobDbRepository,
    private readonly _readCompanyById: ReadCompanyByIdService,
  ) {}
  async create(data: Job, companyId: string): Promise<Job> {
    const company = await this._readCompanyById.readById(companyId);
    const jobData = {
      ...data,
      companyId: company.id,
    };

    return await this._jobDbRepository.create(jobData);
  }
}
