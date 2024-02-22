import { Logger, Module } from '@nestjs/common';

import { AwsModule } from '../infrastructure/aws/aws.module';
import { DataModule } from '../infrastructure/data/data.module';
import { CompanyModule, JobModule } from '../modules';

@Module({
  imports: [DataModule, AwsModule, CompanyModule, JobModule],
  providers: [Logger],
})
export class AppModule {}
