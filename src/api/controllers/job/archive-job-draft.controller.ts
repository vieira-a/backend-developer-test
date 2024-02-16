import { Controller, Param, Put } from '@nestjs/common';

import { ArchiveJobDraftRequest } from '../../../api/transports/job/requests/archive-job-draft.request';
import { ArchiveJobDraftService } from '../../../application/job/services';
import { JobPresenter } from '../../presenters/job';

@Controller('job')
export class ArchiveJobDraftController {
  constructor(
    private readonly _archiveJobDraftService: ArchiveJobDraftService,
    private readonly _jobPresenter: JobPresenter,
  ) {}

  @Put(':job_id/archive')
  async handle(@Param('job_id') job_id: string) {
    const archiveRequest = new ArchiveJobDraftRequest();
    const archiveStatus = archiveRequest.setArchiveStatus();

    await this._archiveJobDraftService.archive(job_id, archiveStatus);

    return await this._jobPresenter.archiveDraftSuccess();
  }
}
