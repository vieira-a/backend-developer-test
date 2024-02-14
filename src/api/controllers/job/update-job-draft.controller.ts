import { Body, Controller, Param, Patch } from '@nestjs/common';

import { UpdateJobDraftService } from '../../../application/job/services';
import { JobPresenter } from '../../presenters/job';
import { UpdateJobDraftRequest } from '../../transports/job/requests';

@Controller('job')
export class UpdateJobDraftController {
  constructor(
    private readonly _updateJobDraftService: UpdateJobDraftService,
    private readonly _jobPresenter: JobPresenter,
  ) {}

  @Patch(':job_id')
  async handle(
    @Param('job_id') job_id: string,
    @Body() data: UpdateJobDraftRequest,
  ) {
    const output = await this._updateJobDraftService.execute(job_id, data);

    if (!output) {
      return await this._jobPresenter.updatedDraftNotSuccess();
    }

    return await this._jobPresenter.updatedDraftSuccess();
  }
}
