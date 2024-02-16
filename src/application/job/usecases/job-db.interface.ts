import { IUpdateJobDraft } from '../../../domain/usecases/job';
import { UpdateJobDraftInput } from '../inputs';

export class IJobDraftDbUseCase implements IUpdateJobDraft {
  update: (id: string, data: UpdateJobDraftInput) => Promise<boolean>;
}
