import { Logger, Module } from '@nestjs/common';
import { CacheModule } from 'src/infrastructure/cache/cache.module';

import { AwsModule } from '../infrastructure/aws/aws.module';
import { DataModule } from '../infrastructure/database/data.module';
import { CompanyModule, JobModule } from '../modules';

@Module({
  imports: [DataModule, AwsModule, CompanyModule, JobModule, CacheModule],
  providers: [Logger],
})
export class AppModule {}
