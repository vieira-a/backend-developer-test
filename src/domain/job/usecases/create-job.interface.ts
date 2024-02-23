import { JobEntity } from '../entities';

export interface CreateJob {
  create: (data: JobEntity) => Promise<boolean>;
}
