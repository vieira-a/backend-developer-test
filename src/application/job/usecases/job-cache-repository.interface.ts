import { FeedJobs } from '../../../domain/job/usecases';
import { FeedJobsOutput } from '../outputs';

export interface IJobCacheRepository extends FeedJobs {
  feed: () => Promise<FeedJobsOutput[]>;
}
