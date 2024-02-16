import { Controller, Param, Put } from '@nestjs/common';

import { ArchiveJobService } from '../../../application/job/services';
import { JobPresenter } from '../../presenters/job';

@Controller('job')
export class ArchiveJobController {
  constructor(
    private readonly _archiveJobService: ArchiveJobService,
    private readonly _jobPresenter: JobPresenter,
  ) {}

  @Put(':job_id/archive')
  async handle(@Param('job_id') job_id: string) {
    const output = await this._archiveJobService.archive(job_id);
    return await this._jobPresenter.archiveJobResult(output);
  }
}
