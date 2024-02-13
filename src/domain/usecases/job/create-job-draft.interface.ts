import { Job } from '../../entities/job';

export interface CreateJobDraft {
  create: (data: Job) => Promise<Job>;
}
