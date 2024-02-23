import { ApiProperty } from '@nestjs/swagger';

import { UpdateJobInput } from '../../../../application/job/inputs';

export class UpdateJobRequest extends UpdateJobInput {
  @ApiProperty()
  public title: string;

  @ApiProperty()
  public description: string;

  @ApiProperty()
  public location: string;
}
