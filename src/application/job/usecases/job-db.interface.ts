import {
  IArchiveJobDraft,
  IDeleteJobDraft,
  IUpdateJobDraft,
} from '../../../domain/usecases/job';
import { UpdateJobDraftInput } from '../inputs';
import { ArchiveJobDraftInput } from '../inputs/archive-job-draft.input';

export class IJobDraftDbUseCase
  implements IUpdateJobDraft, IDeleteJobDraft, IArchiveJobDraft
{
  update: (id: string, data: UpdateJobDraftInput) => Promise<boolean>;
  delete: (id: string) => Promise<boolean>;
  archive: (
    id: string,
    archiveStatus: ArchiveJobDraftInput,
  ) => Promise<boolean>;
}
