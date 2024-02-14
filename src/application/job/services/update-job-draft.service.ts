import { Injectable, NotFoundException } from '@nestjs/common';

import { UpdateJob } from '../../../domain/entities/job';
import { IUpdateJobDraft } from '../../../domain/usecases/job';
import { JobDbRepository } from '../../../infrastructure/access/repositories/job';
import { ReadJobDraftByIdService } from './read-job-draft-by-id.service';

@Injectable()
export class UpdateJobDraftService implements IUpdateJobDraft {
  constructor(
    private readonly _jobDbRepository: JobDbRepository,
    private readonly _readJobDraftByIdService: ReadJobDraftByIdService,
  ) {}
  async execute(id: string, data: UpdateJob): Promise<boolean> {
    const job = await this._readJobDraftByIdService.execute(id);

    if (!job) {
      throw new NotFoundException(`Job com ID ${id} não localizado`);
    }

    return await this._jobDbRepository.update(job.id, data);
  }
}
