import { UpdateJob } from '../../entities/job';

export interface IUpdateJobDraft {
  execute: (id: string, data: UpdateJob) => Promise<boolean>;
}
