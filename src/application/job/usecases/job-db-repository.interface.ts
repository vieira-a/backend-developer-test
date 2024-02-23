import { JobStatus } from '../../../domain/enums';
import {
  ArchiveJob,
  CreateJob,
  DeleteJob,
  PublishJob,
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
    UpdateJob,
    PublishJob {
  archive: (id: string, data: JobStatus) => Promise<boolean>;
  create: (data: CreateJobInput) => Promise<boolean>;
  delete: (id: string) => Promise<boolean>;
  readById: (id: string) => Promise<ReadJobOutput>;
  update: (id: string, data: UpdateJobInput) => Promise<boolean>;
  publish: (id: string, data: JobStatus) => Promise<boolean>;
}
