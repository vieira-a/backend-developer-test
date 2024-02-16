import { JobEntity } from '../../../domain/job/entities/job.entity';

export interface CreateJobOutput {
  message?: string;
  error?: Error;
  data?: JobEntity;
}
