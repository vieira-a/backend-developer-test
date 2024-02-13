import { CreateJobDraftInput } from '../inputs';
import { CreateJobDraftOutput } from '../outputs';

export class IJobDraftDbUseCase {
  create: (data: CreateJobDraftInput) => Promise<CreateJobDraftOutput>;
}
