import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CreateJobDraftController } from '../api/controllers/job/create-job-draft.controller';
import { CreateJobDraftService } from '../application/job/services';
import { JobDbRepository } from '../infrastructure/access/repositories/job';
import { JobModel } from '../infrastructure/access/repositories/job/models';
import { CompanyModule } from './company.module';

@Module({
  imports: [TypeOrmModule.forFeature([JobModel]), CompanyModule],
  controllers: [CreateJobDraftController],
  providers: [CreateJobDraftService, JobDbRepository],
})
export class JobModule {}
