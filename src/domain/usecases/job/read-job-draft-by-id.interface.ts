import { Job } from '../../entities/job';

export interface IReadJobDraftById {
  readById: (id: string) => Promise<Job>;
}
