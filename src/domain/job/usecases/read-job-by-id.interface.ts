import { JobEntity } from '../entities';

export interface ReadJobById {
  readById: (id: string) => Promise<JobEntity>;
}
