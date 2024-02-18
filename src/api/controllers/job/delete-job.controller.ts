import { Controller, Delete, Param } from '@nestjs/common';

import { DeleteJobService } from '../../../application/job/services';
import { JobPresenter } from '../../presenters/job';

@Controller('job')
export class DeleteJobController {
  constructor(
    private readonly _deleteJobService: DeleteJobService,
    private readonly _jobPresenter: JobPresenter,
  ) {}

  @Delete(':job_id')
  async handle(@Param('job_id') job_id: string) {
    const output = await this._deleteJobService.delete(job_id);
    return await this._jobPresenter.deleteJobResult(output);
  }
}
