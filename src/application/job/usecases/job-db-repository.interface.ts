import { CreateJob } from '../../../domain/job/usecases';
import { CreateJobInput } from '../inputs';

export interface IJobDbRepository extends CreateJob {
  create: (data: CreateJobInput) => Promise<boolean>;
}
