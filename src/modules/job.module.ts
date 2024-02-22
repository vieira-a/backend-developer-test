import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  ArchiveJobController,
  CreateJobController,
  DeleteJobController,
  PublishJobController,
  ReadJobByIdController,
  UpdateJobController,
} from '../api/controllers/job';
import { JobPresenter } from '../api/presenters/job';
import {
  ArchiveJobService,
  CreateJobService,
  DeleteJobService,
  PublishJobService,
  ReadJobByIdService,
  UpdateJobService,
} from '../application/job/services';
import { DbTypeOrmRepository } from '../infrastructure/access/repositories/job/db-typeorm.repository';
import { JobDbModel } from '../infrastructure/access/repositories/job/models/job-db.model';
import { SqsService } from '../infrastructure/aws/sqs/sqs.service';
import { CompanyModule } from './company.module';

@Module({
  imports: [TypeOrmModule.forFeature([JobDbModel]), CompanyModule],
  controllers: [
    CreateJobController,
    ReadJobByIdController,
    DeleteJobController,
    ArchiveJobController,
    UpdateJobController,
    PublishJobController,
  ],
  providers: [
    ArchiveJobService,
    CreateJobService,
    DeleteJobService,
    ReadJobByIdService,
    PublishJobService,
    UpdateJobService,
    SqsService,
    JobPresenter,
    DbTypeOrmRepository,
  ],
})
export class JobModule {}
