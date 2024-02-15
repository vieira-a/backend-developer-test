import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { ArchiveJob } from '../../../domain/entities/job/archive-job';
import { IArchiveJobDraft } from '../../../domain/usecases/job';
import { JobDbRepository } from '../../../infrastructure/access/repositories/job';
import { ReadJobDraftByIdService } from './read-job-draft-by-id.service';

@Injectable()
export class ArchiveJobDraftService implements IArchiveJobDraft {
  constructor(
    private readonly _jobDbRepository: JobDbRepository,
    private readonly _readJobDraftByIdService: ReadJobDraftByIdService,
  ) {}

  async archive(id: string, archiveStatus: ArchiveJob): Promise<boolean> {
    const job = await this._readJobDraftByIdService.readById(id);

    if (!job) {
      throw new NotFoundException(`Job com ID ${id} não localizado`);
    }

    if (job.status !== 'published') {
      throw new BadRequestException(
        'Apenas postagens publicadas podem ser arquivadas',
      );
    }
    return await this._jobDbRepository.archive(job.id, archiveStatus);
  }
}
