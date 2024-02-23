import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

import { UpdateJobInput } from '../../../../../application/job/inputs';
import { ReadJobOutput } from '../../../../../application/job/outputs';
import { IJobDbRepository } from '../../../../../application/job/usecases';
import { JobStatus } from '../../../../../domain/enums';
import { JobDbModel } from './models/job-db.model';

@Injectable()
export class DbTypeOrmJobRepository implements IJobDbRepository {
  constructor(
    @InjectRepository(JobDbModel)
    private readonly _typeOrmRepository: Repository<JobDbModel>,
  ) {}

  async create(data: JobDbModel): Promise<boolean> {
    await this._typeOrmRepository.save(data);
    return true;
  }

  async readById(id: string): Promise<ReadJobOutput> {
    return await this._typeOrmRepository.findOne({ where: { id } });
  }

  async delete(id: string): Promise<boolean> {
    const deleteResult: DeleteResult = await this._typeOrmRepository.delete({
      id,
    });
    if (deleteResult.affected === 0) {
      return false;
    }
    return true;
  }

  async archive(id: string, data: JobStatus): Promise<boolean> {
    await this._typeOrmRepository.update({ id }, { status: data });
    return true;
  }

  async update(id: string, data: UpdateJobInput): Promise<boolean> {
    await this._typeOrmRepository.update({ id }, { ...data });
    return true;
  }

  async publish(id: string, data: JobStatus): Promise<boolean> {
    await this._typeOrmRepository.update({ id }, { status: data });
    return true;
  }
}
