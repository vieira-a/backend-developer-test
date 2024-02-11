import { Module } from '@nestjs/common';

import { DataModule } from '../infrastructure/data/data.module';

@Module({
  imports: [DataModule],
})
export class AppModule {}
