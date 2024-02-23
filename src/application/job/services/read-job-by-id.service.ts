import { Injectable } from '@nestjs/common';

import { JobEntity } from '../../../domain/job/entities';
import { ReadJobById } from '../../../domain/job/usecases';
import { DbTypeOrmRepository } from '../../../infrastructure/database/access/repositories/job';

@Injectable()
export class ReadJobByIdService implements ReadJobById {
  constructor(private readonly _repository: DbTypeOrmRepository) {}

  async readById(id: string): Promise<JobEntity> {
    return await this._repository.readById(id);
  }
}
