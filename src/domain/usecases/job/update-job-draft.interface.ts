import { UpdateJob } from '../../entities/job';

export interface IUpdateJobDraft {
  update: (id: string, data: UpdateJob) => Promise<boolean>;
}
