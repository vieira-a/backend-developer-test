import { JobStatus } from 'src/domain/enums';

import {
  ArchiveJob,
  CreateJob,
  DeleteJob,
  ReadJobById,
} from '../../../domain/job/usecases';
import { CreateJobInput } from '../inputs';
import { ReadJobOutput } from '../outputs';

export interface IJobDbRepository
  extends CreateJob,
    ReadJobById,
    DeleteJob,
    ArchiveJob {
  create: (data: CreateJobInput) => Promise<boolean>;
  readById: (id: string) => Promise<ReadJobOutput>;
  delete: (id: string) => Promise<boolean>;
  archive: (id: string, data: JobStatus) => Promise<boolean>;
}
