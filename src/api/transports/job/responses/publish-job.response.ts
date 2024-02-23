import { ApiProperty } from '@nestjs/swagger';

import { PublishJobOutput } from '../../../../application/job/outputs';

export class PublishJobResponse extends PublishJobOutput {
  @ApiProperty({ type: 'boolean', default: true })
  success: boolean;

  @ApiProperty({ default: 'A postagem foi publicada com sucesso' })
  message?: string;
}
