import { Body, Controller, Post } from '@nestjs/common';

import { CreateJobDraftRequest } from '../../../api/transports/job/create-job-draft.request';
import { CreateJobDraftService } from '../../../application/job/services';
import { JobPresenter } from '../../presenters/job';

@Controller('job')
export class CreateJobDraftController {
  constructor(
    private readonly _createJobDraftService: CreateJobDraftService,
    private readonly _jobPresenter: JobPresenter,
  ) {}

  @Post()
  async handle(@Body() data: CreateJobDraftRequest) {
    const output = await this._createJobDraftService.create(data);
    return await this._jobPresenter.createDraftSuccess(output);
  }
}
