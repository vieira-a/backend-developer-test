import { Body, Controller, Post } from '@nestjs/common';

import { JobPresenter } from '../../../api/presenters/job';
import { CreateJobService } from '../../../application/job/services/create-job.service';
import { CreateJobRequest } from '../../transports/job/requests/create-job.request';

@Controller('job')
export class CreateJobController {
  constructor(
    private readonly _createJobService: CreateJobService,
    private readonly _jobPresenter: JobPresenter,
  ) {}

  @Post()
  async handle(@Body() data: CreateJobRequest) {
    const output = await this._createJobService.create(data);
    return this._jobPresenter.createJobResult(output);
  }
}
