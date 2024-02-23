import { ApiProperty } from '@nestjs/swagger';

import { CreateJobInput } from '../../../../application/job/inputs/create-job.input';

export class CreateJobRequest extends CreateJobInput {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  public companyId: string;

  @ApiProperty()
  public title: string;

  @ApiProperty()
  public description: string;

  @ApiProperty()
  public location: string;
}
