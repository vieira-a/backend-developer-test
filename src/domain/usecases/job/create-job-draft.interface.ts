import { Job } from '../../entities/job';

export interface ICreateJobDraft {
  execute: (data: Job) => Promise<Job>;
}
