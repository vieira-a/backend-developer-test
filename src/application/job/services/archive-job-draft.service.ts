import { Injectable } from '@nestjs/common';

import { ArchiveJob } from '../../../domain/entities/job/archive-job';
import { IArchiveJobDraft } from '../../../domain/usecases/job';
import { JobDbRepository } from '../../../infrastructure/access/repositories/job';

@Injectable()
export class ArchiveJobDraftService implements IArchiveJobDraft {
  constructor(private readonly _jobDbRepository: JobDbRepository) {}

  async archive(id: string, archiveStatus: ArchiveJob): Promise<boolean> {
    return await this._jobDbRepository.archive(id, archiveStatus);
  }
}
