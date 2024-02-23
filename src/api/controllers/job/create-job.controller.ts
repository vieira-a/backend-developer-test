import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOkResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

import { JobPresenter } from '../../../api/presenters/job';
import { CreateJobService } from '../../../application/job/services';
import { CreateJobRequest } from '../../transports/job/requests';

@ApiTags('job')
@Controller('job')
export class CreateJobController {
  constructor(
    private readonly _createJobService: CreateJobService,
    private readonly _jobPresenter: JobPresenter,
  ) {}

  @ApiBody({ type: CreateJobRequest })
  @ApiOkResponse({
    description: 'A publicação foi criada com sucesso',
  })
  @ApiUnprocessableEntityResponse({
    description:
      'O ID da empresa está no formato inválido ou não foi informado',
  })
  @ApiBadRequestResponse({
    description: 'Erros de validação de parâmetros de entrada',
    content: {
      'application/json': {
        example: {
          statusCode: 400,
          message: [
            'Por favor, informe o ID da empresa',
            'O ID da empresa está no formato inválido ou não foi informado',
            'Por favor, informe um título para a publicação',
            'Por favor, informe uma descrição para a publicação',
            'Por favor, informe a localização',
          ],
        },
      },
    },
  })
  @Post()
  async handle(@Body() data: CreateJobRequest) {
    const output = await this._createJobService.create(data);
    return this._jobPresenter.createJobResult(output);
  }
}
