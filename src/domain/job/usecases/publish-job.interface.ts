import { PublishJobInput } from '../../../application/job/inputs';
import { JobStatus } from '../../enums';

export interface ValidatePublish {
  validate(data: PublishJobInput): Promise<JobStatus>;
}

export interface PublishJob {
  publish: (id: string, data: JobStatus) => Promise<boolean>;
}
