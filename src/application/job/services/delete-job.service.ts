import { Injectable } from '@nestjs/common';

import { JobEntity } from '../../../domain/job/entities';
import { DeleteJob, ValidateDelete } from '../../../domain/job/usecases';
import { DbTypeOrmRepository } from '../../../infrastructure/access/repositories/job';
import { ReadJobByIdService } from './read-job-by-id.service';

@Injectable()
export class DeleteJobService implements DeleteJob, ValidateDelete {
  constructor(
    private readonly _repository: DbTypeOrmRepository,
    private readonly _readJobByIdService: ReadJobByIdService,
  ) {}

  async validate(data: JobEntity): Promise<void> {
    await JobEntity.validateDelete(data);
  }

  async delete(id: string): Promise<boolean> {
    const job = await this._readJobByIdService.readById(id);
    await this.validate(job);
    return await this._repository.delete(id);
  }
}
