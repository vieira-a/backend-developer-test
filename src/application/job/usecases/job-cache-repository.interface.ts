import { FeedJobs } from '../../../domain/job/usecases';

export interface IJobCacheRepository extends FeedJobs {
  feed: () => Promise<string>;
}
