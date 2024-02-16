import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CreateJobController } from '../api/controllers/job/create-job.controller';
import { JobPresenter } from '../api/presenters/job';
import { CreateJobService } from '../application/job/services/create-job.service';
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
  ],
  providers: [
    // ReadJobDraftByIdService,
    // UpdateJobDraftService,
    // DeleteJobDraftService,
    // ArchiveJobDraftService,
    // CreateJobDraftService,
    CreateJobService,
    //JobDbRepository,
    DbTypeOrmRepository,
    JobPresenter,
  ],
})
export class JobModule {}
