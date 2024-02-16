import { Injectable } from '@nestjs/common';

import { ReadCompanyByIdService } from '../../../application/company/services';
import { JobEntity } from '../../../domain/job/entities/job.entity';
import { CreateJob } from '../../../domain/job/usecases/create-job.interface';
import { DbTypeOrmRepository } from '../../../infrastructure/access/repositories/job/db-typeorm.repository';

@Injectable()
export class CreateJobService implements CreateJob {
  constructor(
    private readonly _repository: DbTypeOrmRepository,
    private readonly _readCompanyByIdService: ReadCompanyByIdService,
  ) {}
  async create(data: JobEntity): Promise<boolean> {
    const company = await this._readCompanyByIdService.execute(data.companyId);
    const newJob = JobEntity.create(data, company);

    return await this._repository.create(newJob);
  }
}
