import { Module } from '@nestjs/common';

import { CompanyModule } from '../application/modules/company.module';
import { DataModule } from '../infrastructure/data/data.module';

@Module({
  imports: [DataModule, CompanyModule],
})
export class AppModule {}
