import { IsOptional } from 'class-validator';

import { UpdateJobDraftInput } from '../../../../application/job/inputs';

export class UpdateJobDraftRequest implements UpdateJobDraftInput {
  @IsOptional()
  public title: string;

  @IsOptional()
  public description: string;

  @IsOptional()
  public location: string;

  protected constructor() {}
}
