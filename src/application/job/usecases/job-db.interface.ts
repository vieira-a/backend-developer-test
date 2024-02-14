import {
  ICreateJobDraft,
  IDeleteJobDraft,
  IReadJobDraftById,
  IUpdateJobDraft,
} from '../../../domain/usecases/job';
import { CreateJobDraftInput, UpdateJobDraftInput } from '../inputs';
import { CreateJobDraftOutput, ReadDraftByIdOutput } from '../outputs';

export class IJobDraftDbUseCase
  implements
    ICreateJobDraft,
    IReadJobDraftById,
    IUpdateJobDraft,
    IDeleteJobDraft
{
  create: (data: CreateJobDraftInput) => Promise<CreateJobDraftOutput>;
  readById: (id: string) => Promise<ReadDraftByIdOutput>;
  update: (id: string, data: UpdateJobDraftInput) => Promise<boolean>;
  delete: (id: string) => Promise<boolean>;
}
