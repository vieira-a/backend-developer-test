import { ArchiveJobDraftInput } from '../../../../application/job/inputs';
import { JobStatus } from '../../../../domain/enums';

export class ArchiveJobDraftRequest extends ArchiveJobDraftInput {
  public status: JobStatus;

  setArchiveStatus() {
    this.status = JobStatus.ARCHIVED;
    return this;
  }
}
