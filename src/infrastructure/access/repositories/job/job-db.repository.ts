import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UpdateJobDraftInput } from '../../../../application/job/inputs';
import { IJobDraftDbUseCase } from '../../../../application/job/usecases/job-db.interface';
import { JobModel } from './models';

@Injectable()
export class JobDbRepository implements IJobDraftDbUseCase {
  constructor(
    @InjectRepository(JobModel)
    private readonly _jobRepository: Repository<JobModel>,
  ) {}

  async update(id: string, data: UpdateJobDraftInput): Promise<boolean> {
    return !!this._jobRepository.update({ id }, { ...data });
  }
}
