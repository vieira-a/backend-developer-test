import { Injectable } from '@nestjs/common';

import { CreateJobDraftOutput } from '../../../application/job/outputs';
import { JobResponseMapper } from '../../transports/job/mapper';

@Injectable()
export class JobPresenter {
  constructor(private readonly _jobResponseMapper: JobResponseMapper) {}
  async createDraftSuccess(output: CreateJobDraftOutput) {
    return await this._jobResponseMapper.jobDraftResponse(output);
  }

  async updatedDraftSuccess() {
    return 'Registro atualizado com sucesso';
  }

  async updatedDraftNotSuccess() {
    return 'Sem dados para atualizar';
  }
}
