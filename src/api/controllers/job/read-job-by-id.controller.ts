import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';

import { ReadJobResponse } from '../../../api/transports/job/responses';
import { ReadJobByIdService } from '../../../application/job/services';
import { JobPresenter } from '../../presenters/job';

@ApiTags('job')
@Controller('job')
export class ReadJobByIdController {
  constructor(
    private readonly _readJobByIdservice: ReadJobByIdService,
    private readonly _jobPresenter: JobPresenter,
  ) {}

  @ApiParam({ name: 'job_id', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiOkResponse({ type: ReadJobResponse })
  @Get(':job_id')
  async handle(@Param('job_id') job_id: string) {
    const output = await this._readJobByIdservice.readById(job_id);
    return this._jobPresenter.readJobResult(output);
  }
}
