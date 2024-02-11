import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CompanyDbRepository } from '../../infrastructure/access/repositories/company/company-db.repository';
import { CompanyModel } from '../../infrastructure/access/repositories/company/models/company.model';
import { ReadCompaniesService } from '../company/services/read-companies.service';

@Module({
  providers: [ReadCompaniesService, CompanyDbRepository],
  imports: [TypeOrmModule.forFeature([CompanyModel])],
})
export class CompanyModule {}
