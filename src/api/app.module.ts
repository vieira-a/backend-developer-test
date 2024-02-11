import { Module } from '@nestjs/common';

import { DataModule } from '../infrastructure/data/data.module';
import { CompanyModule } from '../modules/company.module';

@Module({
  imports: [DataModule, CompanyModule],
})
export class AppModule {}
