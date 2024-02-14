import { Body, Controller, Post } from '@nestjs/common';

import { CreateJobDraftService } from '../../../application/job/services';
import { JobPresenter } from '../../presenters/job';
import { CreateJobDraftRequest } from '../../transports/job/requests';

@Controller('job')
export class CreateJobDraftController {
  constructor(
    private readonly _createJobDraftService: CreateJobDraftService,
    private readonly _jobPresenter: JobPresenter,
  ) {}

  @Post()
  async handle(@Body() data: CreateJobDraftRequest) {
    const output = await this._createJobDraftService.execute(data);
    return await this._jobPresenter.createDraftSuccess(output);
  }
}
