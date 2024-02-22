import { FeedJobEntity } from '../entities';

export interface FeedJobs {
  feed: () => Promise<FeedJobEntity[]>;
}
