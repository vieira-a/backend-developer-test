import { Injectable, NotFoundException } from '@nestjs/common';

import { IDeleteJobDraft } from '../../../domain/usecases/job';
import { JobDbRepository } from '../../../infrastructure/access/repositories/job';
import { ReadJobDraftByIdService } from './read-job-draft-by-id.service';

@Injectable()
export class DeleteJobDraftService implements IDeleteJobDraft {
  constructor(
    private readonly _jobDbRepository: JobDbRepository,
    private readonly _readJobDraftByIdService: ReadJobDraftByIdService,
  ) {}
  async delete(id: string): Promise<boolean> {
    const job = await this._readJobDraftByIdService.readById(id);

    if (!job) {
      throw new NotFoundException(`Job com ID ${id} não localizado`);
    }

    return await this._jobDbRepository.delete(job.id);
  }
}
