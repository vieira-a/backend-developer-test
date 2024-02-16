import { Controller, Get, Param } from '@nestjs/common';

import { ReadJobByIdService } from '../../../application/job/services';
import { JobPresenter } from '../../presenters/job';

@Controller('job')
export class ReadJobByIdController {
  constructor(
    private readonly _readJobByIdservice: ReadJobByIdService,
    private readonly _jobPresenter: JobPresenter,
  ) {}

  @Get(':job_id')
  async handle(@Param('job_id') job_id: string) {
    const output = await this._readJobByIdservice.readById(job_id);
    return this._jobPresenter.readJobResult(output);
  }
}
