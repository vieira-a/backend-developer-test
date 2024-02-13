import { Injectable } from '@nestjs/common';

import { ReadCompanyByIdService } from '../../../application/company/services';
import { Job } from '../../../domain/entities/job';
import { ICreateJobDraft } from '../../../domain/usecases/job';
import { JobDbRepository } from '../../../infrastructure/access/repositories/job';

@Injectable()
export class CreateJobDraftService implements ICreateJobDraft {
  constructor(
    private readonly _jobDbRepository: JobDbRepository,
    private readonly _readCompanyById: ReadCompanyByIdService,
  ) {}
  async create(data: Job): Promise<Job> {
    const company = await this._readCompanyById.readById(data.companyId);
    const jobData = {
      ...data,
      companyId: company.id,
    };

    return await this._jobDbRepository.create(jobData);
  }
}
