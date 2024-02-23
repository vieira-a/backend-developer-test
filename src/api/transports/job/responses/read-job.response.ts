import { ApiProperty } from '@nestjs/swagger';

import { ReadJobOutput } from '../../../../application/job/outputs';

export class ReadJobResponse {
  @ApiProperty({ type: [ReadJobOutput] })
  data?: ReadJobOutput;
}
