import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateJobDraftInput } from '../../../../application/job/inputs';
import { CreateJobDraftOutput } from '../../../../application/job/outputs';
import { IJobDraftDbUseCase } from '../../../../application/job/usecases/job-db.interface';
import { JobModel } from './models';

@Injectable()
export class JobDbRepository implements IJobDraftDbUseCase {
  constructor(
    @InjectRepository(JobModel)
    private readonly _jobRepository: Repository<JobModel>,
  ) {}
  async create(data: CreateJobDraftInput): Promise<CreateJobDraftOutput> {
    return await this._jobRepository.save(data);
  }
}
