import { Injectable } from '@nestjs/common';

import { JobStatus } from '../../../domain/enums';
import { JobEntity } from '../../../domain/job/entities';
import { PublishJob, ValidatePublish } from '../../../domain/job/usecases';
import { DbTypeOrmRepository } from '../../../infrastructure/access/repositories/job';
import { PublishJobInput } from '../inputs';
import { ReadJobByIdService } from './read-job-by-id.service';

@Injectable()
export class PublishJobService implements ValidatePublish, PublishJob {
  constructor(
    private readonly _repository: DbTypeOrmRepository,
    private readonly _readJobByIdService: ReadJobByIdService,
  ) {}

  async validate(data: PublishJobInput): Promise<JobStatus> {
    return await JobEntity.validatePublish(data);
  }

  async publish(id: string): Promise<boolean> {
    const job = await this._readJobByIdService.readById(id);
    const validatedStatus = await this.validate(job);

    await this._repository.archive(id, validatedStatus);
    return true;
  }
}
