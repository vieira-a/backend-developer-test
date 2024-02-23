import { Injectable } from '@nestjs/common';

import { ReadCompanyByIdService } from '../../../application/company/services';
import { JobEntity } from '../../../domain/job/entities/job.entity';
import { CreateJob } from '../../../domain/job/usecases/create-job.interface';
import { DbTypeOrmJobRepository } from '../../../infrastructure/database/access/repositories/job/db-typeorm-job.repository';

@Injectable()
export class CreateJobService implements CreateJob {
  constructor(
    private readonly _repository: DbTypeOrmJobRepository,
    private readonly _readCompanyByIdService: ReadCompanyByIdService,
  ) {}
  async create(data: JobEntity): Promise<boolean> {
    const company = await this._readCompanyByIdService.readById(data.companyId);
    const newJob = JobEntity.create(data, company);

    return await this._repository.create(newJob);
  }
}
