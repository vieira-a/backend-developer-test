import { ArchiveJob } from '../../entities/job/archive-job';

export interface IArchiveJobDraft {
  archive: (id: string, archiveStatus: ArchiveJob) => Promise<boolean>;
}
