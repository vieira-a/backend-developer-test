import { ApiProperty } from '@nestjs/swagger';

import { FeedJobsOutput } from '../../../../application/job/outputs';

export class FeedJobsResponse {
  @ApiProperty({ type: [FeedJobsOutput] })
  data?: FeedJobsOutput[];
}
