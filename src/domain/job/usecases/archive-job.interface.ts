import { ArchiveJobInput } from '../../../application/job/inputs';
import { JobStatus } from '../../../domain/enums';

export interface ValidateArchive {
  validate(data: ArchiveJobInput): Promise<JobStatus>;
}

export interface ArchiveJob {
  archive: (id: string, data: JobStatus) => Promise<boolean>;
}
