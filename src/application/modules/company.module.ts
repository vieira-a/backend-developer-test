import { Module } from '@nestjs/common';

import { ReadCompaniesService } from '../company/services/read-companies.service';

@Module({
  providers: [ReadCompaniesService],
})
export class CompanyModule {}
