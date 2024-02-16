import { JobStatus } from 'src/domain/enums';

import {
  ArchiveJob,
  CreateJob,
  DeleteJob,
  ReadJobById,
  UpdateJob,
} from '../../../domain/job/usecases';
import { CreateJobInput, UpdateJobInput } from '../inputs';
import { ReadJobOutput } from '../outputs';

export interface IJobDbRepository
  extends CreateJob,
    ReadJobById,
    DeleteJob,
    ArchiveJob,
    UpdateJob {
  create: (data: CreateJobInput) => Promise<boolean>;
  readById: (id: string) => Promise<ReadJobOutput>;
  delete: (id: string) => Promise<boolean>;
  archive: (id: string, data: JobStatus) => Promise<boolean>;
  update: (id: string, data: UpdateJobInput) => Promise<boolean>;
}
