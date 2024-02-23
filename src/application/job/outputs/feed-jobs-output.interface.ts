import { ApiProperty } from '@nestjs/swagger';

import { CompanyEntity } from '../../../domain/company/entities';
import { FeedJobEntity } from '../../../domain/job/entities';

export class FeedJobsOutput extends FeedJobEntity {
  @ApiProperty()
  public id?: string;

  @ApiProperty({ type: 'string' })
  public company: CompanyEntity;

  @ApiProperty()
  public title: string;

  @ApiProperty()
  public description: string;

  @ApiProperty()
  public createdAt?: Date;

  @ApiProperty()
  public updatedAt?: Date;
}
