import { Body, Controller, Param, Patch } from '@nestjs/common';

import { UpdateJobService } from '../../../application/job/services';
import { JobPresenter } from '../../presenters/job';
import { UpdateJobRequest } from '../../transports/job/requests';

@Controller('job')
export class UpdateJobController {
  constructor(
    private readonly _udateJobService: UpdateJobService,
    private readonly _jobPresenter: JobPresenter,
  ) {}

  @Patch(':job_id')
  async handle(
    @Param('job_id') job_id: string,
    @Body() data: UpdateJobRequest,
  ) {
    const output = await this._udateJobService.update(job_id, data);
    return await this._jobPresenter.updateJobResult(output);
  }
}
