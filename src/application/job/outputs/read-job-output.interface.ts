import { ApiProperty } from '@nestjs/swagger';

import { JobEntity } from '../../../domain/job/entities';

export class ReadJobOutput extends JobEntity {
  @ApiProperty()
  public id?: string;

  @ApiProperty()
  public title: string;

  @ApiProperty()
  public description: string;

  @ApiProperty()
  public location: string;
}
