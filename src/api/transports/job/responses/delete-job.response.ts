import { ApiProperty } from '@nestjs/swagger';

import { DeleteJobOutput } from '../../../../application/job/outputs';

export class DeleteJobResponse implements DeleteJobOutput {
  @ApiProperty({ type: 'boolean', default: true })
  success: boolean;

  @ApiProperty({ default: 'A publicação foi excluída com sucesso' })
  message?: string;
}
