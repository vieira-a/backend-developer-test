import { Injectable } from '@nestjs/common';

import { JobStatus } from '../../../domain/enums';
import { JobEntity } from '../../../domain/job/entities';
import { ArchiveJob, ValidateArchive } from '../../../domain/job/usecases';
import { DbTypeOrmJobRepository } from '../../../infrastructure/database/access/repositories/job';
import { ArchiveJobInput } from '../inputs';
import { ReadJobByIdService } from './read-job-by-id.service';

@Injectable()
export class ArchiveJobService implements ArchiveJob, ValidateArchive {
  constructor(
    private readonly _repository: DbTypeOrmJobRepository,
    private readonly _readJobByIdService: ReadJobByIdService,
  ) {}

  async validate(data: ArchiveJobInput): Promise<JobStatus> {
    return await JobEntity.validateArchive(data);
  }

  async archive(id: string): Promise<boolean> {
    const job = await this._readJobByIdService.readById(id);
    const validatedStatus = await this.validate(job);

    return await this._repository.archive(id, validatedStatus);
  }
}
