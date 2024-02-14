import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

import {
  CreateJobDraftInput,
  UpdateJobDraftInput,
} from '../../../../application/job/inputs';
import {
  CreateJobDraftOutput,
  ReadDraftByIdOutput,
} from '../../../../application/job/outputs';
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

  async update(id: string, data: UpdateJobDraftInput): Promise<boolean> {
    const job = await this._jobRepository.findOne({ where: { id } });
    return !!this._jobRepository.update({ id: job.id }, { ...data });
  }

  async readById(id: string): Promise<ReadDraftByIdOutput> {
    return await this._jobRepository.findOne({ where: { id } });
  }

  async delete(id: string): Promise<boolean> {
    const deleteResult: DeleteResult = await this._jobRepository.delete({ id });
    if (deleteResult.affected === 0) {
      return false;
    }
    return true;
  }
}
