import {
  IArchiveJobDraft,
  ICreateJobDraft,
  IDeleteJobDraft,
  IReadJobDraftById,
  IUpdateJobDraft,
} from '../../../domain/usecases/job';
import { CreateJobDraftInput, UpdateJobDraftInput } from '../inputs';
import { ArchiveJobDraftInput } from '../inputs/archive-job-draft.input';
import { CreateJobDraftOutput, ReadDraftByIdOutput } from '../outputs';

export class IJobDraftDbUseCase
  implements
    ICreateJobDraft,
    IReadJobDraftById,
    IUpdateJobDraft,
    IDeleteJobDraft,
    IArchiveJobDraft
{
  create: (data: CreateJobDraftInput) => Promise<CreateJobDraftOutput>;
  readById: (id: string) => Promise<ReadDraftByIdOutput>;
  update: (id: string, data: UpdateJobDraftInput) => Promise<boolean>;
  delete: (id: string) => Promise<boolean>;
  archive: (
    id: string,
    archiveStatus: ArchiveJobDraftInput,
  ) => Promise<boolean>;
}
