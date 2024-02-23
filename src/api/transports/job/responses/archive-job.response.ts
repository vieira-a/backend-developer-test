import { ApiProperty } from '@nestjs/swagger';

import { ArchiveJobOutput } from '../../../../application/job/outputs';

export class ArchiveJobResponse extends ArchiveJobOutput {
  @ApiProperty({ type: 'boolean', default: true })
  success: boolean;

  @ApiProperty({ default: 'A publicação foi arquivada com sucesso' })
  message?: string;
}
