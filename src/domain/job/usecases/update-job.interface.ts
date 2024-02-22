import { UpdateJobInput } from '../../../application/job/inputs';

export interface ValidateUpdate {
  validate(data: UpdateJobInput): Promise<boolean>;
}

export interface UpdateJob {
  update: (id: string, data: UpdateJobInput) => Promise<boolean>;
}
