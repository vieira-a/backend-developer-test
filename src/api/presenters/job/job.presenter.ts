import { Injectable } from '@nestjs/common';
import { ReadJobResponse } from 'src/api/transports/job/responses';

import { ReadJobOutput } from '../../../application/job/outputs';

@Injectable()
export class JobPresenter {
  async createJobResult(output: boolean) {
    if (!output) {
      return {
        message: 'Houve uma falha ao criar publicação',
      };
    }
    return {
      message: 'Publicação criada com sucesso',
    };
  }

  async readJobResult(output: ReadJobOutput | null): Promise<ReadJobResponse> {
    if (!output) {
      return {
        message: 'Houve uma falha ao carregar a publicação',
      };
    }
    return {
      data: output,
    };
  }

  async updatedDraftSuccess() {
    return { message: 'Registro atualizado com sucesso' };
  }

  async updatedDraftNotSuccess() {
    return { message: 'Sem dados para atualizar' };
  }

  async deletedDraftSuccess() {
    return { message: 'Registro excluído com sucesso' };
  }

  async deletedDraftNotSuccess() {
    return { message: 'Registro não excluído' };
  }

  async archiveDraftSuccess() {
    return { message: 'Postagem arquivada com sucesso' };
  }

  async archiveDraftNotSuccess() {
    return { message: 'Postagem não arquivada' };
  }
}
