import { Injectable } from '@nestjs/common';

import { IDeleteJobDraft } from '../../../domain/usecases/job';
import { JobDbRepository } from '../../../infrastructure/access/repositories/job';

@Injectable()
export class DeleteJobDraftService implements IDeleteJobDraft {
  constructor(private readonly _jobDbRepository: JobDbRepository) {}
  async delete(id: string): Promise<boolean> {
    return await this._jobDbRepository.delete(id);
  }
}
