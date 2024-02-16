import {
  IArchiveJobDraft,
  IUpdateJobDraft,
} from '../../../domain/usecases/job';
import { UpdateJobDraftInput } from '../inputs';
import { ArchiveJobDraftInput } from '../inputs/archive-job-draft.input';

export class IJobDraftDbUseCase implements IUpdateJobDraft, IArchiveJobDraft {
  update: (id: string, data: UpdateJobDraftInput) => Promise<boolean>;
  archive: (
    id: string,
    archiveStatus: ArchiveJobDraftInput,
  ) => Promise<boolean>;
}
