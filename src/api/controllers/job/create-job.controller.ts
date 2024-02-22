import { Body, Controller, Post } from '@nestjs/common';

import { JobPresenter } from '../../../api/presenters/job';
import { CreateJobService } from '../../../application/job/services';
import { CreateJobRequest } from '../../transports/job/requests';

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
