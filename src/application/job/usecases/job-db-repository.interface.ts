import {
  CreateJob,
  DeleteJob,
  ReadJobById,
} from '../../../domain/job/usecases';
import { CreateJobInput } from '../inputs';
import { ReadJobOutput } from '../outputs';

export interface IJobDbRepository extends CreateJob, ReadJobById, DeleteJob {
  create: (data: CreateJobInput) => Promise<boolean>;
  readById: (id: string) => Promise<ReadJobOutput>;
  delete: (id: string) => Promise<boolean>;
}
