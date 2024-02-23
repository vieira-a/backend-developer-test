import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  ArchiveJobController,
  CreateJobController,
  DeleteJobController,
  FeedJobsController,
  PublishJobController,
  ReadJobByIdController,
  UpdateJobController,
} from '../api/controllers/job';
import { JobPresenter } from '../api/presenters/job';
import {
  ArchiveJobService,
  CreateJobService,
  DeleteJobService,
  FeedJobsService,
  PublishJobService,
  ReadJobByIdService,
  UpdateJobService,
} from '../application/job/services';
import { SqsService } from '../infrastructure/aws/sqs/sqs.service';
import { CacheModule } from '../infrastructure/cache/cache.module';
import { DbTypeOrmJobRepository } from '../infrastructure/database/access/repositories/job/db-typeorm-job.repository';
import { JobDbModel } from '../infrastructure/database/access/repositories/job/models/job-db.model';
import { CompanyModule } from './company.module';

@Module({
  imports: [TypeOrmModule.forFeature([JobDbModel]), CompanyModule, CacheModule],
  controllers: [
    CreateJobController,
    ReadJobByIdController,
    DeleteJobController,
    ArchiveJobController,
    UpdateJobController,
    PublishJobController,
    FeedJobsController,
  ],
  providers: [
    ArchiveJobService,
    CreateJobService,
    DeleteJobService,
    ReadJobByIdService,
    PublishJobService,
    UpdateJobService,
    FeedJobsService,
    SqsService,
    JobPresenter,
    DbTypeOrmJobRepository,
  ],
})
export class JobModule {}
