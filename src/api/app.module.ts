import { Logger, Module } from '@nestjs/common';

import { DataModule } from '../infrastructure/data/data.module';
import { CompanyModule, JobModule } from '../modules';

@Module({
  imports: [DataModule, CompanyModule, JobModule],
  providers: [Logger],
})
export class AppModule {}
