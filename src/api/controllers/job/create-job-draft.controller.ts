import { Body, Controller, Post } from '@nestjs/common';

import { CreateJobDraftRequest } from '../../../api/transports/job/create-job-draft.request';
import { CreateJobDraftService } from '../../../application/job/services';

@Controller('job')
export class CreateJobDraftController {
  constructor(private readonly _createJobDraftService: CreateJobDraftService) {}

  @Post()
  async handle(@Body() data: CreateJobDraftRequest) {
    await this._createJobDraftService.create(data);
  }
}
