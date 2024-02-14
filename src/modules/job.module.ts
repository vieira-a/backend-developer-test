import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CreateJobDraftController } from '../api/controllers/job/create-job-draft.controller';
import { JobPresenter } from '../api/presenters/job';
import { JobResponseMapper } from '../api/transports/job/mapper';
import { CreateJobDraftService } from '../application/job/services';
import { JobDbRepository } from '../infrastructure/access/repositories/job';
import { JobModel } from '../infrastructure/access/repositories/job/models';
import { CompanyModule } from './company.module';

@Module({
  imports: [TypeOrmModule.forFeature([JobModel]), CompanyModule],
  controllers: [CreateJobDraftController],
  providers: [
    CreateJobDraftService,
    JobDbRepository,
    JobPresenter,
    JobResponseMapper,
  ],
})
export class JobModule {}
