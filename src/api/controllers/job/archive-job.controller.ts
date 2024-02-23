import { Controller, Param, Put } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

import { ArchiveJobResponse } from '../../../api/transports/job/responses';
import { ArchiveJobService } from '../../../application/job/services';
import { JobPresenter } from '../../presenters/job';

@ApiTags('job')
@Controller('job')
export class ArchiveJobController {
  constructor(
    private readonly _archiveJobService: ArchiveJobService,
    private readonly _jobPresenter: JobPresenter,
  ) {}

  @ApiParam({ name: 'job_id', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiOkResponse({
    type: ArchiveJobResponse,
  })
  @ApiBadRequestResponse({
    description: 'A publicação não foi localizada',
  })
  @ApiUnprocessableEntityResponse({
    description: 'Apenas postagens publicadas podem ser arquivadas',
  })
  @Put(':job_id/archive')
  async handle(@Param('job_id') job_id: string) {
    const output = await this._archiveJobService.archive(job_id);
    return await this._jobPresenter.archiveJobResult(output);
  }
}
