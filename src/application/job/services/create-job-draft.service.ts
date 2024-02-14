import { Injectable, NotFoundException } from '@nestjs/common';

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
  async execute(data: Job): Promise<Job> {
    const company = await this._readCompanyById.execute(data.companyId);

    if (!company) {
      throw new NotFoundException(
        `Empresa com ID ${data.companyId} não encontrada`,
      );
    }

    return await this._jobDbRepository.create({
      ...data,
      companyId: company.id,
    });
  }
}
