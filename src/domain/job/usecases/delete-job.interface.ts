import { JobEntity } from '../entities';

export interface DeleteJob {
  delete(id: string): Promise<boolean>;
}

export interface ValidateDelete {
  validate(data: JobEntity): Promise<void>;
}
