import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  ReadCompaniesController,
  ReadCompanyByIdController,
} from '../api/controllers/company';
import { CompanyPresenter } from '../api/presenters/company';
import { CompanyResponseMapper } from '../api/transports/company/mappers';
import {
  ReadCompaniesService,
  ReadCompanyByIdService,
} from '../application/company/services';
import { CompanyDbRepository } from '../infrastructure/access/repositories/company';
import { CompanyModel } from '../infrastructure/access/repositories/company/models';

@Module({
  controllers: [ReadCompaniesController, ReadCompanyByIdController],
  providers: [
    ReadCompaniesService,
    ReadCompanyByIdService,
    CompanyDbRepository,
    CompanyPresenter,
    CompanyResponseMapper,
  ],
  imports: [TypeOrmModule.forFeature([CompanyModel])],
  exports: [ReadCompanyByIdService, CompanyDbRepository],
})
export class CompanyModule {}
