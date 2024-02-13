import { Job } from '../../entities/job';

export interface ICreateJobDraft {
  create: (data: Job, companyId: string) => Promise<Job>;
}
