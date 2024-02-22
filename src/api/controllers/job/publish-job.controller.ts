import { Controller, Param, Put } from '@nestjs/common';

import { PublishJobService } from '../../../application/job/services';
import { JobPresenter } from '../../presenters/job';

@Controller('job')
export class PublishJobController {
  constructor(
    private readonly _publishJobService: PublishJobService,
    private readonly _jobPresenter: JobPresenter,
  ) {}

  @Put(':job_id/publish')
  async handle(@Param('job_id') job_id: string) {
    const output = await this._publishJobService.publish(job_id);
    return await this._jobPresenter.publishJobResult(output);
  }
}
