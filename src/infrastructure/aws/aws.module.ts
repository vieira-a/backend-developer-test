import { Module } from '@nestjs/common';

import { S3Service } from './s3/s3.service';
import { SqsService } from './sqs/sqs.service';

@Module({
  providers: [SqsService, S3Service],
})
export class AwsModule {}
