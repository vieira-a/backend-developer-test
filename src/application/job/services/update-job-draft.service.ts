import { Injectable } from '@nestjs/common';

import { UpdateJob } from '../../../domain/entities/job';
import { IUpdateJobDraft } from '../../../domain/usecases/job';
import { JobDbRepository } from '../../../infrastructure/access/repositories/job';

@Injectable()
export class UpdateJobDraftService implements IUpdateJobDraft {
  constructor(private readonly _jobDbRepository: JobDbRepository) {}
  async execute(id: string, data: UpdateJob): Promise<boolean> {
    return await this._jobDbRepository.update(id, data);
  }
}
