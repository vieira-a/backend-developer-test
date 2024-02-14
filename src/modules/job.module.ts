import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  ArchiveJobDraftController,
  CreateJobDraftController,
  DeleteJobDraftController,
  UpdateJobDraftController,
} from '../api/controllers/job';
import { JobPresenter } from '../api/presenters/job';
import { JobResponseMapper } from '../api/transports/job/mapper';
import {
  ArchiveJobDraftService,
  CreateJobDraftService,
  DeleteJobDraftService,
  ReadJobDraftByIdService,
  UpdateJobDraftService,
} from '../application/job/services';
import { JobDbRepository } from '../infrastructure/access/repositories/job';
import { JobModel } from '../infrastructure/access/repositories/job/models';
import { CompanyModule } from './company.module';

@Module({
  imports: [TypeOrmModule.forFeature([JobModel]), CompanyModule],
  controllers: [
    CreateJobDraftController,
    UpdateJobDraftController,
    DeleteJobDraftController,
    ArchiveJobDraftController,
  ],
  providers: [
    CreateJobDraftService,
    ReadJobDraftByIdService,
    UpdateJobDraftService,
    DeleteJobDraftService,
    ArchiveJobDraftService,
    JobDbRepository,
    JobPresenter,
    JobResponseMapper,
  ],
})
export class JobModule {}
