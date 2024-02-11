import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CompanyController } from '../api/controllers/company/company.controller';
import { ReadCompaniesService } from '../application/company/services/read-companies.service';
import { CompanyDbRepository } from '../infrastructure/access/repositories/company/company-db.repository';
import { CompanyModel } from '../infrastructure/access/repositories/company/models/company.model';

@Module({
  controllers: [CompanyController],
  providers: [ReadCompaniesService, CompanyDbRepository],
  imports: [TypeOrmModule.forFeature([CompanyModel])],
})
export class CompanyModule {}
