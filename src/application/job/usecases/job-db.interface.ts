import { CreateJobDraftInput, UpdateJobDraftInput } from '../inputs';
import { CreateJobDraftOutput } from '../outputs';

export class IJobDraftDbUseCase {
  create: (data: CreateJobDraftInput) => Promise<CreateJobDraftOutput>;
  update: (id: string, data: UpdateJobDraftInput) => Promise<boolean>;
}
