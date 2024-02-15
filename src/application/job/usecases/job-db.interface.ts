import {
  IArchiveJobDraft,
  IDeleteJobDraft,
  IReadJobDraftById,
  IUpdateJobDraft,
} from '../../../domain/usecases/job';
import { UpdateJobDraftInput } from '../inputs';
import { ArchiveJobDraftInput } from '../inputs/archive-job-draft.input';
import { ReadDraftByIdOutput } from '../outputs';

export class IJobDraftDbUseCase
  implements
    IReadJobDraftById,
    IUpdateJobDraft,
    IDeleteJobDraft,
    IArchiveJobDraft
{
  readById: (id: string) => Promise<ReadDraftByIdOutput>;
  update: (id: string, data: UpdateJobDraftInput) => Promise<boolean>;
  delete: (id: string) => Promise<boolean>;
  archive: (
    id: string,
    archiveStatus: ArchiveJobDraftInput,
  ) => Promise<boolean>;
}
