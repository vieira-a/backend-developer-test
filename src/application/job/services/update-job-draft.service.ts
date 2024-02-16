import { Injectable, NotFoundException } from '@nestjs/common';

import { UpdateJob } from '../../../domain/entities/job';
import { IUpdateJobDraft } from '../../../domain/usecases/job';
import { JobDbRepository } from '../../../infrastructure/access/repositories/job';
import { ReadJobByIdService } from './read-job-by-id.service';

@Injectable()
export class UpdateJobDraftService implements IUpdateJobDraft {
  constructor(
    private readonly _jobDbRepository: JobDbRepository,
    private readonly _readJobByIdService: ReadJobByIdService,
  ) {}
  async update(id: string, data: UpdateJob): Promise<boolean> {
    const job = await this._readJobByIdService.readById(id);

    if (!job) {
      throw new NotFoundException(`Job com ID ${id} não localizado`);
    }

    return await this._jobDbRepository.update(job.id, data);
  }
}
