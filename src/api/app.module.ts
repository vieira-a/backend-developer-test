import { Logger, Module } from '@nestjs/common';

import { DataModule } from '../infrastructure/data/data.module';
import { CompanyModule } from '../modules';

@Module({
  imports: [DataModule, CompanyModule],
  providers: [Logger],
})
export class AppModule {}
