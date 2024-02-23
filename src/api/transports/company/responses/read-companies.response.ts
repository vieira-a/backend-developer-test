import { ApiProperty } from '@nestjs/swagger';

import { ReadCompaniesOutput } from '../../../../application/company/outputs';

export class ReadCompaniesResponse {
  @ApiProperty({ type: 'boolean', default: true })
  success?: boolean;

  @ApiProperty({ type: [ReadCompaniesOutput] })
  data?: ReadCompaniesOutput[];
}
