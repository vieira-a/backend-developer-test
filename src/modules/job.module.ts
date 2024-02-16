import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  CreateJobController,
  DeleteJobController,
  ReadJobByIdController,
} from '../api/controllers/job';
import { JobPresenter } from '../api/presenters/job';
import {
  CreateJobService,
  DeleteJobService,
  ReadJobByIdService,
} from '../application/job/services';
import { DbTypeOrmRepository } from '../infrastructure/access/repositories/job/db-typeorm.repository';
import { JobDbModel } from '../infrastructure/access/repositories/job/models/job-db.model';
import { CompanyModule } from './company.module';

// import {
//   ArchiveJobDraftController,
//   CreateJobDraftController,
//   DeleteJobDraftController,
//   UpdateJobDraftController,
// } from '../api/controllers/job';
// import {
//   ArchiveJobDraftService,
//   CreateJobDraftService,
//   DeleteJobDraftService,
//   ReadJobDraftByIdService,
//   UpdateJobDraftService,
// } from '../application/job/services';
//import { JobDbRepository } from '../infrastructure/access/repositories/job';
//import { JobModel } from '../infrastructure/access/repositories/job/models';
@Module({
  imports: [TypeOrmModule.forFeature([JobDbModel]), CompanyModule],
  controllers: [
    // CreateJobDraftController,
    // UpdateJobDraftController,
    // DeleteJobDraftController,
    // ArchiveJobDraftController,
    CreateJobController,
    ReadJobByIdController,
    DeleteJobController,
  ],
  providers: [
    // ReadJobDraftByIdService,
    // UpdateJobDraftService,
    // DeleteJobDraftService,
    // ArchiveJobDraftService,
    // CreateJobDraftService,
    CreateJobService,
    ReadJobByIdService,
    DeleteJobService,
    //JobDbRepository,
    DbTypeOrmRepository,
    JobPresenter,
  ],
})
export class JobModule {}
