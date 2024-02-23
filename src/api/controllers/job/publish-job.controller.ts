import { Controller, Param, Put } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

import { PublishJobResponse } from '../../../api/transports/job/responses';
import { PublishJobService } from '../../../application/job/services';
import { JobPresenter } from '../../presenters/job';

@ApiTags('job')
@Controller('job')
export class PublishJobController {
  constructor(
    private readonly _publishJobService: PublishJobService,
    private readonly _jobPresenter: JobPresenter,
  ) {}

  @ApiParam({ name: 'job_id', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiOkResponse({ type: PublishJobResponse })
  @ApiBadRequestResponse({ description: 'A publicação não foi localizada' })
  @ApiUnprocessableEntityResponse({
    description: 'Erros de validação de parâmetros de entrada',
    content: {
      'application/json': {
        example: {
          statusCode: 422,
          message: [
            'Esta postagem já foi publicada',
            'Postagens rejeitadas não podem ser publicadas',
          ],
        },
      },
    },
  })
  @Put(':job_id/publish')
  async handle(@Param('job_id') job_id: string) {
    const output = await this._publishJobService.publish(job_id);
    return await this._jobPresenter.publishJobResult(output);
  }
}
