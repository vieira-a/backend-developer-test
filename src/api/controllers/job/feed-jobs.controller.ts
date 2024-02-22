import { Controller, Get } from '@nestjs/common';

import { FeedJobsService } from '../../../application/job/services';
import { JobPresenter } from '../../presenters/job';

@Controller('feed')
export class FeedJobsController {
  constructor(
    private readonly _feedJobsService: FeedJobsService,
    private readonly _jobPresenter: JobPresenter,
  ) {}

  @Get()
  async handle() {
    const output = await this._feedJobsService.feed();
    return await this._jobPresenter.feedJobResult(output);
  }
}
