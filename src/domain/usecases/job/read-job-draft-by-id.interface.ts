import { Job } from '../../entities/job';

export interface IReadJobDraftById {
  execute: (id: string) => Promise<Job>;
}
