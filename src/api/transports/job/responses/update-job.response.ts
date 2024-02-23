import { ApiProperty } from '@nestjs/swagger';

import { UpdateJobOutput } from '../../../../application/job/outputs';

export class UpdateJobResponse extends UpdateJobOutput {
  @ApiProperty({ type: 'boolean', default: true })
  success: boolean;

  @ApiProperty({ default: 'A publicação foi atualizada com sucesso' })
  message?: string;
}
