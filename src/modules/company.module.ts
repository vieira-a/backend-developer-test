import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReadCompaniesController } from '../api/controllers/company';
import { CompanyPresenter } from '../api/presenters/company';
import { CompanyResponseMapper } from '../api/transports/company/mappers';
import { ReadCompaniesService } from '../application/company/services';
import { CompanyDbRepository } from '../infrastructure/access/repositories/company';
import { CompanyModel } from '../infrastructure/access/repositories/company/models';

@Module({
  controllers: [ReadCompaniesController],
  providers: [
    ReadCompaniesService,
    CompanyDbRepository,
    CompanyPresenter,
    CompanyResponseMapper,
  ],
  imports: [TypeOrmModule.forFeature([CompanyModel])],
})
export class CompanyModule {}
