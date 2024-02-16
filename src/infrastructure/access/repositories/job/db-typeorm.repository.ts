import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
}
