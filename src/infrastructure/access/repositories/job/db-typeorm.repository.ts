import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

import { ReadJobOutput } from '../../../../application/job/outputs';
import { IJobDbRepository } from '../../../../application/job/usecases';
import { JobDbModel } from './models/job-db.model';

@Injectable()
export class DbTypeOrmRepository implements IJobDbRepository {
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
}
