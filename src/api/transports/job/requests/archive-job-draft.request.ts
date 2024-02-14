import { ArchiveJobDraftInput } from '../../../../application/job/inputs';
import { JobStatus } from '../../../../domain/enums';

export class UpdateJobDraftStatus extends ArchiveJobDraftInput {
  public status: JobStatus;

  archive() {
    this.status = JobStatus.ARCHIVED;
    return this;
  }
}
