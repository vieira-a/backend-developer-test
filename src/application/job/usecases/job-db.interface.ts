import { CreateJobDraftInput, UpdateJobDraftInput } from '../inputs';
import { CreateJobDraftOutput, ReadDraftByIdOutput } from '../outputs';

export class IJobDraftDbUseCase {
  create: (data: CreateJobDraftInput) => Promise<CreateJobDraftOutput>;
  update: (id: string, data: UpdateJobDraftInput) => Promise<boolean>;
  readById: (id: string) => Promise<ReadDraftByIdOutput>;
}
