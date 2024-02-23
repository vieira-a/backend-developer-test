import { ApiProperty } from '@nestjs/swagger';

import { ReadCompaniesOutput } from '../../../application/company/outputs';

// export class SwaggerReadCompaniesSuccess {
//   @ApiProperty({ default: true })
//   success: boolean;

//   @ApiProperty({ type: [ReadCompaniesOutput] })
//   data: ReadCompaniesOutput;
// }

export class SwaggerReadCompanySuccess {
  @ApiProperty({ default: true })
  success: boolean;

  @ApiProperty()
  data: ReadCompaniesOutput;
}

// export class SwaggerReadCompaniesEmpty {
//   @ApiProperty({ default: false })
//   success: boolean;

//   @ApiProperty()
//   data: [];
// }

export class SwaggerReadCompanyEmpty {
  @ApiProperty({ default: false })
  success: boolean;

  @ApiProperty()
  data: [];
}
