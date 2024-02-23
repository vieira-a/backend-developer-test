import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { postgreSqlSettings } from './settings/postgresql.settings';

@Module({
  imports: [TypeOrmModule.forRoot(postgreSqlSettings)],
})
export class DataModule {}
