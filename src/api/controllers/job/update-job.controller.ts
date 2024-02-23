import { Body, Controller, Param, Patch } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { UpdateJobResponse } from '../../../api/transports/job/responses';
import { UpdateJobService } from '../../../application/job/services';
import { JobPresenter } from '../../presenters/job';
import { UpdateJobRequest } from '../../transports/job/requests';

@ApiTags('job')
@Controller('job')
export class UpdateJobController {
  constructor(
    private readonly _udateJobService: UpdateJobService,
    private readonly _jobPresenter: JobPresenter,
  ) {}

  @ApiParam({ name: 'job_id', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiBody({ type: UpdateJobRequest })
  @ApiOkResponse({ type: UpdateJobResponse })
  @ApiBadRequestResponse({
    description: 'Erros de validação de parâmetros de entrada',
    content: {
      'application/json': {
        example: {
          statusCode: 400,
          message: [
            'A publicação não foi localizada',
            'Não há dados fornecidos para atualizar',
          ],
        },
      },
    },
  })
  @Patch(':job_id')
  async handle(
    @Param('job_id') job_id: string,
    @Body() data: UpdateJobRequest,
  ) {
    const output = await this._udateJobService.update(job_id, data);
    return await this._jobPresenter.updateJobResult(output);
  }
}
