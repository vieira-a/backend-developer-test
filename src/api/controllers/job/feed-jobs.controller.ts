import { Controller, Get } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { FeedJobsResponse } from '../../../api/transports/job/responses';
import { FeedJobsService } from '../../../application/job/services';
import { JobPresenter } from '../../presenters/job';

@ApiTags('job')
@Controller('feed')
export class FeedJobsController {
  constructor(
    private readonly _feedJobsService: FeedJobsService,
    private readonly _jobPresenter: JobPresenter,
  ) {}

  @ApiOkResponse({ type: FeedJobsResponse })
  @ApiNotFoundResponse({
    schema: {
      type: 'object',
      properties: {
        data: { type: 'array', items: { type: 'string' }, example: [] },
      },
    },
  })
  @Get()
  async handle() {
    const output = await this._feedJobsService.feed();
    return await this._jobPresenter.feedJobResult(output);
  }
}
