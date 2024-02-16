import { Injectable, NotFoundException } from '@nestjs/common';

import { IDeleteJobDraft } from '../../../domain/usecases/job';
import { JobDbRepository } from '../../../infrastructure/access/repositories/job';
import { ReadJobByIdService } from './read-job-by-id.service';

@Injectable()
export class DeleteJobDraftService implements IDeleteJobDraft {
  constructor(
    private readonly _jobDbRepository: JobDbRepository,
    private readonly _readJobByIdService: ReadJobByIdService,
  ) {}
  async delete(id: string): Promise<boolean> {
    const job = await this._readJobByIdService.readById(id);

    if (!job) {
      throw new NotFoundException(`Job com ID ${id} não localizado`);
    }

    return await this._jobDbRepository.delete(job.id);
  }
}
