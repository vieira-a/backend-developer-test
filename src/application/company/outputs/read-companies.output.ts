import { ApiProperty } from '@nestjs/swagger';

import { CompanyEntity } from '../../../domain/company/entities';

export class ReadCompaniesOutput extends CompanyEntity {
  @ApiProperty()
  id?: string;

  @ApiProperty()
  name: string;
}
