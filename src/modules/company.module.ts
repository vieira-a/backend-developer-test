import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  ReadCompaniesController,
  ReadCompanyByIdController,
} from '../api/controllers/company';
import { CompanyPresenter } from '../api/presenters/company';
import {
  ReadCompaniesService,
  ReadCompanyByIdService,
} from '../application/company/services';
import { DbTypeOrmCompanyRepository } from '../infrastructure/access/repositories/company';
import { CompanyDbModel } from '../infrastructure/access/repositories/company/models';

@Module({
  controllers: [ReadCompaniesController, ReadCompanyByIdController],
  providers: [
    ReadCompaniesService,
    ReadCompanyByIdService,
    DbTypeOrmCompanyRepository,
    CompanyPresenter,
  ],
  imports: [TypeOrmModule.forFeature([CompanyDbModel])],
  exports: [ReadCompanyByIdService, DbTypeOrmCompanyRepository],
})
export class CompanyModule {}
