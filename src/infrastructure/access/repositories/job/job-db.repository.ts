import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  ArchiveJobDraftInput,
  UpdateJobDraftInput,
} from '../../../../application/job/inputs';
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

  async archive(
    id: string,
    archiveStatus: ArchiveJobDraftInput,
  ): Promise<boolean> {
    return !!(await this._jobRepository.update(
      { id },
      { status: archiveStatus.status },
    ));
  }
}
