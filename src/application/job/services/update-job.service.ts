import { Injectable } from '@nestjs/common';

import { UpdateJobEntity } from '../../../domain/job/entities';
import { UpdateJob, ValidateUpdate } from '../../../domain/job/usecases';
import { DbTypeOrmRepository } from '../../../infrastructure/database/access/repositories/job';
import { UpdateJobInput } from '../inputs';
import { ReadJobByIdService } from './read-job-by-id.service';

@Injectable()
export class UpdateJobService implements UpdateJob, ValidateUpdate {
  constructor(
    private readonly _repository: DbTypeOrmRepository,
    private readonly _readJobByIdService: ReadJobByIdService,
  ) {}

  async validate(data: UpdateJobInput): Promise<boolean> {
    return await UpdateJobEntity.validateUpdate(data);
  }

  async update(id: string, data: UpdateJobInput): Promise<boolean> {
    await this._readJobByIdService.readById(id);

    await this.validate(data);

    return await this._repository.update(id, data);
  }
}
