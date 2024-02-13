import { Job } from '../../entities/job';

export interface ICreateJobDraft {
  create: (data: Job) => Promise<Job>;
}
