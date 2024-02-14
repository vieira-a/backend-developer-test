import { Controller, Delete, Param } from '@nestjs/common';

import { DeleteJobDraftService } from '../../../application/job/services';
import { JobPresenter } from '../../presenters/job';

@Controller('job')
export class DeleteJobDraftController {
  constructor(
    private readonly _deleteJobDraftService: DeleteJobDraftService,
    private readonly _jobPresenter: JobPresenter,
  ) {}

  @Delete(':job_id')
  async handle(@Param('job_id') job_id: string) {
    const output = await this._deleteJobDraftService.delete(job_id);

    if (!output) {
      return await this._jobPresenter.deletedDraftNotSuccess();
    }

    return await this._jobPresenter.deletedDraftSuccess();
  }
}
