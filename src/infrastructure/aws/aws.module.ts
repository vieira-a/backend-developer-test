import { Module } from '@nestjs/common';

import { SqsService } from './sqs/sqs.service';

@Module({
  providers: [SqsService],
})
export class AwsModule {}
