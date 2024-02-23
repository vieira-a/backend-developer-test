import { Controller, Delete, Param } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { DeleteJobResponse } from '../../../api/transports/job/responses';
import { DeleteJobService } from '../../../application/job/services';
import { JobPresenter } from '../../presenters/job';

@ApiTags('job')
@Controller('job')
export class DeleteJobController {
  constructor(
    private readonly _deleteJobService: DeleteJobService,
    private readonly _jobPresenter: JobPresenter,
  ) {}

  @ApiParam({ name: 'job_id', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiOkResponse({ type: DeleteJobResponse })
  @ApiBadRequestResponse({
    description: 'A publicação não foi localizada',
  })
  @Delete(':job_id')
  async handle(@Param('job_id') job_id: string) {
    const output = await this._deleteJobService.delete(job_id);
    return await this._jobPresenter.deleteJobResult(output);
  }
}
