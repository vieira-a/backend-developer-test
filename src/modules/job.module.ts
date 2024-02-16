import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  ArchiveJobController,
  CreateJobController,
  DeleteJobController,
  ReadJobByIdController,
  UpdateJobController,
} from '../api/controllers/job';
import { JobPresenter } from '../api/presenters/job';
import {
  ArchiveJobService,
  CreateJobService,
  DeleteJobService,
  ReadJobByIdService,
  UpdateJobService,
} from '../application/job/services';
import { DbTypeOrmRepository } from '../infrastructure/access/repositories/job/db-typeorm.repository';
import { JobDbModel } from '../infrastructure/access/repositories/job/models/job-db.model';
import { CompanyModule } from './company.module';

@Module({
  imports: [TypeOrmModule.forFeature([JobDbModel]), CompanyModule],
  controllers: [
    CreateJobController,
    ReadJobByIdController,
    DeleteJobController,
    ArchiveJobController,
    UpdateJobController,
  ],
  providers: [
    CreateJobService,
    ReadJobByIdService,
    DeleteJobService,
    ArchiveJobService,
    UpdateJobService,
    DbTypeOrmRepository,
    JobPresenter,
  ],
})
export class JobModule {}
